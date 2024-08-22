"use client"
import React, { createContext } from "react";
import { TokenBandlerDTO } from "../types/tokenbandler.dto";
import useStorage from "../hooks/useStoreg";
import { AUTH_TOKEN_KEY } from "../common/const";
import moment from "moment";

export const initialAuthorization: TokenBandlerDTO = {
  token: "",
  refresh: "",
  expire: "",
};

interface AuthContextProps {
  authorization: TokenBandlerDTO;
  setAuthorization: Function;
  isAuthenticate: () => boolean;
}

export const AuthorizationProviderContext = createContext<AuthContextProps>({
  authorization: initialAuthorization,
  setAuthorization: () => null,
  isAuthenticate: () => false,
});

interface PropsDTO {
  children: React.ReactNode
}

export const AuthorizationProvider = ({ children }:PropsDTO) => {
  const [authorization, setAuthorization] = useStorage<TokenBandlerDTO>(
    AUTH_TOKEN_KEY,
    initialAuthorization
  );

  const isAuthenticate = ():boolean => {
    if (typeof window !== "undefined" && window.localStorage) {
      // Get the authorization data from local storage
      let json = window.localStorage.getItem(AUTH_TOKEN_KEY);
      const auth = json ? (JSON.parse(json) as TokenBandlerDTO) : null;
      if (auth) {
        // Check if the authorization token is empty or expired
        const expired = moment(auth.expire).isBefore(moment());

        if (auth.token !== "" || !expired) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <AuthorizationProviderContext.Provider value={{ authorization, setAuthorization, isAuthenticate }}>
      {children}
    </AuthorizationProviderContext.Provider>
  )
};
