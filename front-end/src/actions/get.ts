export const sendEncryptCommand = async (
  prompt: string,
  message: string,
  delta: number,
  secretKey: number,
  messageBase: number,
  startPosition: number,
  seedScheme: string,
  windowLength: number,
  minNewTokensRatio: number,
  maxNewTokensRatio: number,
  numBeams: number,
  repetitionPenalty: number
) => {
  const rawData = {
    prompt: prompt,
    msg: message,
    delta: delta,
    private_key: secretKey,
    msg_base: messageBase,
    start_pos: startPosition,
    seed_scheme: seedScheme,
    window_length: windowLength,
    min_new_tokens_ratio: minNewTokensRatio,
    max_new_tokens_ratio: maxNewTokensRatio,
    num_beams: numBeams,
    repetition_penalty: repetitionPenalty,
  };

  const res = await fetch(`http://localhost:3001/processing/encrypt`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(rawData),
    headers: new Headers({
      "content-type": "application/json",
    }),
  });

  const data = await res.json();

  return { status: res.status, data: data };
};

export const sendDecryptCommand = async (
  text: string,
  messageBase: number,
  secretKey: number,
  seedScheme: string,
  windowLength: number
) => {
  try {
    const rawData = {
      text: text,
      msg_base: messageBase,
      seed_scheme: seedScheme,
      window_length: windowLength,
      private_key: secretKey,
    };

    console.log("SECRET KEY: ", secretKey);
    const res = await fetch(`http://localhost:3001/processing/decrypt`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(rawData),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    const data = JSON.parse(await res.text());

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
