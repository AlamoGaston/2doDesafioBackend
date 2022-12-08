const express = require("express");
const router = express.Router();

router.get("/health", async (_req, res) => {
  const environment = process.env.ENVIRONMENT | "Undefined";
  res.status(200).json({
    health: "UP",
    environment,
  });
});

module.exports = router;
