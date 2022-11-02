const crypto = require("crypto");
const moment = require("moment");

const generateId = (tabelName) => {
  const idArr = [];
  const getTimestamp = new Date().getTime();
  const date = moment().format("YYMMDD").toString();

  idArr.push(removeVowels(tabelName));
  idArr.push(date);
  idArr.push(timestampHash(getTimestamp));

  return idArr.join("-");
};

const timestampHash = (timestamp) => {
  const saltLength = 8;
  const salt = crypto
    .randomBytes(Math.ceil(saltLength / 2))
    .toString("hex")
    .slice(0, saltLength);
  const hash = crypto
    .createHmac("sha256", salt)
    .update(timestamp.toString())
    .digest("hex");

  return hash.slice(0, 6);
};

const removeVowels = (str) => {
  const splitStr = str.split("");
  const firstLetter = splitStr[0];
  splitStr.shift();
  const restStr = splitStr.join("");

  let consonantsStr = "bcdfghjklmnpqrstvwyz";
  consonantsStr = consonantsStr + consonantsStr.toUpperCase();
  const consonants = consonantsStr.split("");

  const output = [firstLetter];

  for (let i = 0; i < restStr.length; i++) {
    let present = false;

    for (let j = 0; j < consonants.length; j++) {
      if (restStr[i] === consonants[j]) {
        present = true;
        break;
      }
    }

    if (present) {
      output.push(restStr[i]);
    }
  }

  return output.join("");
};

module.exports = generateId;
