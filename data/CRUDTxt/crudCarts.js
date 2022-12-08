class Contenedor {
  constructor(file, fs) {
    this.file = file;
    this.fs = fs;
  }

  async read() {
    try {
      let data = await this.fs.promises.readFile(`./${this.file}`, `utf-8`);
      return data;
    } catch (err) {
      throw Error(`Error reading file ${err}`);
    }
  }

  async write(datos, msg) {
    try {
      await this.fs.promises.writeFile(
        `./${this.file}`,
        JSON.stringify(datos, null, 2)
      );
      console.log(msg);
    } catch (err) {
      throw Error(`Error writing to file ${err}`);
    }
  }

  async createCart() {
    let newCart;
    let date = new Date().toDateString();
    let cart = {
      id: 0,
      timestamp: date,
      products: [],
    };

    let data = await this.read();
    let datos = JSON.parse(data);

    if (datos.length == 0) {
      cart.id = 1;
      newCart = cart;
    } else {
      cart.id = datos[datos.length - 1].id + 1;
      newCart = cart;
    }
    datos.push(newCart);

    await this.write(datos, `Added!`);

    return cart.id;
  }

  async getProductsByID(idCart) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let result = datos.filter((cart) => cart.id == idCart);
    if (result.length == 0) {
      return [];
    } else {
      return result[0].products;
    }
  }

  async getCartById(myId) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let result = datos.filter((cart) => cart.id == myId);

    return result;
  }

  async getAll() {
    let data = await this.read();
    let datos = JSON.parse(data);

    return datos;
  }

  async deleteCartById(idCart) {
    try {
      let data = await this.read();
      let datos = JSON.parse(data);

      let cart = datos.find((cart) => cart.id == idCart);
      if (cart) {
        let index = datos.indexOf(cart);
        datos.splice(index, 1);
        await this.write(datos, `Cart with ID: ${idCart} removed`);
      } else {
        throw Error(`Cart with id ${idCart} does not exist`);
      }
    } catch (err) {
      throw Error(`Error ${err}`);
    }
  }

  async deleteProductById(idC, idP) {
    try {
      let data = await this.read();
      let datos = JSON.parse(data);

      let cart = datos.find((cart) => cart.id == idC);
      let product = cart.products.find((product) => product.id == idP);

      if (cart && product) {
        let indexProduct = cart.products.indexOf(product);
        cart.products.splice(indexProduct, 1);
        await this.write(
          datos,
          `Product with ID: ${idP} from cart with ID ${idC} was removed`
        );
      } else {
        if (!cart) {
          throw Error(`Error the cart does not exist`);
        }
        if (!product) {
          throw Error(`Error the product does not exist`);
        }
      }
    } catch (err) {
      throw Error(`Error  ${err}`);
    }
  }

  async deleteAll() {
    let data = [];
    await this.write(data, `All products have been removed`);
  }
}
module.exports = Contenedor;
