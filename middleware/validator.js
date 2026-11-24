const { validationResult } = require("express-validator");

const checkValidation = (req, res, next) => {
  const error = validationResult(req);
  let obj = {};

  error?.errors?.forEach((err) => {
    obj[err.path] = err.msg;
  });
  if (Object.keys(obj).length > 0) {
    throw {
      status: 400,
      error: obj,
    };
  }
  next();
};
module.exports = {
  checkValidation,
};
