const {
  queryCarts,
  queryProducts,
  FieldValue,
} = require("../../data/options/firebase");
const CrudFirebase = require("../../data/CRUDFirebase/crudCarts");

class CartDAOFirebase extends CrudFirebase {
  constructor() {
    super(queryCarts, queryProducts, FieldValue);
  }
}

module.exports = CartDAOFirebase;
