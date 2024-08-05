import React from "react";
import { useRouter } from "next/router";
import "../styles/globals.css"
import UploadScan from '../components/face_scanner/upload_scan.js'
import EnableId from "../../public/images/enable_id_logo.svg";
import passportDeco from "../../public/images/passport/passport_deco.svg";
import Link from "next/link"
import useAuth from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
import Image from "next/image"; // Import the modal component

export default function Passport() {
    const router = useRouter();
    useAuth();
    return (
        <>
        <div className="min-h-screen flex flex-col bg-[url('../../public/images/background/gebirah-bluebg.png')] bg-cover md:px-[12vw] px-[2vw]">
            {/*<NaviBar />*/}
            <div className="md:flex md:items-center pt-4 ml-4">
            <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
            <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
            </div>
            <div className='p-4 text-darkblue'>
                <div className="mb-4 flex flex-col">
                    <UploadScan router={router} className="flex flex-col items-center justify-center" />
                </div>
            </div>
            <ChatBot/> 
        </div>
        </>
    )
}