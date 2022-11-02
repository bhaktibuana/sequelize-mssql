const responseOk = (message, results, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: message ? message : null,
    data: results ? results : null,
  });
};

const responseErr = (message, status, error, res) => {
  res.status(status).json({
    success: false,
    status,
    message,
    data: null,
    error: error ? error : null,
  });
};

module.exports = {
  responseOk,
  responseErr,
};
