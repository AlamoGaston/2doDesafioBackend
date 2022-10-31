const express = require("express");
require("dotenv").config();
const path = require("path");
const logger = require("morgan");
const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const Contenedor = require("../contenedor.js");
let myContenedor = new Contenedor("../Products.txt");

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    environment: process.env.ENVIRONMENT || "Undefinided",
    health: "UP",
  });
});

app.get("/", (_req, res) => {
  const data = {
    title: "Desafio Nº5 / Plantilla: Pug",
    content:
      "En esta web se puede ingresar productos y luego verlos en una lista.",
  };
  return res.render("index", data);
});

app.get(`/productos`, (_req, res) => {
  let allProducts;
  (async () => {
    try {
      allProducts = await myContenedor.getAll();
    } catch (err) {
      return res.status(404).json({
        error: `Error ${err}`,
      });
    }
    data = {
      allProducts,
    };
    return res.render(`vista`, data);
  })();
});

app.get("/new", (_req, res) => {
  return res.render("ingreso");
});

app.post(`/productos`, (req, res) => {
  (async () => {
    const name = req.body.title;
    const price = Number(req.body.price);
    const url = req.body.thumbnail;

    const newProducto = {
      title: `${name}`,
      price: price,
      thumbnail: `${url}`,
    };
    const id = await myContenedor.save(newProducto);
    return res.redirect(`/new`);
  })();
});

module.exports = app;
