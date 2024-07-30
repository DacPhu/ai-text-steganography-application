"use client";

import { checkAuth } from "./actions/auth";
import { createContext, useEffect, useState } from "react";

interface AppContextProps {
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  isAuth: false,
  setAuth: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    checkAuth().then((res) => {
      if (res && res.status != 401) {
        console.log("RES", res);
        setAuth(true);
        console.log("AUTH", isAuth);
      }
    });
  }, [isAuth]);

  return (
    <AppContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};
