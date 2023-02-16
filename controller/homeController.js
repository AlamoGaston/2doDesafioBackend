const getDataHome = (_req, res) => {
  const data = {
    title: "Desafio Nº16",
    content: "LOGGERS, GZIP",
  };
  return res.render("index", data);
};

module.exports = {
  getDataHome,
};
