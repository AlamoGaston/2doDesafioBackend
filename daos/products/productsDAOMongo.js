const mongoDB = require("../../data/options/mongoDB");
const productsModel = require("../../data/models/product");

const CRUDMongoDB = require("../../data/CRUDMongoDB/crudProducts");

class ProductsDAOMongoDB extends CRUDMongoDB {
  constructor() {
    super(mongoDB, productsModel);
  }
}

module.exports = ProductsDAOMongoDB;
