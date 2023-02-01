const getDataHome = (_req, res) => {
  const data = {
    title: "Desafio Nº15",
    content: "process.env",
  };
  return res.render("index", data);
};

module.exports = {
  getDataHome,
};
