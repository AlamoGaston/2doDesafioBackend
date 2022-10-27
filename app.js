require("dotenv").config();

const express = require("express");
const app = express();

const router = require("./src/routes/index");

const errorHandler = require("../src/middlewares/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use("/public", express.static(__dirname + "/public"));
app.use(errorHandler);

module.exports = app;
