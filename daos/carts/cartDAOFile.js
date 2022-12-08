const fs = require("fs");
const file = require("../../data/cart.json");
const CrudFile = require("../../data/CRUDTxt/crudCarts");

class CartDAOFile extends CrudFile {
  constructor() {
    super(file, fs);
  }
}

module.exports = CartDAOFile;
