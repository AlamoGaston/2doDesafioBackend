const getDataHome = (_req, res) => {
  const data = {
    title: "Desafio Nº14",
    content: "process.env",
  };
  return res.render("index", data);
};

module.exports = {
  getDataHome,
};
