const crypto = require("crypto");

const passwordHash = (password) => {
  const salt = "7facf1a3";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

/* UNCOMMENT CODE BELLOW TO GENERATE SALT */

// const generateSalt = () => {
//   const saltLength = 8;
//   const salt = crypto
//     .randomBytes(Math.ceil(saltLength / 2))
//     .toString("hex")
//     .slice(0, saltLength);

//   return salt;
// };
// console.log(generateSalt());

module.exports = passwordHash;
