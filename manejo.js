const fs = require("fs");

class Contenedor {
  constructor(nameItem) {
    this.nameItem = nameItem;
    this.readOrCreateNew();
  }

  async readOrCreateNew() {
    try {
      await fs.promises.readFile(this.nameItem, "utf-8");
    } catch (error) {
      error.code === "ENOENT"
        ? this.EmptyFile()
        : console.log(
            `Error Code: ${error.code} | There was an unexpected error when trying to read ${this.nameItem}`
          );
    }
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

  async getById(id) {
    try {
      const data = await this.getData();
      const datos = JSON.parse(data);

      return datos.find((item) => item.id === id);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to get an item by its ID (${id})`
      );
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getData();
      const datos = JSON.parse(data);
      const itemRemoved = datos.find((item) => item.id === id);

      if (itemRemoved) {
        const index = datos.indexOf(itemRemoved);
        datos.splice(index, 1);
        await fs.promises.writeFile(this.nameItem, JSON.stringify(datos));
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

  async save(item) {
    try {
      const allData = await this.getData();
      const datos = JSON.parse(allData);

      item.id = datos.length + 1;
      datos.push(item);

      await fs.promises.writeFile(this.nameItem, JSON.stringify(datos));
      return item.id;
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to save an item`
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

  async getData() {
    const data = await fs.promises.readFile(this.nameItem, "utf-8");
    return data;
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }
}

module.exports = Contenedor;
