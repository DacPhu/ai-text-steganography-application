const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");

import { Request, Response } from "express";

import axios from "axios";

export const encrypt = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }
  const {
    msg,
    prompt,
    delta,
    msg_base,
    start_pos,
    seed_scheme,
    window_length,
    max_new_tokens_ratio,
    num_beams,
    repetition_penalty,
  } = req.body;
  const encodedMsg = Buffer.from(msg).toString("base64");

  try {
    // Send encoded message and prompt to another server via API
    // const body = {};
    // console.log("HEEEEEEEE", JSON.stringify(body));
    const rawData = {
      prompt: "A nice day:",
      msg: "VGhpcyBpcyBhIG5pY2UgZGF5",
      gen_model: "gpt2",
      start_pos: 0,
      delta: 10,
      msg_base: 2,
      seed_scheme: "sha_left_hash",
      window_length: 1,
      private_key: 0,
      max_new_tokens_ratio: 2,
      num_beams: 4,
      repetition_penalty: 1,
    };

    const body = {
      prompt: String(prompt), // converted to string
      msg: String(encodedMsg), // converted to string
      gen_model: String("gpt2"), // converted to string
      start_pos: Number(start_pos), // converted to number
      delta: Number(delta), // converted to number
      msg_base: Number(msg_base), // converted to number
      seed_scheme: String(seed_scheme), // converted to string
      window_length: Number(window_length), // converted to number
      private_key: Number(0), // explicitly set to number 0
      max_new_tokens_ratio: Number(max_new_tokens_ratio), // converted to number
      num_beams: Number(num_beams), // converted to number
      repetition_penalty: Number(repetition_penalty), // converted to number
    };

    // Send the POST request
    const result = await fetch("http://localhost:6969/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawData),
    });

    if (result.status !== 200) {
      return res.status(500).send("Internal Server Error");
    }

    const data = JSON.parse(await result.text());
    console.log("Data:", data);
    const text: string = data.text;
    const msgRate: number = parseFloat(data.msg_rate) * 100;
    const tokenInfo: Array<string> = data.tokens_info;

    console.log(msgRate);
    console.log(tokenInfo);
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
