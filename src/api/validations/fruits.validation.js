const yup = require("yup");
const { response } = require("../helpers");

const { responseErr, responseOk } = response;

const createDataValidation = (req, res, next) => {
  const data = {
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
  };

  const schema = yup.object().shape({
    name: yup.string().max(100).required(),
    stock: yup.number().integer().required(),
    price: yup.number().integer().required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((error) => {
      responseErr("Invalid create data", 400, error.errors, res);
    });
};

const updateDataValidation = (req, res, next) => {
  const data = {
    name: req.body.name !== "" ? (req.body.name ? req.body.name : null) : "",
    stock:
      req.body.stock !== "" ? (req.body.stock ? req.body.stock : null) : "",
    price:
      req.body.price !== "" ? (req.body.price ? req.body.price : null) : "",
  };

  const schemaData = {
    name: yup.string().max(100).required(),
    stock: yup.number().integer().required(),
    price: yup.number().integer().required(),
  };

  Object.keys(data).map((key) => {
    if (!data[key]) {
      delete data[key];
      delete schemaData[key];
    }
  });

  if (!data.name && !data.stock && !data.price) {
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

module.exports = {
  createDataValidation,
  updateDataValidation,
};
