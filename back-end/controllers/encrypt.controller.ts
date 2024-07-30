const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");

import { Request, Response } from "express";

export const encrypt = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  console.log("BODY", req.body);
  const {
    msg,
    prompt,
    delta,
    msg_base,
    private_key,
    start_pos,
    seed_scheme,
    window_length,
    min_new_tokens_ratio,
    max_new_tokens_ratio,
    num_beams,
    repetition_penalty,
  } = req.body;
  console.log(req.body);
  const encodedMsg = Buffer.from(msg).toString("base64");

  try {
    // Send encoded message and prompt to another server via API
    const rawData = {
      prompt: prompt,
      msg: encodedMsg,
      gen_model: "gpt2",
      start_pos: parseInt(start_pos),
      delta: parseFloat(delta),
      msg_base: parseInt(msg_base),
      seed_scheme: seed_scheme,
      window_length: parseInt(window_length),
      private_key: parseInt(private_key) | 0,
      min_new_tokens_ratio: parseFloat(min_new_tokens_ratio),
      max_new_tokens_ratio: parseFloat(max_new_tokens_ratio),
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
    const text: string = data.texts[0];
    const msgRate: number = parseFloat(data.msgs_rates[0]) * 100;
    const tokensInfos: any = data.tokens_infos;
    res.status(200).send({
      text: text,
      msgRate: msgRate,
      tokensInfo: tokensInfos[0],
    });
  } catch (error) {
    console.error("Error sending data to server:", error);
    res.status(500).send("Internal Server Error");
  }
};
