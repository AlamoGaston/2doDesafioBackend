const express = require("express");
const {
  addCart,
  deleteCart,
  getProducts,
  addProductToCart,
  deleteProduct,
} = require("../controller/controlCart");
const routerCart = express.Router();

//Add a cart
routerCart.post("/", (req, res) => addCart(req, res));

//Delete cart
routerCart.delete("/:id", (req, res) => deleteCart(req, res));

//Get products form an specific cart
routerCart.get("/:id/products", (req, res) => getProducts(req, res));

//Add a product to a cart
routerCart.post("/:id/products", (req, res) => addProductToCart(req, res));

//Delete a product from a cart
routerCart.delete("/:id/products/:id_prod", (req, res) =>
  deleteProduct(req, res)
);

module.exports = routerCart;
