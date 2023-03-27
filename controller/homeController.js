const getDataHome = (_req, res) => {
  const data = {
    title: "Desafio Nº20",
    content: "MEJORAR LA ARQUITECTURA DE NUESTRA API",
  };
  return res.render("index", data);
};

module.exports = {
  getDataHome,
};
