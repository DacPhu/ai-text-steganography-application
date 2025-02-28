const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { validationResult, matchedData } = require("express-validator");
const saltRounds = 10;

// Create new user
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  let password = data.password;
  console.log(data);

  // Use bcrypt to hash the password
  let hashedPassword = await bcrypt.hash(password, saltRounds);
  data.password = hashedPassword;

  const firstName = data.username;
  const User = models.default.User;

  try {
    const newUser = await User.create({
      firstName: firstName,
      lastName: "",
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      user_id: newUser.id,
    });
  } catch (err: any) {
    console.log(err);
    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "User has already existed",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating new user",
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  // if request is invalid (empty body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(errors);
  }
  const data = matchedData(req);

  let username = data.username;
  let password = data.password;
  try {
    // console.log(models);
    console.log(models.default.User);
    const User = models.default.User;
    // Find user with given username
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({
        message: "User do not exists",
      });
    }
    // Check password
    let matched = await bcrypt.compare(password, user.password);
    if (matched) {
      // Create new access token

      const privateKey = fs.readFileSync(path.join(__dirname, "../jwt.key"));
      const accessToken = jwt.sign(
        {
          username: user.username,
          id: user.id,
        },
        privateKey,
        { algorithm: "RS256", expiresIn: "7d" }
      );

      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: "Log in successfully",
          username: user.username,
          user_id: user.id,
        });
    } else {
      return res.status(401).json({
        message: "Wrong password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Errors occur when finding user",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).send({
      message: "Log out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Errors occur when finding user",
    });
  }
};
