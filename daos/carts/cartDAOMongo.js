const mongoDB = require("../../data/options/mongoDB");

const cartModel = require("../../data/models/cart");
const productsModel = require("../../data/models/product");

const CRUDMongoDB = require("../../data/CRUDMongoDB/crudCarts");

class CartDAOMongoDB extends CRUDMongoDB {
  constructor() {
    super(mongoDB, cartModel, productsModel);
  }
}

module.exports = CartDAOMongoDB;
