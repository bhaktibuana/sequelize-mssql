const express = require("express");
const usersRoute = require("./users.route");
const userRoleRoute = require("./userRole.route");
const router = express.Router();

router.use("/api/users", usersRoute);
router.use("/api/user-role", userRoleRoute);

router.use("/", (_, res) => {
  res.status(200).json({
    message: "Sequelize MSSQL Development Server.",
  });
});

module.exports = router;
