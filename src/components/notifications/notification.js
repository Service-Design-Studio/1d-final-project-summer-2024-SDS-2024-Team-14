import Image from "next/image"
export default function Notification({ notifStatus, text, time, unread}) {
    const icon = {
        "Upload Success": "/images/upload_success.svg",
        "Upload Fail": "/images/upload_fail.svg",
        "Approval Success": "/images/verified_tick.svg",
        "Verification Failed": "/images/verified_fail.svg",
        "Approval Pending": "/images/verified_pending.svg",
        "Notice": "/images/default_mail.svg",
        "Create Account": "/images/smiley_darkblue.svg",
    };

    const secMS = 1000;
    const minMS = secMS * 60;
    const hourMS = minMS * 60;
    const dayMS = hourMS * 24;
    const weekMS = dayMS * 7;
    const monthMS = dayMS * 30;
    function timeSince(date) {
        const currentDate = new Date();
        let years = currentDate.getFullYear - date.getFullYear;
        if (years > 0) return `${years}Y`;
        let months = currentDate.getMonth - date.getMonth;
        if (months > 0) return `${months}M`;
        let days = currentDate.getMonth - date.getMonth;
        if (days > 0) return `${days}d`;
        let ms = currentDate - date;
        let second = 1000;
        let minute = 60 * second;
        let hour = 60 * minute;
        if (ms < second) {
            return "now"
        } else if (ms < minute) {
            return `${Math.round(ms / second)}s`
        } else if (ms < hour) {
            return `${Math.round(ms / minute)}m`
        } else if (ms < 24 * hour) {
            return `${Math.round(ms / hour)}h`
        }
        // return Math.round((new Date() - new Date(time)) / (1000 * 60 * 60 * 24))
    }

    return (
        <div className={`w-full h-1/12 rounded-lg flex flex-row p-3 my-2  ${unread ? `bg-blue-50 hover:bg-blue-100` : `bg-none hover:bg-lightergray`} transition-all-500 items-center`}>
            <Image src={icon[notifStatus] || icon["Notice"]} className="md:w-[5vw] md:min-w-15 xsm:w-5 w-5 max-w-10 align-middle" width={1} height={1} alt={"Notification row icon"}></Image>
            <div className="ml-4 flex-1"><span className=" line-clamp-3  text-[1em] sm:text-[1.3em] md:text-2xl overflow-ellipsis "><p className="font-semibold capitalize">{notifStatus}</p> {text}</span></div>
            <span className="text-darkblue self-end">{timeSince(new Date(time))}</span>
            
        </div>
    )
}