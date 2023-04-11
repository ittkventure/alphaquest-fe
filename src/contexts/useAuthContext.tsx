import { apiAuth } from "@/api-client";
import {
  AccountDetailResponse,
  LoginResponseType,
} from "@/api-client/types/AuthType";
import React, { useEffect, useState } from "react";

export enum TypePayment {
  PRO = "PRO",
  TRIAL = "TRIAL",
}

export interface IAuthContext {
  authState?: LoginResponseType | null;
  accountExtendDetail?: AccountDetailResponse | null;
  canCancel?: boolean | null;
  handleLogged: (authState?: LoginResponseType) => void;
  handleLogOut: () => void;
  getAccountExtendDetails: () => Promise<void>;
  getCanCancel: () => Promise<void>;
  typePayment?: TypePayment;
  setTypePaymentAction?: (type: TypePayment) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  authState: null,
  accountExtendDetail: null,
  handleLogged: (authState?: LoginResponseType) => {},
  handleLogOut: () => {},
  getAccountExtendDetails: async () => {},
  canCancel: false,
  getCanCancel: async () => {},
});

export const useAuthContext = (): IAuthContext => {
  const [authState, setAuthState] = useState<
    LoginResponseType | null | undefined
  >(null);

  const [accountExtendDetail, setAccountExtendDetail] = useState<any>(null);
  const [canCancel, setCanCancel] = useState<boolean | null | undefined>(null);
  const [typePayment, setTypePayment] = useState<TypePayment | undefined>();

  useEffect(() => {
    const dataLocal = localStorage.getItem("AQToken") ?? "null";
    const auth = JSON.parse(dataLocal);
    setAuthState(auth);
  }, []);

  useEffect(() => {
    if (authState?.access_token) {
      getAccountExtendDetails();
      getCanCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.access_token]);

  const getUserInfo = async () => {
    const userInfoData = await apiAuth.getUserInfo(
      authState?.access_token ?? ""
    );
  };

  const getCanCancel = async () => {
    try {
      const canCancelRes = await apiAuth.canCancel(
        authState?.access_token ?? ""
      );
      setCanCancel(canCancelRes);
      return;
    } catch (error) {
      return;
    }
  };

  const getAccountExtendDetails = async () => {
    try {
      const accountEDData = await apiAuth.getAccountExtendDetails(
        authState?.access_token ?? ""
      );
      setAccountExtendDetail(accountEDData);
      return;
    } catch (error) {
      return;
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
  const setTypePaymentAction = (type?: TypePayment) => {
    setTypePayment(type);
  };

  return {
    authState,
    accountExtendDetail,
    handleLogged,
    handleLogOut,
    getAccountExtendDetails,
    canCancel: canCancel,
    getCanCancel,
    typePayment,
    setTypePaymentAction,
  };
};
