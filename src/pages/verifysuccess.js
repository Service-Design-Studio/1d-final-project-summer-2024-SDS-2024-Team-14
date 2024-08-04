{/*import React from "react";
import { useRouter } from "next/router";
import "../styles/globals.css"
import TickIcon from "../../public/images/icons/tick_success.svg"
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

            <div className="md:flex md:items-center pt-4 ml-4">
            <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
            <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
            </div>
            <div className='p-4 text-darkblue'>
                <div className="flex flex-row justify-between">
                    <div className="inline-block">
                        <h1 className='text-darkblue font-semibold sm:text-[3.5vw] md:text-[2.3vw] text-[6.5vw]'>Successfully Verified Face Scan</h1>
                        <div className="flex flex-row items-start">
                            <Image src={TickIcon} className="w-[10vw] md:w-[5vw] lg:w-[4vw] xl:w-[3vw] ml-4 md:my-10" alt="EnableID Logo" />
                            <div className="flex flex-col pl-5">
                                <p className='pt-9 text-[4vw] md:text-[1.5vw] my-2'>Your passport photo has been successfully verified with your face scan.</p>
                                <p className='text-[4vw] md:text-[1.5vw]'>Welcome to Enable ID. Please click ‘proceed’ to enter the home page.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-5">
                    <button
                        onClick={() => router.push('../../')}
                        className={`text-2mdd px-5 py-2 border-radius-19px rounded-md bg-[#4378DB] text-white`}
                    >
                        Proceed
                    </button>
                </div>
            </div>
            <ChatBot/> 
        </div>
        </>
    )
}
*/}