const fs = require("fs");
const file = require("../../data/carts.txt");
const CrudFile = require("../../data/CRUDTxt/crudCarts");

class CartDAOFile extends CrudFile {
  constructor() {
    super(file, fs);
  }
}

module.exports = CartDAOFile;
