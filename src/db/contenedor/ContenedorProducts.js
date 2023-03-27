const ProductsDTO = require("../../../DTOs/ProductsDTO");

class Contenedor {
  constructor(mongoDB, productsModel) {
    this.mongoDB = mongoDB;
    this.productsModel = productsModel;
  }

  async save(product) {
    try {
      // Instancia del modelo message
      const newProduct = new this.messageModel(product);

      console.log("I'm from MongoDB");

      this.mongoDB
        .then((_) => newProduct.save())
        .catch((err) => console.log(`Error: ${err.message}`));
    } catch (error) {
      throw Error("Error in save");
    }
  }

  async getAll() {
    try {
      /*
            Esta lógica va en Repository:
        
            const products = await this.productsModel.find();
            const productDTO = products.map(product => new ProductsDTO(product));
            */
      const products = await this.productsModel.find();
      const productDTO = products.map((product) => new ProductsDTO(product));
      if (productDTO) {
        return productDTO;
      } else {
        return false;
      }
    } catch (error) {
      throw Error("Error in getAll");
    }
  }
}
module.exports = Contenedor;
