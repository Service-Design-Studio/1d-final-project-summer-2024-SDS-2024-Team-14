import React from "react";
import { useRouter } from "next/router";
import "../styles/globals.css"
import UploadFile from '../components/passport_upload/upload.js';
import Image from "next/image";
import EnableId from "../../public/images/enable_id_logo.svg";
import passportDeco from "../../public/images/passport/passport_deco.svg";
import Link from "next/link"
import useAuth from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
import {ReactNotifications} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

export default function Passport() {
    const router = useRouter();
    useAuth();
    return (
        <>
        <ReactNotifications />
        <div className="min-h-screen flex flex-col bg-[url('../../public/images/background/gebirah-bluebg.png')] bg-cover md:px-[12vw] px-[2vw]">
            {/*<NaviBar />*/}
            <div className="md:flex md:items-center pt-4 ml-4">
            <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
            <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
            </div>
            <div className='p-4 text-darkblue'>
                <div className="flex flex-row justify-between">
                    <div className="inline-block">
                        <h1 className='text-darkblue font-semibold sm:text-[3.5vw] md:text-[2.3vw] text-[6.5vw]'>Upload <span className="capitalize">{router.query.category}</span> Passport Image</h1>
                        <p className='md:my-2 text-[4vw] md:text-[1.5vw] mt-4'>Upload your passport image here</p>
                    </div>
                    <div className="w-[8vw] -mt-4 mr-[10vw] md:inline-block hidden">
                        <Image src={passportDeco} alt="Document Decoration"/>
                    </div>
                </div>
                <div className="mb-4 flex flex-col">
                    <UploadFile router={router} className="flex flex-col items-center justify-center" />
                </div>
            </div>
            <ChatBot/>
        </div>
        </>
    )
}