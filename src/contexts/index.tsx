import React, { FC } from "react";
import { AuthContext, useAuthContext } from "./useAuthContext";
import { SearchContext, useSearchContext } from "./useSearchContext";

interface IContextConsumer {
  children: React.ReactNode;
}

const ContextConsumer: FC<IContextConsumer> = ({ children }) => {
  const {
    authState,
    accountExtendDetail,
    handleLogOut,
    handleLogged,
    getAccountExtendDetails,
    canCancel,
    getCanCancel,
    typePayment,
    setTypePaymentAction,
  } = useAuthContext();

  const { keyword, setKeyword } = useSearchContext();

  return (
    <AuthContext.Provider
      value={{
        authState,
        accountExtendDetail,
        handleLogOut,
        handleLogged,
        getAccountExtendDetails,
        canCancel,
        getCanCancel,
        typePayment,
        setTypePaymentAction,
      }}
    >
      <SearchContext.Provider
        value={{
          keyword,
          setKeyword,
        }}
      >
        {children}
      </SearchContext.Provider>
    </AuthContext.Provider>
  );
};

export default ContextConsumer;
