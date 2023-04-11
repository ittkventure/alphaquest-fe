import { AuthContext, useAuthContext } from "@/contexts/useAuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Slide, ToastContainer } from "react-toastify";
const queryClient = new QueryClient();
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import PaddleLoader from "./../components/Payment";

export default function App({ Component, pageProps }: AppProps) {
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
      <PaddleLoader />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          theme="dark"
          hideProgressBar
          autoClose={1000}
          style={{ color: "#E25148" }}
          transition={Slide}
        />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
