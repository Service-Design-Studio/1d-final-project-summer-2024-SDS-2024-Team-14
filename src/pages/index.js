// pages/index.js
import React from 'react';
import Router from 'next/router';
// import DocumentManager from './document_manager';
import Head from 'next/head';
import Homepage from '../components/homepage/homepage';
import '../styles/globals.css';

function Home() {
  return (
    <>
      <Head>
        <title>My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Router>
        <Homepage />
      </Router>
    </>
  );
}

export default Home;




/*export default function Home({ session }) {
  return (
    // <SessionProvider session={session}>
    <main className="flex flex-col align-middle min-h-screen my-0 mx-0 bg-white transition-all-500">
      <Homepage />
      </main>
    // </SessionProvider>
  );
}*/
