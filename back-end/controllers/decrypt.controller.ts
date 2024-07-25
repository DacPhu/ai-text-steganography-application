const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");
import axios from "axios";

import { Request, Response } from "express";

export const decrypt = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  const { text, msg_base, seed_scheme, window_length, max_new_tokens_ratio } =
    req.body;
  const encodedText = Buffer.from(text).toString("base64");

  try {
    const formData = new FormData();
    formData.append("text", encodedText);
    formData.append("msg_base", msg_base);
    formData.append("seed_scheme", seed_scheme);
    formData.append("window_length", window_length);

    // Send encoded message and prompt to another server via API
    const result = await axios.post("https://localhost:6969/dncrypt", {
      msg: encodedText,
    });

    // Decode the result from the server
    const decodedResult = Buffer.from(result.data, "base64").toString();
    console.log("Decoded Result:", decodedResult);
    // Handle the result from the server
    res.status(200).send(result.data);
  } catch (error) {
    console.error("Error sending data to server:", error);
    res.status(500).send("Internal Server Error");
  }
};
