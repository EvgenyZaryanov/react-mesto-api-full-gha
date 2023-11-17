const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserModel = require("../models/user");
const httpCode = require("../utils/httpCode");

const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");

const getUsers = (req, res, next) => {
  UserModel.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  UserModel.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  UserModel.findById(req.params.userId)
    .orFail(() => new NotFoundError("Пользователь с указанным id не найден"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Такого пользователя не существует"));
        return;
      }
      if (err.message === "NotFound") {
        next(new NotFoundError("Некорректный id пользователя"));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      UserModel.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(httpCode.STATUS_CREATED).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError("Пользователь с таким email уже зарегистрирован")
        );
        return;
      }
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Переданы некорректные данные при создании пользователя"
          )
        );
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Пользователь с указанным id не найден"))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Переданы некорректные данные при обновлении профиля"
          )
        );
        return;
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Пользователь с указанным id не найден"))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Переданы некорректные данные при обновлении аватара"
          )
        );
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "super_secret_key",
        { expiresIn: "7d" },
        null
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
};
