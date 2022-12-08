const { Router } = require("express");

const {
  getAllItems,
  getItem,
  addItem,
  updateItem,
  deleteItem,
} = require("../controller/controlItems");

const routerItems = Router();

//Get all products
routerItems.get("/", getAllItems);

//Get a product
routerItems.get("/:id", getItem);

//Add product
routerItems.post("/", addItem);

//Update product
routerItems.put("/:id", updateItem);

//Delete product
routerItems.delete("/:id", deleteItem);

module.exports = routerItems;
