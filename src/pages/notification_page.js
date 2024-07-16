import Divider from '@mui/material/Divider';
import Header from "../components/scanner/header";
import Notification from "../components/notifications/notification";
import "../styles/globals.css";
import { useState, useEffect } from 'react';
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
        setRecent(recentPlaceholder);
        setPast(pastPlaceholder)
    }, []);



    return (
        <div className="w-screen min-h-screen h-full bg-white">
            <Header text={"Notifications"} onClick={() => { }} />
            <div className="flex flex-col w-11/12 mx-auto">
                <span className="notif-subheader">Recent</span>
                {recent.map((i, index) => {
                    return (<Notification
                        key={index}
                        unread={i.unread}
                        time={i.time}
                        text={i.text}
                        notifStatus={i.notifStatus}
                    />)
                })}
                <Divider className='p-2 m-3 ' variant='middle' />
                <span className="notif-subheader">Past Notifications</span>
                {past.map((i, index) => {
                    return (<Notification
                        key={index}
                        unread={i.unread}
                        time={i.time}
                        text={i.text}
                        notifStatus={i.notifStatus}
                    />)
                })}
                <Divider className='p-2 m-3' variant='middle' />
            </div>

        </div>)
}