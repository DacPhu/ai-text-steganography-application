export const login = async (username: string, password: string) => {
  try {
    const res = await fetch(`http://localhost:3001/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const status = res.status;
    const response = await res.json();
    return { status: status, data: response.data };
  } catch (err) {
    console.error(err);
  }
};

export const signup = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const res = await fetch(`http://localhost:3001/signup`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const data = await res.json();
    const status = res.status;

    return { status: status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const logout = async () => {
  try {
    const res = await fetch(`http://localhost:3001/logout`, {
      credentials: "include",
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const data = await res.json();
    const status = res.status;

    return { status: status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const checkAuth = async () => {
  try {
    const res = await fetch(`http://localhost:3001/auth`, {
      credentials: "include",
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const status = res.status;
    const data = await res.json();

    return { status: status, data: data.message };
  } catch (err) {
    console.error(err);
  }
};
