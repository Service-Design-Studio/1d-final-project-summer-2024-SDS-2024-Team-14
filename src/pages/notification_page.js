import Divider from '@mui/material/Divider';
import Header from "../components/scanner/header";
import Notification from "../components/notifications/notification";
import "../styles/globals.css";
import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function NotificationPage(props) {
    const [recent, setRecent] = useState([]);
    const [past, setPast] = useState([]);
    const placeholderStr = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classica";
    const recentPlaceholder = [
        {
            unread: true,
            time: "15m",
            notifStatus: "Document Upload Success",
            text: placeholderStr,
        },
        {
            unread: true,
            time: "3d",
            notifStatus: "Verification Success",
            text: placeholderStr,
        },
        {
            unread: false,
            time: "2w",
            notifStatus: "Notice",
            text: placeholderStr,
        }
    ];
    const pastPlaceholder = [
        {
            unread: false,
            time: "4w",
            notifStatus: "Document Upload Failed",
            text: placeholderStr,
        },
        {
            unread: false,
            time: "5w",
            notifStatus: "Verification Failed",
            text: placeholderStr,
        },
        {
            unread: false,
            time: "6w",
            notifStatus: "Notice",
            text: placeholderStr,
        },
        {
            unread: false,
            time: "5w",
            notifStatus: "Verification Pending",
            text: placeholderStr,
        },
    ];
    useEffect(() => {
        // setRecent([]);
        setRecent(recentPlaceholder);
        setPast([]);
        // setPast(pastPlaceholder);
    }, []);



    return (
        <div className="w-screen min-h-screen h-full bg-white">
            <Header text={"Notifications"} onClick={() => { }} />
            <div className="flex flex-col w-11/12 mx-auto">
                <span className="notif-subheader">Recent</span>
                {recent.length > 0 ? recent.map((i, index) => {
                    return (<Notification
                        key={index}
                        unread={i.unread}
                        time={i.time}
                        text={i.text}
                        notifStatus={i.notifStatus}
                    />)
                }) :
                    <div className='flex flex-col w-full mx-auto items-center'>
                        <Image src={"/images/empty_notifications.svg"} className="w-[30vw] md:w-fit h-auto" width={1} height={1} alt='No recent notification' />
                        <span className='text-darkblue text-[1em] md:text-2xl font-semibold mt-3'>No new notifications</span>
                    </div>
                }
                <Divider className='p-2 m-3 ' variant='middle' />
                <span className="notif-subheader">Past Notifications</span>
                {past.length > 0 ? past.map((i, index) => {
                    return (<Notification
                        key={index}
                        unread={i.unread}
                        time={i.time}
                        text={i.text}
                        notifStatus={i.notifStatus}
                    />)
                }) :
                    <div className='flex flex-col w-full mx-auto items-center'>
                        <Image src={"/images/empty_past_notifications.svg"} className="w-[30vw] md:w-fit h-auto" width={1} height={1} alt='No recent notification' />
                        <span className='text-darkblue text-[1em] md:text-2xl font-semibold mt-3'>No past notifications</span>
                    </div>}
                <Divider className='p-2 m-3' variant='middle' />
            </div>

        </div>)
}