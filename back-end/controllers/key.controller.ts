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

  const { keyName } = req.body;

  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    const userId = user.id;

    const Key = models.default.SecretKey;
    const randomInt = Math.floor(Math.random() * 1000);
    const newKey = new Key({
      ownerId: userId,
      name: keyName,
      value: randomInt,
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
    const Key = models.default.SecretKey;
    const keyId = req.body.keyId;
    const key = await Key.findByPk(keyId);
    if (!key) {
      return res.status(404).send("Key not found");
    }
    await key.destroy();
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

  try {
    const Key = models.default.SecretKey;
    const key = await Key.findById;
  } catch (error) {}
};
