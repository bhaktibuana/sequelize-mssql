const connectionError = (err, res) => {
  res.status(500).json({
    success: false,
    status: 500,
    message: "Unable to connect to database",
    data: null,
    error: err ? err : null,
  });
};

module.exports = connectionError;
