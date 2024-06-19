import ShowBtn from "./id_card/show_more_btn"
import ProfilePic from "./id_card/profile_pic"
import PersonalInfo from "./id_card/personal_info"
import { useState } from "react"
import Image from "next/image"


export default function IdCard() {
    const [isOpen, setIsOpen] = useState(false);
    let onClick = () => {
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
        <div className="id-card transition-all-500">
            <div className="block">
                <div className="flex">
                    <ProfilePic />
                    <PersonalInfo />
                </div>
                <ShowBtn isOpen={isOpen} onClick={onClick} />
            </div>
            <div>
                <Image style={isOpen ? { visibility: "visible", height: "100%" } : {visibility: "hidden", height: "0"} } id="qr" src="/images/placeholder_qr.png" width={300} height={300} alt="QR code" />
            </div>
        </div>)
};