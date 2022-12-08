const { queryProducts } = require("../../data/options/firebase");
const CRUDFirebase = require("../../data/CRUDFirebase/crudProduct");

class ProductsDAOFirebase extends CRUDFirebase {
  constructor() {
    super(queryProducts);
  }
}

module.exports = ProductsDAOFirebase;
