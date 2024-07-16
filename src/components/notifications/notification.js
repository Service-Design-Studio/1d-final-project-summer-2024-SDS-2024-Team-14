import Image from "next/image"
export default function Notification({ notifStatus, text}) {
    const icon = {
        "Approved": "/images/tick_icon.svg",
        "Pending": "/images/exclamation_icon.svg",
        "Rejected": "/images/cross.svg",
        "Default": "",
    };
    return (
        <div className="w-full h-1/12 bg-gray flex flex-row">
            <Image src={icon[notifStatus || "Default"]} className="md:w-[5vw] w-10" width={1} height={1} alt={"Notification row icon"}></Image>
            <p>{text}</p>
        </div>
    )
}