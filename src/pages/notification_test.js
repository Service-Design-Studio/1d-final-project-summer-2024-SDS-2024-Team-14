import NotificationPage from "../components/notifications/notification_page";
import { useState } from 'react';
import Image from "next/image";
import { Button } from "@mui/material";
export default function NotificationTest() {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    return (
        <div className="w-screen min-h-screen h-full bg-white">
            <div className="flex flex-row w-screen">
                <div className=" w-fit h-screen">
                    <Button onClick={() => setOpen(!open)} className={`sticky top-0 ${open ? `shadow-md` : null}`}>
                        <Image onMouseEnter={ ()=>setHover(true)} onMouseLeave={()=> setHover(false)}
                               src={(open && "/images/filled_bell.svg") || (!open && !hover && "/images/alert_bell.svg")
                                   || (!open && hover && "/images/filled_alert_bell.svg")} width={1} height={1}
                               alt="Open notifications" className="w-5 md:w-[5vw]" />
                    </Button>
                </div>
                <NotificationPage open={open}/>

            </div>

        

        </div>
    )
}