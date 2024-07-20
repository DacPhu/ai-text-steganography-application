const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");
import axios from "axios";

import { Request, Response } from "express";

export const decrypt = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  const { msg, prompt } = req.body;
  const encodedMsg = Buffer.from(msg).toString("base64");

  try {
    // Send encoded message and prompt to another server via API
    const result = await axios.post("https://localhost:8000/api/encrypt", {
      msg: encodedMsg,
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
