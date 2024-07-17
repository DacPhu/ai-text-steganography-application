export const sendEncryptCommand = async (
  text: string,
  file: File | null,
  param1: string,
  param2: number
) => {
  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("param1", param1);
    formData.append("param2", param2.toString());
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
  param1: string,
  param2: number
) => {
  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("param1", param1);
    formData.append("param2", param2.toString());
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
