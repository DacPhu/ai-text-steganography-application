export const sendEncryptCommand = async (
  text: string,
  file: File | null,
  gamma: number,
  messageBase: number,
  seedScheme: string,
  windowLength: number,
  maxNewTokenRatio: number,
  numBeams: number,
  repetitionPenalty: number
) => {
  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("gamma", gamma.toString());
    formData.append("msg_base", messageBase.toString());
    formData.append("seed_scheme", seedScheme);
    formData.append("window_length", windowLength.toString());
    formData.append("max_new_token_ratio", maxNewTokenRatio.toString());
    formData.append("num_beams", numBeams.toString());
    formData.append("repetition_penalty", repetitionPenalty.toString());
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch(`http://localhost:3001/encrypt`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const sendDecryptCommand = async (
  text: string,
  file: File | null,
  messageBase: number,
  seedScheme: string,
  windowLength: number
) => {
  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("msg_base", messageBase.toString());
    formData.append("seed_scheme", seedScheme);
    formData.append("window_length", windowLength.toString());
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch(`http://localhost:3001/decrypt`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
