const usersModel = require("./users.model");
const userRoleModel = require("./userRole.model");

/* ASSOCIATION */
// Users Associate
usersModel.Users.belongsTo(userRoleModel.UserRole, {
  foreignKey: "roleId",
});
// ========== END ==========

module.exports = {
  usersModel,
  userRoleModel,
};
