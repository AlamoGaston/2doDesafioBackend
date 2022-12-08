const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  timestamp: { type: Date, required: true },
  products: { type: Array, required: true },
});

module.exports = model("Carts", cartSchema);
