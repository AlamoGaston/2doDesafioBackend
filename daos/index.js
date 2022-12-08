const ProductsDAOFirebase = require("../daos/products/productsDAOFirebase");
const CartDAOFirebase = require("../daos/carts/cartDAOFirebase");

const ProductsDAOMongoDB = require("../daos/products/productsDAOMongo");
const CartDAOMongoDB = require("../daos/carts/cartDAOMongo");

const ProductsDAOFile = require("../daos/products/productsDAOFile");
const CartDAOFile = require("../daos/carts/cartDAOFile");

const getStorage = () => {
  //const storage = process.env.STORAGE;
  const storage = `firebase`;

  switch (storage) {
    case `firebase`:
      return {
        productos: new ProductsDAOFirebase(),
        carrito: new CartDAOFirebase(),
      };
      break;
    case `MongoDB`:
      return {
        productos: new ProductsDAOMongoDB(),
        carrito: new CartDAOMongoDB(),
      };
      break;
    case `file`:
      return {
        productos: new ProductsDAOFile(),
        carrito: new CartDAOFile(),
      };
      break;
    default:
      return {
        productos: new ProductsDAOFirebase(),
        carrito: new CartDAOFirebase(),
      };
      break;
  }
};

module.exports = getStorage;
