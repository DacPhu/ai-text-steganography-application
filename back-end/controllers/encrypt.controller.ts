const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");

// Create new user
import { Request, Response } from "express";

export const encrypt = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
  }
};
