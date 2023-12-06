import { store } from "@/redux/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { appWithI18Next } from "ni18n";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ni18nConfig } from "../../ni18n.config";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <Provider store={store}>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  </SessionProvider>
);

export default appWithI18Next(MyApp, ni18nConfig);
