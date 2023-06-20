import "@/styles/globals.css";
import mixpanelInit from "@/utils/mixpanel";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import PaddleLoader from "./../components/Payment";
import ContextConsumer from "@/contexts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  mixpanelInit();

  return (
    <ContextConsumer>
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
    </ContextConsumer>
  );
}
