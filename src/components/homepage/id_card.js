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
            <div className="flex items-center flex-col" data-aos='fade-right' data-aos-delay='300'>
                <span className="card mx-auto md:my-4 mb-4 pb-0 shadow-none text-3xl font-medium text-darkblue">ID Card</span>
                <div className="id-card transition duration-500 ">
                    {/* {console.log(props.loading, "\n", props.data)} */}
                    <div className="block">
                        <div className="flex">
                            <ProfilePic />
                            {isOpen ?
                                <PersonalInfo userName={props.data.name} sex={props.data.gender}
                                    status={props.data.verification_status} issuedDate={"23 Feb 2024"}
                                    expiryDate={"01 Mar 2025"} idNo={"791-12C6100" + props.data.id}
                                    country={props.data.country} dob={props.data.date_birth} /> :
                                <PersonalInfo userName={props.data.name} status={props.data.verification_status}
                                    idNo={"***-*****00" + props.data.id} country={"****"} dob={"** *** ****"}
                                    issuedDate={"** *** ****"} expiryDate={"** *** ****"} sex={"*"} />}
                        </div>
                        {props.data.verification_status == "Approved" ?
                            <ShowBtn isOpen={isOpen} onClick={expandCard} classStyle={"btn-darkblue"} hoverIcon={isOpen ? "/images/close_eye_blue.svg" : "/images/open_eye_blue.svg"} text={(isOpen ? "Hide" : "Show") + " UNHCR Card"} icon={isOpen ? "/images/close_eye.svg" : "/images/open_eye.svg"} /> :
                            <ShowBtn classStyle={"btn-disabled"} icon={"/images/close_eye_blue.svg"} hoverIcon={"/images/close_eye_blue.svg"} text={"Pending Approval"} />
                        }
                    </div>
                    <div className={`min-w-full text-darkblue overflow-hidden transition-all duration-500 ${
            isOpen && props.verification_status !== "Approved" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <span className="btn-text my-4">Scan For Documents</span>
                        <Link href={`/info/${props.data.id}`}>
                            <div className="mx-auto w-fit py-4">
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