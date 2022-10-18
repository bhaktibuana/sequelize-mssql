const express = require("express");
const router = express.Router();

router.use("/", (_, res) => {
  res.status(200).json({
    message: "SHE API Test Server.",
  });
});

module.exports = router;
