const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRED_TIME,
  });
};

module.exports = generateJwt;
