const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");
import axios from "axios";

import { Request, Response } from "express";

export const decrypt = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  const { text, msg_base, seed_scheme, window_length } = req.body;

  try {
    const rawData = {
      text: text,
      msg_base: parseInt(msg_base),
      seed_scheme: seed_scheme,
      private_key: 0,
      window_length: parseInt(window_length),
    };

    // Send encoded message and prompt to another server via API
    const result = await axios.post("https://localhost:6969/dncrypt", rawData, {
      headers: {
        "content-Type": "application/json",
      },
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
