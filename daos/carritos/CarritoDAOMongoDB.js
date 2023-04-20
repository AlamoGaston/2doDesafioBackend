/*
    NOTA:
        -Se deja la lógica en el programa, en este entregable se decidió generar el carrito en el usuario.
        -Se agregaron las ordenes
*/

const mongoDB = require("../../src/dataBase/options/mongoDB");

const carritoModel = require("../../src/dataBase/models/carrito");
const productsModel = require("../../src/dataBase/models/producto");
const userModel = require("../../src/dataBase/models/user");

const CrudMongoDB = require("../../src/dataBase/crudMongoDB/crudCarritos");

class CarritoDAOMongoDB extends CrudMongoDB {
  constructor() {
    super(mongoDB, carritoModel, productsModel, userModel);
  }
}

module.exports = CarritoDAOMongoDB;
