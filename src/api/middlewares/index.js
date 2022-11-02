const usersMiddleware = require("./users.middleware");
const authMiddleware = require("./auth.middleware");
const permissionMiddleware = require("./permission.middleware");

module.exports = {
  usersMiddleware,
  authMiddleware,
  permissionMiddleware,
};
