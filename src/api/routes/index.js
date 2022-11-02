const express = require("express");
const router = express.Router();

router.use("/", (_, res) => {
  res.status(200).json({
    message: "Sequelize MSSQL Development Server.",
  });
});

module.exports = router;
