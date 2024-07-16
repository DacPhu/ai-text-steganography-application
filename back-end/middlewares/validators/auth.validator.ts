import { body } from "express-validator";

export const signupScheme = [
  body("username")
    .exists()
    .withMessage("Must provide username")
    .bail()
    .trim()
    .isLength({ min: 4 }),
  body("password")
    .exists()
    .withMessage("Must provide password")
    .bail()
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters, contains lowercase, uppercase, number and special characters"
    ),
  body("email")
    .exists()
    .withMessage("Must provide email")
    .bail()
    .trim()
    .isEmail(),
];

export const loginScheme = [
  body("username").exists().withMessage("Must provide username"),
  body("password").exists().withMessage("Must provide password"),
];
