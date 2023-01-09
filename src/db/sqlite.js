const path = require("path");

const optionsSQLite3 = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "../sqlite/db.sqlite"),
  },
  useNullAsDefault: true,
};

module.exports = {
  optionsSQLite3,
};
