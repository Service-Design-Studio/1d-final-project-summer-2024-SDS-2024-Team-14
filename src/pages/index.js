import Head from 'next/head';
import Homepage from "./homepage/homepage.jsx";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import "../styles/globals.css"
import axios from "axios";
import Loading from '../components/loading.jsx';

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col align-middle min-w-minContent min-h-screen my-0 mx-0 bg-white transition-all-500">
      <Homepage/>
    </main>
  );
}
