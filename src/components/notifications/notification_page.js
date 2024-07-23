import Divider from '@mui/material/Divider';
import Header from "../scanner/header";
import Notification from "./notification";
import "../../styles/globals.css";
import { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import Image from 'next/image';
export default function NotificationPage({ open }) {
    const [recent, setRecent] = useState([]);
    const [past, setPast] = useState([]);
    const [loading, setLoading] = useState(false);
    // const recentPlaceholder = [
    //     {
    //         unread: true,
    //         time: "15m",
    //         notifStatus: "Document Upload Success",
    //         text: placeholderStr,
    //     },
    //     {
    //         unread: true,
    //         time: "3d",
    //         notifStatus: "Verification Success",
    //         text: placeholderStr,
    //     },
    //     {
    //         unread: false,
    //         time: "2w",
    //         notifStatus: "Notice",
    //         text: placeholderStr,
    //     }
    // ];
    // const pastPlaceholder = [
    //     {
    //         unread: false,
    //         time: "4w",
    //         notifStatus: "Document Upload Failed",
    //         text: placeholderStr,
    //     },
    //     {
    //         unread: false,
    //         time: "5w",
    //         notifStatus: "Verification Failed",
    //         text: placeholderStr,
    //     },
    //     {
    //         unread: false,
    //         time: "6w",
    //         notifStatus: "Notice",
    //         text: placeholderStr,
    //     },
    //     {
    //         unread: false,
    //         time: "5w",
    //         notifStatus: "Verification Pending",
    //         text: placeholderStr,
    //     },
    // ];
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let userID = localStorage.getItem("userID")
            try {
                await axiosInstance.get(`/notifications/${userID}`).then((resp) => {
                    let res = resp.data;
                    res.forEach(element => {
                        if (element.read) {
                            setPast((prev) => {
                                return [...prev, element]
                            })
                        } else {
                            setRecent((prev) => {
                                return [...prev, element]
                            })
                        }
                    });
                }
                );
            } catch (error) {
                console.error(error.message);
            } finally {
                setPast((prev) => {
                    prev.sort((i1, i2) => {
                        return new Date(i2.created_at) - new Date(i1.created_at);
                    })
                    return prev
                })
                setRecent((prev) => {
                    prev.sort((i1, i2) => {
                        return new Date(i2.created_at) - new Date(i1.created_at);
                    })
                    return prev
                })
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let userID = localStorage.getItem("userID")
        if (open && userID) {
            setTimeout(async () => {
                if (open && userID) {
                    let idArr = [];
                    recent.forEach(element => {
                        idArr.push(element.id)
                    });
                    let formData = new FormData();
                    formData.append("user_id", userID);
                    idArr.forEach(element => formData.append('id[]', element))
                    await axiosInstance.post(`notifications/read/`,
                        formData
                    )
                }
            }, 150);
        }
    }, [open])

    return (
        <div className={`${open ? `w-screen shadow-md` : `w-0 hidden`} min-h-screen h-full bg-white transition-all-500`}>
            <div 
            className="flex flex-row items-center w-11/12 lg:w-11/12 h-fit mb-3 pt-4 text-darkblue text-3xl sm:text-4xl font-semibold mx-auto sticky top-0 bg-white shadow-white shadow-lg">
                <span>Notifications</span>
            </div>

            <div className="flex flex-col w-11/12 mx-auto">
                <span className="notif-subheader">Recent</span>
                {recent.length > 0 ? recent.map((i, index) => {
                    return (<Notification
                        key={i.id}
                        unread={!i.read}
                        time={i.created_at}
                        text={i.content}
                        notifStatus={i.category}
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
                        key={i.id}
                        unread={!i.read}
                        time={i.created_at}
                        text={i.content}
                        notifStatus={i.category}
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