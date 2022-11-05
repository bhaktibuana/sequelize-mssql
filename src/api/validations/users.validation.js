const yup = require("yup");
const { response } = require("../helpers");

const { responseErr } = response;

const loginValidation = (req, res, next) => {
  const params = {
    username:
      req.body.username !== ""
        ? req.body.username
          ? req.body.username
          : null
        : "",
    email:
      req.body.email !== "" ? (req.body.email ? req.body.email : null) : "",
  };
  const password = req.body.password;

  if (params.username === null) {
    delete params.username;
  } else {
    delete params.email;
  }

  const data = {
    ...params,
    password,
  };

  const inputMethod = Object.keys(data)
    .filter((key) => key !== "password")
    .join("");

  const schema = yup.object().shape(
    inputMethod === "username"
      ? {
          username: yup.string().max(30).required(),
          password: yup.string().min(8).required(),
        }
      : {
          email: yup.string().email().max(100).required(),
          password: yup.string().min(8).required(),
        }
  );

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      res.locals.params = data;
      next();
    })
    .catch((error) => {
      responseErr("Invalid login data", 400, error.errors, res);
    });
};

const registerValidation = (req, res, next) => {
  const params = req.body;

  const data = {
    name: params.name,
    username: params.username,
    email: params.email,
    password: params.password,
    passwordConfirmation: params.passwordConfirmation,
  };

  const schema = yup.object().shape({
    name: yup.string().max(100).required(),
    username: yup.string().max(30).required(),
    email: yup.string().email().max(100).required(),
    password: yup.string().min(8).required(),
    passwordConfirmation: yup
      .string()
      .min(8)
      .matches(data.password, "password does not match")
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      res.locals.params = data;
      next();
    })
    .catch((error) => {
      responseErr("Invalid registration data", 400, error.errors, res);
    });
};

const selfUpdateValidation = (req, res, next) => {
  const data = {
    name: req.body.name !== "" ? (req.body.name ? req.body.name : null) : "",
    username:
      req.body.username !== ""
        ? req.body.username
          ? req.body.username
          : null
        : "",
    email:
      req.body.email !== "" ? (req.body.email ? req.body.email : null) : "",
    password: req.body.password,
  };

  const schemaData = {
    name: yup.string().max(100).required(),
    username: yup.string().max(30).required(),
    email: yup.string().email().max(100).required(),
    password: yup.string().min(8).required(),
  };

  if (!data.name) {
    delete data.name;
    delete schemaData.name;
  }

  if (!data.username) {
    delete data.username;
    delete schemaData.username;
  }

  if (!data.email) {
    delete data.email;
    delete schemaData.email;
  }

  if (!data.name && !data.username && !data.email) {
    responseErr("You need to update atleast one data", 400, null, res);
  }

  const schema = yup.object().shape(schemaData);

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((error) => {
      responseErr("Invalid update data", 400, error.errors, res);
    });
};

const changePasswordValidation = (req, res, next) => {
  const params = req.body;

  const data = {
    oldPassword: params.oldPassword,
    newPassword: params.newPassword,
    newPasswordConfirmation: params.newPasswordConfirmation,
  };

  const schema = yup.object().shape({
    oldPassword: yup.string().min(8).required(),
    newPassword: yup.string().min(8).required(),
    newPasswordConfirmation: yup
      .string()
      .min(8)
      .matches(data.newPassword, "new password does not match")
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((error) => {
      responseErr("Invalid user password data", 400, error.errors, res);
    });
};

module.exports = {
  loginValidation,
  registerValidation,
  selfUpdateValidation,
  changePasswordValidation,
};
