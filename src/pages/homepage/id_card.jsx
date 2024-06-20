import ShowBtn from "./id_card/show_more_btn"
import ProfilePic from "./id_card/profile_pic"
import PersonalInfo from "./id_card/personal_info"
import { useState } from "react"
import Image from "next/image"
import axios from "axios";


export default function IdCard() {
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
        axios.get("https://gebirah-backend-2r6b52gguq-as.a.run.app/users")
            .then(response => {
                console.log(response.data)
        })
    }
    return (
        <div className="id-card">
            <div className="block">
                <div className="flex">
                    <ProfilePic />
                    <PersonalInfo />
                </div>
                <ShowBtn isOpen={isOpen} onClick={expandCard} />
            </div>
            <div className="min-w-full text-darkblue" style={isOpen ? { visibility: "visible", height: "fit-content" } : { visibility: "hidden", height: "0" }}>
                <span className="btn-text my-4">Scan For Documents</span>
                <Image className="mx-auto" id="qr" src="/images/placeholder_qr.png" width={300} height={300} alt="QR code" />
            </div>
        </div>)
};