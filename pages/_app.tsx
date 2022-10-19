import "../styles/globals.css";
import type { AppProps } from "next/app";

import TodoContextProvider from "../store/store-todo";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <TodoContextProvider>
      <Component {...pageProps} />
    </TodoContextProvider>
  );
};

export default MyApp;
