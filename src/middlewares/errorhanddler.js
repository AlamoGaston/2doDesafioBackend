let errorHandler = (err, _req, res, _next) => {
  console.log(err);
  res.status(400).json({
    response: "Error",
    err: err.message,
  });
};

module.exports = errorHandler;
