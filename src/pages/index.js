// src/pages/index.js
import { useEffect, useState } from 'react';
import Homepage from "../components/homepage/homepage.js";
import "../styles/globals.css";
import "../hooks/useAuth";
import useAuth from "@/hooks/useAuth";
import NaviBar from "../components/NaviBar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ChatBot from "@/components/ChatBot";
import homePageContent from '../components/modalContent/homepage'; // Import homePageContent

export default function Home({ session }) {
    useAuth();
    useEffect(() => {
        AOS.init({
            once: true,
        });
    }, []);
    const [open, setOpen] = useState(false);
    return (
        <main className="overflow-hidden flex flex-col align-middle min-h-screen transition-all-500 bg-[url('/images/background/gebirah-bluebg.png')] bg-cover">
            <NaviBar open={open} setOpen={setOpen} />
            <Homepage setOpen={setOpen} />
            <ChatBot />
        </main>
    );
}
