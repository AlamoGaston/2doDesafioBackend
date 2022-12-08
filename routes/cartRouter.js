const express = require("express");
const {
  getItems,
  addCart,
  addItemToCart,
  deleteCart,
  deleteItem,
} = require("../controller/controlCart");

const routerCart = express.Router();

//Get products form an specific cart
routerCart.get("/:id/products", getItems);

//Add a cart
routerCart.post("/", addCart);

//Add a product to a cart
routerCart.post("/:id/products", addItemToCart);

//Delete cart
routerCart.delete("/:id", deleteCart);

//Delete a product from a cart
routerCart.delete("/:id/products/:id_prod", deleteItem);

module.exports = routerCart;
