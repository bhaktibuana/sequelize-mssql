const { response } = require("../helpers");

const { responseErr } = response;

const superAdminPermission = (req, res, next) => {
  const userRole = res.locals.payload.UserRole;
  const { roleCode } = userRole;

  if (roleCode === "SA") {
    next();
  } else {
    responseErr("Permission denied", 401, null, res);
  }
};

const adminPermission = (req, res, next) => {
  const userRole = res.locals.payload.UserRole;
  const { roleCode } = userRole;

  if (roleCode === "AD" || roleCode === "SA") {
    next();
  } else {
    responseErr("Permission denied", 401, null, res);
  }
};

module.exports = {
  superAdminPermission,
  adminPermission,
};
