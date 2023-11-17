import Header from "@/components/Header";
import Landing from "@/components/Landing";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Apple Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Landing />
      </main>
    </>
  );
};

export default Home;
