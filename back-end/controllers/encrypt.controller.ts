const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");

import { Request, Response } from "express";

import axios from "axios";
import https from "https";

export const encrypt = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }
  const {
    msg,
    prompt,
    start_pos,
    seed_scheme,
    window_length,
    max_new_token_ratio,
    num_beams,
    repetition_penalty,
  } = req.body;
  const encodedMsg = Buffer.from(msg).toString("base64");

  try {
    // Send encoded message and prompt to another server via API
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("msg", encodedMsg);
    formData.append("start_pos", start_pos);
    formData.append("seed_scheme", seed_scheme);
    formData.append("window_length", window_length);
    formData.append("max_new_token_ratio", max_new_token_ratio);
    formData.append("num_beams", num_beams);
    formData.append("repetition_penalty", repetition_penalty);

    const result = await axios.post("https://localhost:6969/encrypt", formData);

    if (result.status !== 200) {
      return res.status(500).send("Internal Server Error");
    }
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
