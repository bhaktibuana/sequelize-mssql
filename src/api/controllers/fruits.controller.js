const moment = require("moment");
const { fruitsModel } = require("../models");
const { connectionError, response, idGenerator } = require("../helpers");

const { Fruits } = fruitsModel;
const { responseErr, responseOk } = response;

const getData = async (req, res) => {
  await Fruits.findAll({ where: { isDeleted: false } })
    .then((results) => {
      if (results.length) {
        responseOk("Fetch fruits data success", results, res);
      } else {
        responseErr("No fruits data found", 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const createData = async (req, res) => {
  const createdBy = res.locals.payload.username;
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const params = req.body;

  const data = {
    id: idGenerator("FRUITS"),
    ...params,
    isDeleted: false,
    createdBy: createdBy,
    createdAt: createdAt,
    updatedBy: createdBy,
    updatedAt: createdAt,
  };

  await Fruits.create(data)
    .then((results) => {
      responseOk("Create data success", results, res);
    })
    .catch((error) => connectionError(error, res));
};

const updateData = async (req, res) => {
  const params = req.body;
  const updatedBy = res.locals.payload.username;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const id = params.id;
  delete params.id;

  const data = {
    ...params,
    updatedBy,
    updatedAt,
  };

  await Fruits.update(data, { where: { id } })
    .then((results) => {
      if (results) {
        responseOk(
          `Fruit data with id: ${id} updated successfully`,
          results,
          res
        );
      } else {
        responseErr(
          `Failed to update fruit data with id: ${id}`,
          400,
          null,
          res
        );
      }
    })
    .catch((error) => connectionError(error, res));
};

const deleteData = async (req, res) => {
  const id = req.body.id;
  const updatedBy = res.locals.payload.username;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();

  await Fruits.update(
    { isDeleted: true, updatedBy, updatedAt },
    { where: { id } }
  )
    .then((results) => {
      if (results) {
        responseOk(
          `Fruit data with id: ${id} deleted successfully`,
          results,
          res
        );
      } else {
        responseErr(
          `Failed to delete fruit data with id: ${id}`,
          400,
          null,
          res
        );
      }
    })
    .catch((error) => connectionError(error, res));
};

const restoreData = async (req, res) => {
  const id = req.body.id;
  const updatedBy = res.locals.payload.username;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();

  await Fruits.update(
    { isDeleted: false, updatedBy, updatedAt },
    { where: { id } }
  )
    .then((results) => {
      if (results) {
        responseOk(
          `Fruit data with id: ${id} restored successfully`,
          results,
          res
        );
      } else {
        responseErr(
          `Failed to restore fruit data with id: ${id}`,
          400,
          null,
          res
        );
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  getData,
  createData,
  updateData,
  deleteData,
  restoreData,
};
