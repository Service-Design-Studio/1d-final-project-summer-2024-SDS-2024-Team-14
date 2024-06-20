import ShowBtn from "./id_card/show_more_btn"
import ProfilePic from "./id_card/profile_pic"
import PersonalInfo from "./id_card/personal_info"
import { useState } from "react"
import Image from "next/image"
import axios from "axios";
import { useQRCode } from 'next-qrcode';

    
 

export default function IdCard(props) {
    const { Canvas } = useQRCode();
    const [isOpen, setIsOpen] = useState(false);

    let expandCard = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="id-card">
            {/* { console.log(props.loading, "\n", props.data)} */}
            <div className="block">
                <div className="flex">
                    <ProfilePic />
                    {isOpen ?
                        <PersonalInfo userName={props.data.name} sex={props.data.gender} status={props.data.verification_status} issuedDate={"23 Feb 2024"} expiryDate={"01 Mar 2025"} idNo={"791-12C6100" + props.data.id} country={props.data.country} dob={props.data.date_birth}/> :
                        <PersonalInfo userName={props.data.name} status={props.data.verification_status} idNo={"***-*****00" + props.data.id} country={"****"} dob={"** *** ****"} issuedDate={"** *** ****"} expiryDate={"** *** ****"} sex={"*"} />}
                </div>
                <ShowBtn isOpen={isOpen} onClick={expandCard} hoverIcon={isOpen ? "/images/close_eye_blue.svg" : "/images/open_eye_blue.svg"} text={(isOpen ? "Hide" : "Show") + " UNHCR Card"} icon={isOpen ? "/images/close_eye.svg" : "/images/open_eye.svg"} />
            </div>
            <div className="min-w-full text-darkblue" style={isOpen ? { visibility: "visible", height: "fit-content" } : { visibility: "hidden", height: "0" }}>
                <span className="btn-text my-4">Scan For Documents</span>
                <div className="mx-auto w-fit">
                    <Canvas
                        //TODO - change to dynamic parameter based on axios call
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