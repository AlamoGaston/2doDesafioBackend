const router = require("express").Router();

const products = require("../../storage/products");

//GET '/api/productos' -> devuelve todos los productos.
router.get("/", async (_req, res, next) => {
  try {
    let data = await products.getAll();
    if (data) {
      res.status(200).json({
        response: data,
      });
    } else {
      res.status(404).json({
        response: "Not found",
      });
    }
  } catch (err) {
    next(err);
  }
});

//GET '/api/productos/:id' -> devuelve un producto según su id.

router.get("/:id", async (req, res, next) => {
  //const id = req.params.id
  const { id } = req.params;
  console.log(id);
  try {
    let data = await products.getById(id);
    if (data) {
      res.status(200).json({
        response: data,
      });
    } else {
      res.status(404).json({
        response: "Not found",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    let data = await products.save(body);
    res.redirect("/public/index.html");
  } catch (err) {
    next(err);
  }
});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    let data = await products.putById(id, req.body);
    if (data) {
      res.status(200).json({
        response: data,
      });
    } else {
      res.status(404).json({
        response: "Not found",
      });
    }
  } catch (err) {
    next(err);
  }
});

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    let data = await products.deleteById(id);
    if (data) {
      res.status(200).json({
        response: "Item deleted",
      });
    } else {
      res.status(404).json({
        response: "Not found",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
