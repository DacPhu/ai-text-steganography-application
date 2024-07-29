export const getKeysShared = async () => {
  try {
    const res = await fetch(`http://localhost:3001/key/shared`, {
      credentials: "include",
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    const data = await res.json();
    if (data.status === 401) {
      return { status: 401, data: [] };
    }
    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const deleteKeyShared = async (keyId: number) => {
  const body = {
    keyId: keyId,
  };
  try {
    const res = await fetch(`http://localhost:3001/key/shared`, {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify(body),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    const data = await res.text();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
