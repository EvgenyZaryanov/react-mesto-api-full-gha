// Модуль dotenv для добавления переменных окружения в process.env
require("dotenv").config();

const {
  PORT = 3000,
  MONGO_URL = "mongodb://127.0.0.1:27017/mestodb",
} = process.env;

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler");
const limiter = require("./middlewares/limiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const appRouter = require("./routes/index");

const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});
console.log("Соединение с сервером установлено");

// безопасность
app.use(cors());
app.use(limiter);
app.use(helmet());

// парсинг
app.use(express.json()); // сборка JSON-формата
app.use(express.urlencoded({ extended: true }));

// миддлвэр-логгер запросов
app.use(requestLogger);

// роутер
app.use(appRouter);

// обработка ошибок
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизолванная обработка ошибок

app.listen(PORT);
console.log(`App listening on port ${PORT}`);
