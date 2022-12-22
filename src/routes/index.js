const express = require("express");
const getEnv = require("../services/env.service");

const router = express.Router();

router.get("/health", async (_req, res) => {
  res.status(200).json({
    success: true,
    server: "UP!",
    environment: getEnv(),
  });
});

module.exports = router;
