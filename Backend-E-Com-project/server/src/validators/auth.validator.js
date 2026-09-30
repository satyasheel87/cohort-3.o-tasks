import { body, validationResult } from "express-validator";

// === register validation handle ===
export const registerValidation = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Invalid email address"),
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name length must be between 2 to 50 characters"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 character long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];

// === login validation handle ===
export const loginValidation = [
  body("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 character long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];