let administrator = true;

const storage = require("../daos/index");

const itemsStorage = storage().items;

//Get all products
const getAllItems = async (_req, res) => {
  try {
    let allItems = await itemsStorage.getAll();
    return res.json(allItems);
  } catch (err) {
    return res.status(404).json({
      error: `Error getting all products ${err}`,
    });
  }
};

//Get a product
const getItem = async (req, res) => {
  try {
    let idCart = req.params.id;
    let itemById = await itemsStorage.getById(idCart);

    if (!itemById) {
      return res.status(404).json({
        error: `Product not found error`,
      });
    } else {
      return res.json(productbyId);
    }
  } catch (err) {
    return res.status(404).json({
      error: `Error getting product by id ${err}`,
    });
  }
};

//Add product
const addItem = async (req, res) => {
  if (administrator) {
    try {
      const name = req.body.name;
      const price = Number(req.body.price);
      const url = req.body.thumbnail;
      const description = req.body.description;
      const date = new Date().toDateString();
      const code = Number(req.body.code);
      const stock = Number(req.body.stock);

      const newItem = {
        timestamp: date,
        nombre: `${name}`,
        descripcion: `${description}`,
        codigo: code,
        thumbnail: `${url}`,
        precio: price,
        stock: stock,
      };
      const id = await itemsStorage.save(newItem);

      return res.json(`Added new product`);
    } catch (err) {
      return res.status(404).json({
        error: `Error creating product ${err}`,
      });
    }
  } else {
    return res.status(404).json({
      error: `Route not allowed, you are not a user with an administrator profile.`,
    });
  }
};

//Update product
const updateItem = async (req, res) => {
  if (administrator) {
    try {
      const idItem = req.params.id;
      const name = req.body.name;
      const price = Number(req.body.price);
      const url = req.body.thumbnail;
      const description = req.body.description;
      const date = new Date().toDateString();
      const code = Number(req.body.code);
      const stock = Number(req.body.stock);

      await itemsStorage.updateById(
        idItem,
        name,
        price,
        url,
        description,
        date,
        code,
        stock
      );

      return res.json(`Product was updated`);
    } catch (err) {
      return res.status(404).json({
        error: `Error updating a product ${err}`,
      });
    }
  } else {
    return res.status(404).json({
      error: `Route not allowed, you are not a user with an administrator profile.`,
    });
  }
};

//Delete product
const deleteItem = async (req, res) => {
  if (administrator) {
    try {
      const id = req.params.id;
      await itemsStorage.deleteById(id);
      return res.json(`Successfully removed ID:${id}`);
    } catch (err) {
      return res.status(404).json({
        error: `Error deleting a product by id ${err}`,
      });
    }
  } else {
    return res.status(404).json({
      error: `Route not allowed, you are not a user with an administrator profile.`,
    });
  }
};

module.exports = {
  getAllItems,
  getItem,
  addItem,
  updateItem,
  deleteItem,
};
