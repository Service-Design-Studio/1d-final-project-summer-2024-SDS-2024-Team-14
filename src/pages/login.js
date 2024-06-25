import "../styles/globals.css"
import { useState } from 'react';
import Image from 'next/image';
import LoginCarousel from '@/components/login_carousel';
import Textbox from '../components/textbox'
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button'
import { Checkbox } from "@mui/material";
export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [onLoginTab, setOnLoginTab] = useState(true);
    const [rememberPassword, setRememberPassword] = useState(true);
    return (
        <Box component="form" autoComplete="on" noValidate="false" className="flex flex-col w-screen h-screen items-center bg-darkblue px-3">
            <div className="flex flex-row items-center pt-6 my-0">
                <Image src="/images/enable_id_logo.svg" width={40} height={0} alt="EnableID Logo" />
                <span className="text-white text-4xl px-3">EnableID</span>
            </div>
            <div className='flex flex-col mt-10 w-full md:w-1/2 transition-all-500'>
                <LoginCarousel onLoginTab={onLoginTab} setOnLoginTab={setOnLoginTab} />
                <div className='flex flex-col text-center bg-white rounded-b-xl pt-5'>
                    {onLoginTab ? null : <div className="">
                        <Textbox
                            label={"First Name"}
                            placeholder={"First Name"}
                        />
                        <Textbox
                            label={"Last Name"}
                            placeholder={"Last Name"}
                        />
                    </div>}
                    <Textbox
                        startIcon={<EmailIcon />}
                        label={"Email Address"}
                        placeholder={"Email Address"}
                    />
                    <Textbox
                        type={passwordVisible ? "text" : "password"}
                        startIcon={<VpnKeyIcon />}
                        endIcon={passwordVisible ? <VisibilityIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} /> : <VisibilityOffIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />}
                        label={"Password"}
                        placeholder={"Password"}
                    />
                    {onLoginTab ? <div onClick={() => setRememberPassword(!rememberPassword)} className="px-6 mt-3 self-start cursor-pointer"><Checkbox className="my-auto" label="Remember Password" variant="outlined" checked={rememberPassword} /><span className="align-middle my-auto">Remember Password</span></div> : <Textbox
                        type={passwordVisible ? "text" : "password"}
                        startIcon={<VpnKeyIcon />}
                        endIcon={passwordVisible ? <VisibilityIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} /> : <VisibilityOffIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />}
                        label={"Confirm Password"}
                        placeholder={"Confirm Password"}
                    />}
                    <Button variant="contained" className="mx-5 py-3 my-5 text-xl">{onLoginTab ? "Login" : "Create Account"}</Button>
                </div>
            </div>
        </Box>
    );
}