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

export const createKeys = async (
  name: string,
) => {
  try {
    const body = {
      name: name,
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

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const delete_key = async (keyId: number) => {
  const body = {
    keyId: keyId,
  };
  try {
    const res = await fetch(`http://localhost:3001/key/`, {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify(body),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    const data = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
