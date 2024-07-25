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
    const body = {
      msg: encodedMsg,
      prompt: prompt,
      start_pos: start_pos,
      seed_scheme: seed_scheme,
      window_length: window_length,
      max_new_token_ratio: max_new_token_ratio,
      num_beams: num_beams,
      repetition_penalty: repetition_penalty,
    };

    const result = await axios.post(
      "http://localhost:6969/encrypt",
      JSON.stringify(body)
    );

    if (result.status !== 200) {
      return res.status(500).send("Internal Server Error");
    }

    const text: string = result.data.text;
    const msgRate: number = parseFloat(result.data.msgRate) * 100;
    const tokenInfo: Array<string> = result.data.tokenInfo;

    res.status(200).send({
      text: text,
      msgRate: msgRate,
      tokenInfo: tokenInfo,
    });
  } catch (error) {
    console.error("Error sending data to server:", error);
    res.status(500).send("Internal Server Error");
  }
};
