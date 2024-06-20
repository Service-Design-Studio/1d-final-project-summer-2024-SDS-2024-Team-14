import ShowBtn from "./id_card/show_more_btn"
import ProfilePic from "./id_card/profile_pic"
import PersonalInfo from "./id_card/personal_info"
import { useState } from "react"
import Image from "next/image"
import axios from "axios";
import { useQRCode } from 'next-qrcode';

export default function IdCard() {
    const { Canvas } = useQRCode();
    const [isOpen, setIsOpen] = useState(false);
    let expandCard = () => {
        setIsOpen(!isOpen);
        // if (isOpen) {
        //     document.getElementById("qr").classList.remove("hide-card");
        //     document.getElementById("qr").classList.add("open-card");
        // } else {
        //     document.getElementById("qr").classList.remove("open-card");
        //     document.getElementById("qr").classList.add("hide-card");
        // }
    }
    return (
        <div className="id-card">
            <div className="block">
                <div className="flex">
                    <ProfilePic />
                    {isOpen ?
                        <PersonalInfo userName={"Abdul Ahmed"} sex={"M"} status={"UNHCR Refugee"} issuedDate={"23 Feb 2024"} expiryDate={"01 Mar 2025"} idNo={"791-00C71659"} country={"Rakhine, Myanmar"} dob={"08 Aug 1965"}/> :
                        <PersonalInfo userName={"Abdul Ahmed"} status={"UNHCR Refugee"} idNo={"***-*****" + "659"} country={"****"} dob={"** *** ****"} issuedDate={"** *** ****"} expiryDate={"** *** ****"} sex={"*"} />}
                </div>
                <ShowBtn isOpen={isOpen} onClick={expandCard} hoverIcon={isOpen ? "/images/close_eye_blue.svg" : "/images/open_eye_blue.svg"} text={(isOpen ? "Hide" : "Show") + " UNHCR Card"} icon={isOpen ? "/images/close_eye.svg" : "/images/open_eye.svg"} />
            </div>
            <div className="min-w-full text-darkblue" style={isOpen ? { visibility: "visible", height: "fit-content" } : { visibility: "hidden", height: "0" }}>
                <span className="btn-text my-4">Scan For Documents</span>
                <div className="mx-auto w-fit">
                    <Canvas
                      text={'https://gebirah-aid-2r6b52gguq-as.a.run.app/users/1'}
                      options={{
                        errorCorrectionLevel: 'M',
                        margin: 3,
                        scale: 4,
                        width: 200,
                        color: {
                          dark: '#000000',
                          light: '#FFFFFF',
                        },
                      }}
                    />
                </div>
            </div>
        </div>)
};