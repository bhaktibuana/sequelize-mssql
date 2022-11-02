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
  };

  const schema = yup.object().shape({
    name: yup.string().max(100).required(),
    username: yup.string().max(30).required(),
    email: yup.string().email().max(100).required(),
    password: yup.string().min(8).required(),
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

module.exports = {
  loginValidation,
  registerValidation,
};
