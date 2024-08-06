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
import Loading from "@/components/loading";
import axiosInstance from "@/utils/axiosInstance";

export default function Home({ session }) {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    let userID;
    useAuth();
    useEffect(() => {
        AOS.init({
            once: true,
        });
        const fetchData = async () => {
            setLoading(true);
            userID = localStorage.getItem("userID")
            try {
                await axiosInstance.get(`/users/${userID}`).then((resp) => {
                    setData(resp.data)
                    }
                );
            } catch (error) {
                console.error(error.message);
            }
            finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1500); // 1.5 seconds delay
            }
        }
        fetchData();
    }, [])

    return (
    <div className="overflow-hidden flex flex-col md:h-screen min-h-screen transition-all-500
    bg-[url('/images/background/gebirah-bluebg.png')] bg-cover">
        <NaviBar open={open} setOpen={setOpen}/>
        {!loading && data &&
            <>
                <Homepage setOpen={setOpen} setLoading={setLoading} setData={setData} data={data} userID={userID}/>
                <ChatBot/>
            </>
        }
        {loading && !data && <Loading text={"500: Internal Error\nUnable to fetch user data"}/>}
        {loading && data && <Loading text={"Loading..."} />}
      </div>
    );
}
