const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");

import { Request, Response } from "express";

export const decrypt = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  const { text, msg_base, seed_scheme, window_length, private_key } = req.body;

  try {
    const rawData = {
      text: text,
      gen_model: "gpt2",
      msg_base: parseInt(msg_base),
      seed_scheme: seed_scheme,
      window_length: parseInt(window_length),
      private_key: parseInt(private_key),
    };

    const result = await fetch("http://localhost:6969/decrypt", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(rawData),
    });

    // Decode the result from the server
    const data = JSON.parse(await result.text());
    console.log("Decoded Data:", data);

    for (let key in data) {
      const decodedItem = atob(data[key]);
      data[key] = decodedItem;
    }
    console.log(data);
    // Handle the result from the server
    return res.status(200).send(data);
  } catch (error) {
    console.error("Error sending data to server:", error);
    return res.status(500).send("Internal Server Error");
  }
};
