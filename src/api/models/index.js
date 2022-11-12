const usersModel = require("./users.model");
const userRoleModel = require("./userRole.model");
const fruitsModel = require("./fruits.model");

/* ASSOCIATION */
// Users Associate
usersModel.Users.belongsTo(userRoleModel.UserRole, {
  foreignKey: "roleId",
});
// ========== END ==========

// Users Associate
userRoleModel.UserRole.hasMany(usersModel.Users, {
  foreignKey: "roleId",
});
// ========== END ==========

module.exports = {
  usersModel,
  userRoleModel,
  fruitsModel,
};
