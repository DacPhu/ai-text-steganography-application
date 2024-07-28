export const getKeys = async () => {
  const res = await fetch(`http://localhost:3001/key`, {
    credentials: "include",
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
    }),
  });

  const data = await res.json();

  return { status: res.status, data: data };
};

export const createKey = async (keyName: string) => {
  try {
    const body = {
      keyName: keyName,
    };

    const res = await fetch(`http://localhost:3001/key`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    const data = await res.json();
    console.log(data);
    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const deleteKey = async (keyId: number) => {
  const body = {
    keyId: keyId,
  };
  try {
    const res = await fetch(`http://localhost:3001/key`, {
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

export const shareKey = async (keyId: number, username: string) => {
  const body = {
    keyId: keyId,
    username: username,
  };

  try {
    const res = await fetch(`http://localhost:3001/key/sharing`, {
      credentials: "include",
      method: "POST",
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

export const getKeysSharing = async () => {
  try {
    const res = await fetch(`http://localhost:3001/key/sharing`, {
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

export const deleteKeySharing = async (keyId: number, username: string) => {
  const body = {
    keyId: keyId,
    username: username,
  };

  try {
    const res = await fetch(`http://localhost:3001/key/sharing`, {
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
