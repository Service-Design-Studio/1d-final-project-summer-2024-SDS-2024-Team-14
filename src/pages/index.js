import {useEffect} from 'react';
import Homepage from "../components/homepage/homepage.js";
import "../styles/globals.css";
import "../hooks/useAuth"
import useAuth from "@/hooks/useAuth";
import NaviBar from "../components/NaviBar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ChatBot from "@/components/ChatBot";

export default function Home({ session }) {
    useAuth();
    useEffect(() => {
        AOS.init({
            once: true,
        });
      }, [])
  return (
    <main className="overflow-hidden flex flex-col align-middle min-h-screen bg-white transition-all-500 bg-local
    bg-[url('../../public/images/background/gebirah-bluebg.png')] bg-cover">
        <NaviBar/>
      <Homepage />
        <ChatBot/>
      </main>
  );
}