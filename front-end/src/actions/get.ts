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
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("msg", message);
  formData.append("delta", delta.toString());
  formData.append("private_key", secretKey.toString());
  formData.append("msg_base", messageBase.toString());
  formData.append("start_pos", startPosition.toString());
  formData.append("seed_scheme", seedScheme);
  formData.append("window_length", windowLength.toString());
  formData.append("min_new_tokens_ratio", minNewTokensRatio.toString());
  formData.append("max_new_tokens_ratio", maxNewTokensRatio.toString());
  formData.append("num_beams", numBeams.toString());
  formData.append("repetition_penalty", repetitionPenalty.toString());

  const res = await fetch(`http://localhost:3001/processing/encrypt`, {
    credentials: "include",
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("DATA        ", data);

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
    const formData = new FormData();
    formData.append("text", text);
    formData.append("msg_base", messageBase.toString());
    formData.append("seed_scheme", seedScheme);
    formData.append("window_length", windowLength.toString());
    formData.append("private_key", secretKey.toString());

    const res = await fetch(`http://localhost:3001/processing/decrypt`, {
      credentials: "include",
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
