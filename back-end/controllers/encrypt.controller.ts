const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");

import { Request, Response } from "express";

import axios from "axios";
import { parse } from "path";
import { encode } from "punycode";

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
      prompt: prompt,
      msg: encodedMsg,
      gen_model: "gpt2",
      start_pos: parseInt(start_pos),
      delta: parseFloat(delta),
      msg_base: parseInt(msg_base),
      seed_scheme: seed_scheme,
      window_length: parseInt(window_length),
      private_key: 0,
      max_new_tokens_ratio: 2,
      num_beams: parseFloat(num_beams),
      repetition_penalty: parseInt(repetition_penalty),
    };


    // Send the POST request
    const result = await fetch("http://localhost:6969/encrypt", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
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
