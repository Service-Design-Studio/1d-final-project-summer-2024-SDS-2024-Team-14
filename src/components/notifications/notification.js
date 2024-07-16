import Image from "next/image"
export default function Notification({ notifStatus, text, time, unread}) {
    const icon = {
        "Document Upload Success": "/images/upload_success.svg",
        "Document Upload Failed": "/images/upload_fail.svg",
        "Verification Success": "/images/verified_tick.svg",
        "Verification Failed": "/images/verified_fail.svg",
        "Verification Pending": "/images/verified_pending.svg",
        "Notice": "/images/default_mail.svg",
    };
    return (
        <div className={`w-full h-1/12 rounded-lg flex flex-row p-3 my-2  ${unread ? `bg-blue-50` : `bg-none hover:bg-lightergray`} transition-all-500 items-center`}>
            <Image src={icon[notifStatus] || icon["Notice"]} className="md:w-[5vw] xsm:w-14 w-8 max-w-20 align-middle" width={1} height={1} alt={"Notification row icon"}></Image>
            <div className="ml-4 flex-1"><span className=" line-clamp-3  text-[1em] sm:text-[1.3em] md:text-2xl overflow-ellipsis "><p className="font-semibold">{notifStatus}</p> {text}</span></div>
            <span className="text-darkblue self-end">{time}</span>
            
        </div>
    )
}