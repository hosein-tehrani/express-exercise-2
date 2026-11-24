const { body } = require("express-validator");

const authValidator = () => [
  body("email").isEmail().withMessage("email is invalid"),
  body("password")
    .isLength({ min: 5, max: 15 })
    .withMessage("your password must be between 5-15 charactor"),
];
const registerValidator = () => [
  body("name")
    .isLength({ min: 5, max: 15 })
    .withMessage("your name must be between 5-15 charactor"),
  body("age")
    .custom((value) => {
      if (isNaN(value)) {
        throw new Error("age must be number");
      } else if (+value > 90 || +value < 12) {
        throw new Error("your age must be between 12-90");
      }
      return true;
    }),
  body("phone")
    .isMobilePhone(["fa-IR", "en-US"])
    .withMessage("mobile phone is invalid"),
  body("password")
    .isLength({ min: 5, max: 15 })
    .withMessage("your password must be between 5-15 charactor"),
];
module.exports = {
  authValidator,
  registerValidator,
};
