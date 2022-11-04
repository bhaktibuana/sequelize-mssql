const express = require("express");
const { authMiddleware } = require("../middlewares");
const { userRoleController } = require("../controllers");
const router = express.Router();

router.get("/", authMiddleware.isAuth, userRoleController.getData);

module.exports = router;
