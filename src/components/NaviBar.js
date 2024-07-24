import Link from "next/link";
import EnableId from "../../public/images/enable_id_logo.svg"
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import documentIcon from "../../public/images/folder_darkblue.svg"
import familyIcon from "../../public/images/family.svg"
import resourceIcon from "../../public/images/map.svg"
import notificationIcon from "../../public/images/filled_bell.svg"
import alertNotificationIcon from "../../public/images/unfilled_alert_bell.svg"
import unfilledNotificationIcon from "../../public/images/unfilled_bell.svg"
import { Button } from '@mui/material'
import NotificationPage from "./notifications/notification_page";
export default function NaviBar({ open, setOpen }) {
    const [navState, setNavState] = useState(false)
    const [unread, setUnread] = useState(false)
    const popupRef = useRef(null);
    const notifRef = useRef(null)
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setNavState(false);
        }
        if (notifRef.current && !notifRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (navState) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navState]);
    useEffect(() => {
        if (open) {
            window.addEventListener('mousedown', handleClickOutside)
        } else {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])
    return (
        <div className="flex justify-between items-center mt-2">
            {/*Logo for desktop*/}
            <div className="md:flex md:items-center md:ml-6 ml-4 hidden">
                <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
                <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
            </div>
            {/* Add the hamburger for phone*/}
            {!navState ? (
                <button
                    className="flex mr-2 cursor-pointer py-3 px-3 z-30 xl:scale-[1.5] md:hidden"
                    onClick={() => setNavState(!navState)}>
                    <svg
                        className="w-8 h-8 text-darkblue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8h16M4 16h16"
                        ></path>
                    </svg>
                </button>
            ) : (
                <div className="py-7">
                </div>
            )}
            <div ref={popupRef} className={`transition duration-500 pt-6 fixed top-0 left-0 bg-white z-20 h-screen ${navState ? "translate-x-0" : "-translate-x-full"}`}>
                {/*Logo */}
                <div className="flex items-center ml-4">
                    <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
                    <span className="font-bold text-[5vw] text-[#405DB5]">Enable ID</span>
                </div>
                {/*Divider*/}
                <hr className="border-t-2 border-[#B0B0B0]/50 w-10/12 my-4 mx-auto" />
                {/*Links */}
                <ul className="text-black pl-4 pr-16">
                    {[
                        // ['Home', '/', ""],
                        ['Documents Manager', '/documents', documentIcon],
                        ['Family', '/family-tree', familyIcon],
                        // ['Community', '', ""],
                        ['Resources', '/resources', resourceIcon],
                    ].map(([title, url, img]) => (
                        // eslint-disable-next-line react/jsx-key
                        <>
                            <div className="py-4 flex items-center">
                                <div className="w-[8vw] inline-block">
                                    <Image src={img} layout="responsive" alt={`navigation ${title} icon`} />
                                </div>
                                <li className='inline-block ml-3 items-center'>
                                    <Link href={url} onClick={() => {
                                        setNavState(!navState)
                                    }} smooth={true} className="md:text-[2vw] text-[4vw] font-semibold text-darkblue">{title}</Link>
                                </li>
                            </div>
                        </>
                    )
                    )}
                    <div className="py-4 flex items-center">
                        <div className="w-[8vw] inline-block">
                            <Image className={`max-w-[5vw] mx-auto ${unread ? `animate-pulse`: ``}`} src={(open && notificationIcon) || (!open && unread && alertNotificationIcon) || (!open && !unread && notificationIcon)} layout="responsive" alt="navigation icon" />
                        </div>
                        <li className='inline-block ml-3 items-center'>
                            <Link onClick={() => {
                                setOpen(!open)
                                setNavState(!navState)
                            }} smooth={true} href={""} className="md:text-[2vw] text-[4vw] font-semibold text-darkblue">Navigation</Link>
                        </li>
                    </div>
                </ul>
            </div>
            {/* Full navi bar for desktop*/}
            <div className="flex lg:space-x-12 space-x-6 lg:mr-10 mr-6 hidden md:inline-block">
                {[
                    ['Home', '/', ""],
                    ['Documents', '/documents'],
                    ['Family', '/family-tree'],
                    ['Resources', '/resources'],
                ].map(([title, url]) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={url} className="py-4 font-bold text-darkblue">{title}</Link>
                ))}
                <a href={"https://www.gebirah.org/"} target="_blank" className="py-4 font-bold text-darkblue"> Community </a>
                <Button onClick={() => setOpen(!open)} className={` ${open ? `shadow-md bg-white hover:bg-white` : `hover:bg-white hover:bg-opacity-25`}`}>
                    <Image
                        src={(open && notificationIcon) || (!open && unread && alertNotificationIcon) || (!open && !unread && unfilledNotificationIcon)} width={1} height={1}
                        alt="Open notifications" className={`w-5 ${unread ? `animate-pulse` : ``}`} />
                </Button>
            </div>
            <NotificationPage ref={notifRef} open={open} setOpen={setOpen} unread={unread} setUnread={setUnread}/>
        </div>
    )
}