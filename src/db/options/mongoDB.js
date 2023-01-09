const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
  strict: "throw",
  strictQuery: false,
};

const URL = "mongodb://127.0.0.1:27017/desafio12";

const connection = mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.info("Mongoose connected");

module.exports = connection;
