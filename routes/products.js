const express = require("express");
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../controller/controlItems");
const routerProducts = express.Router();

//Get all products or product selected
routerProducts.get("/:id?", (req, res) => getItems(req, res));

//Add product
routerProducts.post("/", (req, res) => addItem(req, res));

//Update product
routerProducts.put("/:id", (req, res) => updateItem(req, res));

//Delete product
routerProducts.delete("/:id", (req, res) => deleteItem(req, res));

module.exports = routerProducts;
