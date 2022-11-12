const { fruitsModel } = require("../models");
const { connectionError, response } = require("../helpers");

const { Fruits } = fruitsModel;
const { responseErr } = response;

const checkFruitExist = async (req, res, next) => {
  const id = req.body.id;

  await Fruits.findOne({ where: { id } })
    .then((results) => {
      if (results) {
        next();
      } else {
        responseErr(`Fruit data with id: ${id} not found`, 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  checkFruitExist,
};
