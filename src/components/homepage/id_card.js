import ShowBtn from "./id_card/show_more_btn"
import ProfilePic from "./id_card/profile_pic"
import PersonalInfo from "./id_card/personal_info"
import { useState } from "react"
import { useQRCode } from 'next-qrcode';
import Link from "next/link"




export default function IdCard(props) {
    const { Canvas } = useQRCode();
    const [isOpen, setIsOpen] = useState(false);

    let expandCard = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className="flex lg:items-center flex-col" data-aos='fade-right' data-aos-delay='300'>
                <span className="card lg:mx-auto md:my-4 mb-4 pb-0 shadow-none text-3xl font-medium text-darkblue">ID Card</span>
                <div className="w-11/12 mx-auto md:w-full md:p-[2vw] id-card transition duration-500 ">
                    <div className="flex justify-around">
                        <ProfilePic />
                        <div className="mx-[5vw] lg:mx-0">
                            <div className="flex flex-col pl-[2vw] text-left flex-grow">
                                <div className="text-left pb-[0.5vw]">
                                    <div className="font-bold uppercase text-[4vw] md:text-2xl xl:text-[1.4vw] text-darkblue">{props.data.name}</div>
                                    <div className="text-[3.8vw] md:text-2xl xl:text-[1.4vw] text-darkblue identification_number">{props.data.verification_status == "Approved" ? `000-000-00${props.data.id}`  : "***-*****"}</div>
                                </div>
                                {isOpen ?
                                    <PersonalInfo userName={props.data.name} sex={props.data.gender}
                                        status={props.data.verification_status} issuedDate={"23 Feb 2024"}
                                        expiryDate={"01 Mar 2025"}
                                        country={props.data.country} dob={props.data.date_birth} religion={props.data.religion} ethnicity={props.data.ethnicity}
                                    /> :
                                    <PersonalInfo userName={props.data.name} status={props.data.verification_status}
                                        country={"****"} dob={"** *** ****"}
                                        issuedDate={"** *** ****"} expiryDate={"** *** ****"} sex={"*"} religion={"********"} ethnicity={"*********"} />}
                            </div>
                        </div>
                    </div>
                    {props.data.verification_status == "Approved" ?
                        <ShowBtn isOpen={isOpen} onClick={expandCard} classStyle={"btn-darkblue Show_UNHCR_Card"} hoverIcon={isOpen ? "/images/close_eye_blue.svg" : "/images/open_eye_blue.svg"} text={(isOpen ? "Hide" : "Show") + " UNHCR Card"} icon={isOpen ? "/images/close_eye.svg" : "/images/open_eye.svg"} /> :
                        <ShowBtn classStyle={"btn-disabled id_card_button"} icon={"/images/close_eye_blue.svg"} hoverIcon={"/images/close_eye_blue.svg"} text={"Pending Approval"} />
                    }
                    <div className={`min-w-full text-darkblue overflow-hidden transition-all duration-500 ${isOpen && props.verification_status !== "Approved" ? "mt-5 max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <span className="btn-text my-4">Scan For Documents</span>
                        <Link href={`/info/${props.data.id}`}>
                            <div className={`mx-auto w-fit py-4 ${props.data.verification_status == "Approved" ? "QR_code" : ""}`}>
                                <Canvas
                                    
                                    data-cy={"qrCode"}
                                    text={process.env.NEXT_PUBLIC_FRONTEND + 'info/' + props.data.id}
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
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};