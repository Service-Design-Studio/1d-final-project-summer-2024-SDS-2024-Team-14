import Divider from '@mui/material/Divider';
import Header from "../scanner/header";
import Notification from "./notification";
import "../../styles/globals.css";
import { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import Image from 'next/image';
import { Button } from '@mui/material';
export default function NotificationPage({ open, setOpen }) {
    const [recent, setRecent] = useState([]);
    const [past, setPast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [readAll, setReadAll] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let userID = localStorage.getItem("userID")
            try {
                await axiosInstance.get(`/notifications/${userID}`).then((resp) => {
                    let res = resp.data;
                    const currentDate = new Date();
                    res.forEach(element => {
                        if (currentDate - new Date(element.created_at) > 1000 * 60 * 60 * 24) {
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
        if (open && userID && !readAll) {
            setTimeout(async () => {
                if (open && userID && !readAll) {
                    let idArr = [];
                    recent.forEach(element => {
                        idArr.push(element.id)
                    });
                    let formData = new FormData();
                    formData.append("user_id", userID);
                    idArr.forEach(element => formData.append('id[]', element))
                    await axiosInstance.post(`notifications/read/`,
                        formData
                    ).then(()=> setReadAll(true))
                }
            }, 150);
        }
    }, [open])

    return (
        <div className={`${open ? `w-screen md:w-fit lg:w-4/12 xl:3/12 shadow-md` : `w-0 hidden`} min-h-fit max-h-screen fixed overflow-y-scroll overflow-x-clip bg-white transition-all-500 z-40 right-0 top-20 pointer-events-auto`}>
            <div 
            className="flex flex-row items-center w-11/12 lg:w-11/12 h-fit mb-3 pt-4 text-darkblue text-3xl sm:text-4xl font-semibold mx-auto sticky top-0 bg-white shadow-white shadow-lg">
                <span className='flex-1'>Notifications</span>
                <Button onClick={()=>setOpen(false)} className=' w-fit'><Image src={ "/images/cross_icon.svg"} width={1} height={1} className='h-10 w-auto' alt="close notifications"></Image></Button>
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