const { userRoleModel } = require("../models");
const { connectionError, response } = require("../helpers");

const { UserRole, Op } = userRoleModel;
const { responseErr, responseOk } = response;

const getData = async (req, res) => {
  await UserRole.findAll({ where: { roleCode: { [Op.ne]: "SA" } } })
    .then((results) => {
      if (results.length) {
        console.log(results.length);
        responseOk("Fetch user role data success", results, res);
      } else {
        responseErr("No user role data found", 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  getData,
};
