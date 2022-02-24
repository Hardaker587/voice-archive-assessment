import type { NextPage } from 'next'
import Head from 'next/head'
import { Tab } from '../components/tabs/tabs.tab'

import Counter from '../features/counter/Counter'
import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <Counter />
        <Tab />
      </header>
    </div>
  )
}

export default IndexPage
