import type { NextPage } from "next";
import Head from "next/head";
import { Tabs } from "../components/tabs/tabs.tabs";

import Counter from "../features/counter/Counter";
import styles from "../styles/Home.module.css";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Aarhus Bar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs />
    </div>
  );
};

export default IndexPage;
