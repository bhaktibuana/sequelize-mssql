const express = require("express");
const usersRoute = require("./users.route");
const router = express.Router();

router.use("/api/users", usersRoute);

router.use("/", (_, res) => {
  res.status(200).json({
    message: "Sequelize MSSQL Development Server.",
  });
});

module.exports = router;
