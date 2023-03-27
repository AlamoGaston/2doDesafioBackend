const ProductosDAOMongoDB = require("../../DAOS/ProductsDAOMongoDB");
const MessagesDAOMongoDB = require("../../DAOS/MessageDAOMongoDB");

const getStorage = () => {
  //const storage = process.env.STORAGE;
  const storage = "MongoDb"; //Prueba: forzar variable para trabajar con la DB deseada.

  switch (storage) {
    case "MongoDB":
      return {
        productos: new ProductosDAOMongoDB(),
        mensajes: new MessagesDAOMongoDB(),
      };
      break;

    default:
      return {
        productos: new ProductosDAOMongoDB(),
        mensajes: new MessagesDAOMongoDB(),
      };
      break;
  }
};

module.exports = getStorage;
