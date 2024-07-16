import Divider from '@mui/material/Divider';
import Header from "../components/scanner/header";
import Notification from "../components/notifications/notification";
import "../styles/globals.css"
export default function NotificationPage(props) {
    return (
        <div className="w-screen min-h-screen h-full bg-white">
            <Header text={"Notifications"} onClick={() => { }} />
            <div className="flex flex-col w-11/12 mx-auto">
                <span className="notif-subheader">Unread Notifications</span>
                <Notification />
                <Divider className='p-2 m-3 ' variant='middle' />
                <span className="notif-subheader">Past Notifications</span>
                <Divider className='p-2 m-3' variant='middle' />
            </div>

        </div>)
}