// const { CastError, ValidationError } = require("mongoose").Error;
const CardModel = require("../models/card");
const httpCode = require("../utils/httpCode");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");

const getCards = (req, res, next) => {
  CardModel.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  CardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Невозможно создать карточку"));
        return;
      }
      next(err);
    });
};

const deleteCardById = (req, res, next) => {
  CardModel.findById(req.params.cardId)
    .orFail(() => new NotFoundError("Пользователь с указанным id не найден"))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError("Нельзя удалить чужую карточку!"));
        return;
      }
      CardModel.deleteOne({ _id: card._id })
        .then(() => res.status(httpCode.OK_REQUEST).send({ message: "Карточка удалена" }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Удаление карточки с неверным id"));
        return;
      }
      if (err.message === "NotFound") {
        next(new NotFoundError("Карточка с указанным id не найдена"));
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Пользователь с указанным id не найден"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequestError(
            "Переданы некорректные данные для постановки лайка",
          ),
        );
        return;
      }
      if (err.message === "NotFound") {
        next(new NotFoundError("Передан несуществующий id карточки"));
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Пользователь с указанным id не найден"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequestError("Переданы некорректные данные для снятии лайка"),
        );
        return;
      }
      if (err.message === "NotFound") {
        next(new NotFoundError("Передан несуществующий _id карточки"));
        return;
      }
      next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
