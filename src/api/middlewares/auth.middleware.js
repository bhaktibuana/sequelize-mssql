const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "Unauthorized.",
    });
  } else {
    const splitToken = req.headers.authorization.split(" ");

    if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
      res.status(400).json({
        auth: false,
        message: "Wrong authorization format.",
      });
    } else {
      jwt.verify(
        splitToken[1],
        process.env.JWT_SECRET_KEY,
        { algorithms: ["HS256"] },
        (err, payload) => {
          if (err && err.name === "TokenExpiredError") {
            res.status(401).json({
              auth: false,
              message: "Token expired.",
            });
          } else if (err) {
            res.status(401).json({
              auth: false,
              message: "Invalid Token.",
            });
          } else {
            res.locals.payload = payload;
            next();
          }
        }
      );
    }
  }
};

module.exports = {
  isAuth,
};
