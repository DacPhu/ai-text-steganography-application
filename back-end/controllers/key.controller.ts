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

    const KeySharing = models.default.SharingKey;
    const keySharing = await KeySharing.findAll({ where: { keyId } });

    if (!key) {
      return res.status(404).send("Key not found");
    }

    if (keySharing.length !== 0) {
      await KeySharing.destroy({ where: { keyId } });
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

  const user = req.user;
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const { keyId, username } = req.body;

  const Key = models.default.KeySharing;

  try {
    const User = models.default.User;
    const foundUser = await User.findOne({ where: { username } });
    console.log(foundUser);
    if (!foundUser) {
      return res.status(404).send("User not found");
    }
    const checkAvailableKey = await Key.findOne({
      where: { keyId, userId: foundUser.id },
    });

    if (checkAvailableKey) {
      return res.status(409).send("Key already shared with this user");
    }
    const newSharingKey = new Key({
      keyId: keyId,
      userId: foundUser.id,
    });

    await newSharingKey.save();
    return res.status(201).send(newSharingKey);
  } catch (error) {
    console.error("Error sharing key:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getKeysSharing = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  const userId = user.id;

  const KeySharing = models.default.KeySharing;
  const Key = models.default.SecretKey;

  const keys = await Key.findAll({
    where: { ownerId: userId },
    include: [
      {
        model: KeySharing,
        required: true,
      },
    ],
  });

  const User = models.default.User;

  for (let key of keys) {
    const keySharing = key;
    const data = keySharing.KeySharings[0];
    if (!data) continue;
    const userId = data.dataValues.userId;
    const user = await User.findOne({ where: { id: userId } });
    const username = user.username;
    key.setDataValue("usernameSharedTo", username);
  }

  return res.status(200).send(keys);
};

export const getKeysShared = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  const userId = user.id;

  const Key = models.default.SharingKey;
  const keys = await Key.findAll({ userId });

  return res.status(200).send(keys);
};

export const deleteKeyShared = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  const user = req.user;
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const userId = user.id;
  const { keyId } = req.body;

  const Key = models.default.SharingKey;
  const key = await Key.findOne({ userId, keyId });

  if (!key) {
    return res.status(404).send("Key not found");
  }

  await key.destroy();
  return res.status(200).send("Key deleted successfully");
};

export const deleteKeySharing = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  const user = req.user;
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const userId = user.id;
  const { keyId } = req.body;

  const Key = models.default.SharingKey;
  const key = await Key.findOne({ userId, keyId });

  if (!key) {
    return res.status(404).send("Key not found");
  }

  await key.destroy();
  return res.status(200).send("Key deleted successfully");
};
