const Contenedor = require("./Contenedor");

const express = require("express");
require("dotenv").config();

const app = express();

const productos = new Contenedor("productos.txt");

app.get("/", (_req, res) => {
  res.send("Hola, estoy probando el server!!");
});

app.get("/productos", async (_req, res) => {
  try {
    const totalProducts = await productos.getAll();
    res.status(202).send(JSON.stringify(totalProducts, null, 2));
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/productoRandom", async (_req, res) => {
  const alAzar = await productos.getAll();
  const numRandom = Math.floor(Math.random() * alAzar.length);
  res.status(202).json(alAzar[numRandom]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`Server up and running on port ${PORT}`);
});
