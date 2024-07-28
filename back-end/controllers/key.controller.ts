const models = require("../models");
const { validationResult } = require("express-validator");

import { Request, Response } from "express";

export const getKey = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    const userId = user.id;
    const Key = models.default.SecretKey;
    const keys = await Key.findAll({ owner: userId });
    return res.status(200).send(keys);
  } catch (error) {
    console.error("Error retrieving keys:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const createKey = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  const { userId, key } = req.body;

  try {
    const User = models.User;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const Key = models.Key;
    const newKey = new Key({
      user: userId,
      key: key,
    });

    await newKey.save();
    return res.status(201).send(newKey);
  } catch (error) {
    console.error("Error creating key:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteKey = async (req: Request, res: Response) => {
  const params = req.params;
  console.log(params);

  try {
    const Key = models.Key;
    const keyId = req.params.keyId;
    const key = await Key.findById(keyId);
    if (!key) {
      return res.status(404).send("Key not found");
    }
    await key.remove();
    return res.status(200).send("Key deleted successfully");
  } catch (error) {
    console.error("Error deleting key:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const sharingKey = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  const { keyId, userId } = req.body;
};
