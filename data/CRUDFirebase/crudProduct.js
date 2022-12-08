class Contenedor {
  constructor(queryProducts) {
    this.queryProducts = queryProducts;
  }

  async save(product) {
    await this.queryProducts.add(product);
  }

  async getAll() {
    const docsProducts = await this.queryProducts.get();

    const allProducts = docsProducts.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return allProducts;
  }

  async getById(idProduct) {
    const docsProducts = this.queryProducts.doc(idProduct);
    const response = await docsProducts.get();

    const product = {
      id: response.id,
      ...response.data(),
    };
    return product;
  }

  async updateById(
    idProduct,
    name,
    price,
    url,
    description,
    date,
    code,
    stock
  ) {
    const docsProducts = this.queryProducts.doc(idProduct);

    await docsProducts.update({
      nombre: name,
      precio: price,
      thumbnail: url,
      descripcion: description,
      timestamp: date,
      codigo: code,
      stock: stock,
    });
  }

  async deleteById(idProduct) {
    console.log(idProduct);
    const docsProducts = this.queryProducts.doc(idProduct);

    await docsProducts.delete();
  }
}
module.exports = Contenedor;
