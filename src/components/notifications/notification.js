import Image from "next/image"
export default function Notification({ notifStatus, text, time, unread}) {
    const icon = {
        "upload success": "/images/upload_success.svg",
        "upload fail": "/images/upload_fail.svg",
        "approval success": "/images/verified_tick.svg",
        "verification failed": "/images/verified_fail.svg",
        "approval pending": "/images/verified_pending.svg",
        "notice": "/images/default_mail.svg",
        "create account": "/images/smiley_darkblue.svg",
    };
    return (
        <div className={`w-full h-1/12 rounded-lg flex flex-row p-3 my-2  ${unread ? `bg-blue-50 hover:bg-blue-100` : `bg-none hover:bg-lightergray`} transition-all-500 items-center`}>
            <Image src={icon[notifStatus] || icon["Notice"]} className="md:w-[5vw] xsm:w-14 w-8 max-w-20 align-middle" width={1} height={1} alt={"Notification row icon"}></Image>
            <div className="ml-4 flex-1"><span className=" line-clamp-3  text-[1em] sm:text-[1.3em] md:text-2xl overflow-ellipsis "><p className="font-semibold capitalize">{notifStatus}</p> {text}</span></div>
            <span className="text-darkblue self-end">{time}</span>
            
        </div>
    )
}