const moment = require("moment");
const { usersModel, userRoleModel } = require("../models");
const {
  connectionError,
  idGenerator,
  passwordHash,
  response,
  generateJwt,
} = require("../helpers");

const { Users } = usersModel;
const { UserRole } = userRoleModel;
const { responseErr, responseOk } = response;

const getUsers = async (req, res) => {
  await Users.findAll({
    attributes: ["id", "name", "username", "email", "isDeleted"],
  })
    .then((results) => {
      if (results.length) {
        responseOk("Fetch data users success", results, res);
      } else {
        responseErr("Data users not found", 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const getUsersDetail = async (req, res) => {
  const id = req.body.id;

  await Users.findOne({
    where: {
      id,
    },
    include: [
      {
        model: UserRole,
        attributes: {
          exclude: ["id"],
        },
      },
    ],
    attributes: {
      exclude: ["password", "roleId"],
    },
  })
    .then((results) => {
      if (results) {
        responseOk("Fetch user detail success", results, res);
      } else {
        responseErr(`Data user with id: ${id} not found`, 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const login = async (req, res) => {
  const params = res.locals.params;
  const password = passwordHash(req.body.password);

  await Users.findOne({
    where: { ...params, password },
    include: [
      {
        model: UserRole,
        attributes: {
          exclude: ["id"],
        },
      },
    ],
    attributes: {
      exclude: ["password", "roleId"],
    },
  })
    .then((results) => {
      if (results) {
        if (!results.isDeleted) {
          const token = generateJwt(results.dataValues);
          responseOk("Login success", { token }, res);
        } else {
          responseErr(
            "Your account is no longer active, please contact the admin to reactivate your account",
            400,
            null,
            res
          );
        }
      } else {
        responseErr("Wrong password", 401, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const register = async (req, res) => {
  const params = res.locals.params;
  params.password = passwordHash(params.password);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();

  const data = {
    id: idGenerator("USERS"),
    ...params,
    roleId: "",
    isDeleted: false,
    createdBy: "guest",
    createdAt: createdAt,
    updatedBy: "guest",
    updatedAt: createdAt,
  };

  await UserRole.findOne({ where: { roleCode: "US" }, attributes: ["id"] })
    .then((resUserRole) => {
      if (resUserRole) {
        data.roleId = resUserRole.dataValues.id;

        Users.create(data)
          .then((results) => {
            if (results) {
              const resData = results.dataValues;
              delete resData.password;

              responseOk("Registration success", resData, res);
            } else {
              responseErr(
                "Registration failed, please try again later",
                400,
                null,
                res
              );
            }
          })
          .catch((error) => connectionError(error, res));
      } else {
        responseErr("User role with role code: US not found", 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const updateRole = async (req, res) => {
  const id = req.body.id;
  const updatedBy = res.locals.payload.username;
  const params = {
    roleId: req.body.roleId,
    updatedBy,
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
  };

  await Users.update(params, { where: { id } })
    .then((results) => {
      if (results) {
        responseOk("Update role success", null, res);
      } else {
        responseErr("Update role failed", 400, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const selfUpdate = async (req, res) => {
  const id = res.locals.payload.id;
  const updatedBy = res.locals.payload.username;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const params = req.body;

  if (params.password) {
    delete params.password;
  }

  await Users.update(
    { ...params, updatedBy, updatedAt },
    { where: { id, isDeleted: false } }
  )
    .then((resUpdate) => {
      if (resUpdate) {
        Users.findOne({
          where: { id },
          include: [
            {
              model: UserRole,
              attributes: {
                exclude: ["id"],
              },
            },
          ],
          attributes: {
            exclude: ["password", "roleId"],
          },
        })
          .then((results) => {
            const token = generateJwt(results.dataValues);
            responseOk("Update data success", { token }, res);
          })
          .catch((error) => connectionError(error, results));
      } else {
        responseErr("Update data failed", 400, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const changePassword = async (req, res) => {
  const id = res.locals.payload.id;
  const params = {
    password: passwordHash(req.body.newPassword),
    passwordConf: passwordHash(req.body.newPasswordConfirmation),
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    updatedBy: res.locals.payload.username,
  };

  if (params.password === params.passwordConf) {
    delete params.passwordConf;

    await Users.update(params, { where: { id } })
      .then((resUpdate) => {
        if (resUpdate) {
          Users.findOne({
            where: { id },
            include: [
              {
                model: UserRole,
                attributes: {
                  exclude: ["id"],
                },
              },
            ],
            attributes: {
              exclude: ["password", "roleId"],
            },
          })
            .then((results) => {
              const token = generateJwt(results.dataValues);
              responseOk("Change password success", { token }, res);
            })
            .catch((error) => connectionError(error, res));
        } else {
          responseErr("Change password failed", 400, null, res);
        }
      })
      .catch((error) => connectionError(error, res));
  } else {
    responseErr("New password does not match", 400, null, res);
  }
};

const deleteUser = async (req, res) => {
  const id = req.body.id;
  const params = {
    isDeleted: true,
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    updatedBy: res.locals.payload.username,
  };

  await Users.update(params, { where: { id } })
    .then((results) => {
      if (results[0] !== 0) {
        responseOk(`User with id: ${id} deleted successfully`, results, res);
      } else {
        responseErr(`Failed to delete user with id: ${id}`, 400, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const restoreUser = async (req, res) => {
  const id = req.body.id;
  const params = {
    isDeleted: false,
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    updatedBy: res.locals.payload.username,
  };

  await Users.update(params, { where: { id } })
    .then((results) => {
      if (results[0] !== 0) {
        responseOk(`User with id: ${id} restored successfully`, results, res);
      } else {
        responseErr(`Failed to restore user with id: ${id}`, 400, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  getUsers,
  getUsersDetail,
  login,
  register,
  updateRole,
  selfUpdate,
  changePassword,
  deleteUser,
  restoreUser,
};
