const fs = require("fs");

class Contenedor {
  constructor(nameItem) {
    this.nameItem = `./storage/${nameItem}`;
    this.count = 0;
  }
  static productos = [];

  async readOrCreateNew() {
    try {
      await fs.promises.readFile(this.nameItem, "utf-8", "[]");
    } catch (error) {
      error.code === "ENOENT"
        ? this.EmptyFile()
        : console.log(
            `Error Code: ${error.code} | There was an unexpected error when trying to read ${this.nameItem}`
          );
    }
  }

  async save(item) {
    let array = [];
    try {
      array = await fs.promises.readFile(this.nameItem, "utf-8");
      array = JSON.parse(array);
      this.count = [...array].pop().id;
    } catch (error) {
      try {
        await this.createOrReset("container created");
      } catch (err) {
        console.error(error);
      }
    }
    array.push({
      ...item,
      id: this.count + 1,
    });
    array = JSON.stringify(array, null, 3);
    await fs.promises.writeFile(this.nameItem, array);
    return this.count + 1;
  }

  async getData() {
    const data = await fs.promises.readFile(this.nameItem, "utf-8");
    return data;
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }

  async EmptyFile() {
    fs.writeFile(this.nameItem, "[]", (error) => {
      error
        ? console.log(error)
        : console.log(
            `File ${this.nameItem} was created since it didn't exist in the system`
          );
    });
  }

  async getOne() {
    try {
      let data = await fs.promises.readFile(this.nameItem, "utf-8");
      data = JSON.parse(data);
      if (data.length > 0) {
        let random = parseInt(Math.random() * (data.length - 1));
        return data[random];
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      const data = await this.getData();
      const datos = JSON.parse(data);

      return datos.find((item) => item.id == id);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to get an item by its ID (${id})`
      );
    }
  }

  async putById(id, prop) {
    try {
      //leo el archivo y obtengo los productos
      let data = await fs.promises.readFile(this.nameItem, "utf-8");
      //los parseo
      data = JSON.parse(data);
      //busco el que coincide el id
      let datos = data.find((item) => item.id == id);
      //si existe lo modifico
      if (datos) {
        datos = {
          ...datos,
          ...prop,
        };
        data = data.map((prod) => {
          if (prod.id == datos.id) {
            prod = datos;
          }
          return prod;
        });
        data = JSON.stringify(data, null, 3);
        //lo guardo en el archivo
        await fs.promises.writeFile(this.nameItem, data);
        return datos;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getData();
      const datos = JSON.parse(data);
      const itemRemoved = datos.find((item) => item.id == id);

      if (itemRemoved) {
        const index = datos.indexOf(itemRemoved);
        datos.splice(index, 1);
        await fs.promises.writeFile(
          this.nameItem,
          JSON.stringify(datos, null, 2)
        );
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to delete an item by its ID (${id})`
      );
    }
  }

  async deleteAll() {
    try {
      await this.EmptyFile();
    } catch (error) {
      console.log(
        `There was an error (${error.code}) when trying to delete all the items`
      );
    }
  }
}

module.exports = Contenedor;
