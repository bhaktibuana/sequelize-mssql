const { usersModel } = require("../models");
const { connectionError, response, passwordHash } = require("../helpers");

const { Users, Op } = usersModel;
const { responseErr } = response;

const checkUserExist = async (req, res, next) => {
  const params = {
    username: req.body.username ? req.body.username : null,
    email: req.body.email ? req.body.email : null,
  };

  if (!params.username) {
    delete params.username;
  } else {
    delete params.email;
  }

  await Users.findOne({ where: { ...params } })
    .then((results) => {
      if (results) {
        res.locals.params = params;
        next();
      } else {
        params.username
          ? responseErr(
              `User with username: ${params.username} doesn't exist`,
              404,
              null,
              res
            )
          : responseErr(
              `User with email: ${params.email} doesn't exist`,
              404,
              null,
              res
            );
      }
    })
    .catch((error) => connectionError(error, res));
};

const checkEmailExist = async (req, res, next) => {
  const email = res.locals.params.email;

  await Users.findOne({ where: { email } })
    .then((results) => {
      if (!results) {
        next();
      } else {
        responseErr(`User with email: ${email} already exist`, 400, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const checkUsernameExist = async (req, res, next) => {
  const username = res.locals.params.username;

  await Users.findOne({ where: { username } })
    .then((results) => {
      if (!results) {
        next();
      } else {
        responseErr(
          `User with username: ${username} already exist`,
          400,
          null,
          res
        );
      }
    })
    .catch((error) => connectionError(error, res));
};

const verifySelfUpdate = async (req, res, next) => {
  const params = {
    username: res.locals.payload.username,
    email: res.locals.payload.email,
    password: passwordHash(req.body.password),
  };

  console.log(params.password);

  await Users.findOne({ where: { ...params } })
    .then((results) => {
      if (results) {
        next();
      } else {
        responseErr("Wrong password", 401, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const checkEmailExistSelfUpdate = async (req, res, next) => {
  const id = res.locals.payload.id;
  const email = req.body.email ? req.body.email : "";

  await Users.findOne({ where: { email, id: { [Op.ne]: id } } })
    .then((results) => {
      if (!results) {
        next();
      } else {
        responseErr(`User with email: ${email} already exist`, 400, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const checkUsernameExistSelfUpdate = async (req, res, next) => {
  const id = res.locals.payload.id;
  const username = req.body.username ? req.body.username : "";

  await Users.findOne({ where: { username, id: { [Op.ne]: id } } })
    .then((results) => {
      if (!results) {
        next();
      } else {
        responseErr(
          `User with username: ${username} already exist`,
          400,
          null,
          res
        );
      }
    })
    .catch((error) => connectionError(error, res));
};

const checkUserExistChangePassword = async (req, res, next) => {
  const id = res.locals.payload.id;
  const oldPassword = passwordHash(req.body.oldPassword);

  await Users.findOne({ where: { id, password: oldPassword } })
    .then((results) => {
      if (results) {
        next();
      } else {
        responseErr("Wrong old password", 401, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  checkUserExist,
  checkEmailExist,
  checkUsernameExist,
  verifySelfUpdate,
  checkEmailExistSelfUpdate,
  checkUsernameExistSelfUpdate,
  checkUserExistChangePassword,
};
