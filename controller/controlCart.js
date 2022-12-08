const storage = require("../daos/index");

const itemsStorage = storage().cart;

//Get products form an specific cart
const getItems = async (req, res) => {
  try {
    let idCart = req.params.id;
    let itemById = await itemsStorage.getItems(idCart);

    if (itemById.length == 0) {
      return res.json(`The cart is empty`);
    } else {
      return res.json(itemById);
    }
  } catch (err) {
    return res.status(404).json({
      error: `Error when trying to access a product id contained in a cart ${err}`,
    });
  }
};

//Add a cart
const addCart = async (_req, res) => {
  try {
    const id = await itemsStorage.addCart();
    return res.json(`New cart created`);
  } catch (err) {
    return res.status(400).json({
      error: `Error creating cart ${err}`,
    });
  }
};

//Add a product to a cart
const addItemToCart = async (req, res) => {
  try {
    let idCart = req.params.idCar;
    let idItem = req.params.idIte;

    await itemsStorage.addItemToCart(idCart, idItem);
    return res.json(
      `Added product with id ${idItem} to cart with id ${idCart}`
    );
  } catch (err) {
    return res.status(404).json({
      error: `Error adding a product ${err}`,
    });
  }
};

//Delete cart
const deleteCart = async (req, res) => {
  try {
    const idCart = req.params.id;
    await itemsStorage.deleteCartById(idCart);
    return res.json(`The cart was removed`);
  } catch (err) {
    return res.status(404).json({
      error: `Error deleting cart ${err}`,
    });
  }
};

//Delete a product from a cart
const deleteItem = async (req, res) => {
  try {
    const idCart = req.params.id;
    const idItem = req.params.id_prod;

    await productsStorage.deleteItem(idCart, idItem);

    return res.json(
      `Product with ID: ${idItem} from cart with ID ${idCart} was removed`
    );
  } catch (err) {
    return res.status(404).json({
      error: `Error when removing a product from a cart ${err}`,
    });
  }
};

module.exports = {
  getItems,
  addItemToCart,
  addCart,
  deleteCart,
  deleteItem,
};
