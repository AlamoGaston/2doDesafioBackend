const express = require("express");
const logger = require("morgan");
const mongoConnect = require("./data/options/mongoDB");
const apiRouter = require("./routes/index");
require("dotenv").config();

const app = express();
mongoConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.static("public"));

//Routers import
const routerItems = require("./routes/productsRouter");
const routerCart = require("./routes/cartRouter");

//Routers
app.use(`/api/productos`, routerItems);
app.use(`/api/carrito`, routerCart);
app.use("/api", apiRouter);

app.use(express.static("public"));

module.exports = app;
