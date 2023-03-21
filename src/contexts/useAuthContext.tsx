import { apiAuth } from "@/api-client";
import {
  AccountDetailResponse,
  LoginResponseType,
} from "@/api-client/types/AuthType";
import React, { useEffect, useState } from "react";

export interface IAuthContext {
  authState?: LoginResponseType | null;
  accountExtendDetail?: AccountDetailResponse | null;
  handleLogged: (authState?: LoginResponseType) => void;
  handleLogOut: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  authState: null,
  accountExtendDetail: null,
  handleLogged: (authState?: LoginResponseType) => {},
  handleLogOut: () => {},
});

export const useAuthContext = (): IAuthContext => {
  const [authState, setAuthState] = useState<
    LoginResponseType | null | undefined
  >(null);

  const [accountExtendDetail, setAccountExtendDetail] = useState<any>(null);

  useEffect(() => {
    const dataLocal = localStorage.getItem("AQToken") ?? "null";
    const auth = JSON.parse(dataLocal);
    setAuthState(auth);
  }, []);

  useEffect(() => {
    if (authState?.access_token) getAccountExtendDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.access_token]);

  const getUserInfo = async () => {
    const userInfoData = await apiAuth.getUserInfo(
      authState?.access_token ?? ""
    );
    console.log(userInfoData);
  };

  const getAccountExtendDetails = async () => {
    try {
      const accountEDData = await apiAuth.getAccountExtendDetails(
        authState?.access_token ?? ""
      );
      setAccountExtendDetail(accountEDData);
    } catch (error) {
      alert("Error please try again");
    }
  };

  const handleLogged = (authState?: LoginResponseType) => {
    localStorage.setItem("AQToken", JSON.stringify(authState));
    setAuthState(authState);
  };
  const handleLogOut = () => {
    localStorage.removeItem("AQToken");
    setAuthState(null);
  };

  return { authState, accountExtendDetail, handleLogged, handleLogOut };
};
