const getDataHome = (_req, res) => {
  const data = {
    title: "Desafio Nº17",
    content: "DEPLOIT",
  };
  return res.render("index", data);
};

module.exports = {
  getDataHome,
};
