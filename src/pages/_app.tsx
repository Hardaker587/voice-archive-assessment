import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../app/store";
import Layout from "../components/ui/ui.layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}
