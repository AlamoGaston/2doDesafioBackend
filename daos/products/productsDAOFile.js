const fs = require("fs");
const file = require("../../data/products.json");
const CRUDFile = require("../../data/CRUDTxt/crudProducts");

class ProductsDAOFile extends CRUDFile {
  constructor() {
    super(file, fs);
  }
}

module.exports = ProductsDAOFile;
