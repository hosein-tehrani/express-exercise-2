const NotFoundError = (req, res, next) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    error: {
      type: "not found",
      message: `not found ${req.url} route`,
    },
  });
};
const ErrorHandler = (error, req, res, next) => {
  return res.json({
    statusCode: error.status || 500,
    error: {
      message: error.message || `internalServerError`,
      invalidParams: error.error,
    },
  });
};
module.exports = {
  NotFoundError,
  ErrorHandler,
};
