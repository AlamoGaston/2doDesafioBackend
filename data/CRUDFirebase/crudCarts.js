class Contenedor {
  constructor(queryCarts, queryProducts, FieldValue) {
    this.queryCarts = queryCarts;
    this.queryProducts = queryProducts;
    this.FieldValue = FieldValue;
  }

  async createCart() {
    let date = new Date();
    let newCart = {
      timestamp: date,
      products: [],
    };
    await this.queryCarts.add(newCart);
  }

  async getProductsByID(idCart) {
    const docsCarts = await this.queryCarts.doc(idCart);
    const response = await docsCarts.get();

    return response.data().products;
  }

  async addProduct(idCart, idProduct) {
    const docCarts = this.queryCarts.doc(idCart);
    const docProducts = this.queryProducts.doc(idProduct);

    const response = await docProducts.get();
    const product = {
      id: response.id,
      ...response.data(),
    };

    await docCarts.update({
      products: this.FieldValue.arrayUnion(product),
    });
  }

  async deleteCartById(idCart) {
    const docsCart = this.queryCarts.doc(idCart);

    await docsCart.delete();
  }

  async deleteProductById(idCart, idProduct) {
    const docProduct = this.queryProducts.doc(idProduct);
    const deleteProduct = await docProduct.get();

    const docCart = await this.queryCarts.doc(idCart);
    const cart = await docCart.get();

    const allProducts = cart.data().products;

    let productDelete = {};

    allProducts.forEach((product) => {
      if (product.id == deleteProduct.id) {
        productDelete = product;
      }
    });

    await docCart.update({
      products: this.FieldValue.arrayRemove(productDelete),
    });
  }
}
module.exports = Contenedor;
