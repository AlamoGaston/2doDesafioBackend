const getDataHome = (_req, res) => {
  const data = {
    title: "Desafio Nº12 - Login por formulario",
    content: "Login mediante formulario, MongoAtlas",
  };
  return res.render("index", data);
};

module.exports = {
  getDataHome,
};
