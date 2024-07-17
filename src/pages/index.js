import Head from 'next/head';
import Homepage from "../components/homepage/homepage.js";
import "../styles/globals.css";
import "../hooks/useAuth"
import useAuth from "@/hooks/useAuth";
import NaviBar from "../components/NaviBar";

export default function Home({ session }) {
    useAuth();
  return (
    <main className="flex flex-col align-middle min-h-screen my-0 mx-0 bg-white transition-all-500 bg-local bg-[url('../../public/images/background/gebirah-background.jpg')]">
        <NaviBar/>
      <Homepage />
      </main>
  );
}