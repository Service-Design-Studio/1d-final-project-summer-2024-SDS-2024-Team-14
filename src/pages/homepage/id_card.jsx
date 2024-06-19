import ShowBtn from "./id_card/show_more_btn"
import ProfilePic from "./id_card/profile_pic"
import PersonalInfo from "./id_card/personal_info"
import { useState } from "react"
import Image from "next/image"

export default function IdCard() {
    const [isOpen, setIsOpen] = useState(false);
    let onClick = () => {
        setIsOpen(!isOpen);
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
                <ShowBtn isOpen={isOpen} onClick={onClick} hoverIcon={isOpen ? "/images/close_eye_blue.svg" : "/images/open_eye_blue.svg"} text={(isOpen ? "Hide" : "Show") + " UNHCR Card"} icon={isOpen ? "/images/close_eye.svg" : "/images/open_eye.svg"} />
            </div>
            <div className="min-w-full text-darkblue" style={isOpen ? { visibility: "visible", height: "fit-content" } : { visibility: "hidden", height: "0" }}>
                <span className="btn-text my-4">Scan For Documents</span>
                <Image className="mx-auto" id="qr" src="/images/placeholder_qr.png" width={200} height={200} alt="QR code" />
            </div>
        </div>)
};