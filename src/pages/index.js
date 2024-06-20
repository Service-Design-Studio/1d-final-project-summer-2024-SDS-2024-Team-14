import Head from 'next/head';
import Homepage from "./homepage/homepage.jsx";
import "../styles/globals.css"
import axios from "axios";
export default function Home() {
  return (
    <main className="min-w-minContent min-h-screen bg-white">
      <Homepage />
    </main>
  );
}
