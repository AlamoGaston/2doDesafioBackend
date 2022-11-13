const express = require("express");
const routerProducts = require("./routes/products");
const routerCart = require("./routes/cart");
const logger = require("morgan");
require("dotenv").config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    environment: process.env.ENVIRONMENT || "Undefined",
    health: "UP!",
  });
});

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));
