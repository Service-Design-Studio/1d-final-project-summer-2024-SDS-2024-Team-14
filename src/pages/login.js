import "../styles/globals.css"
import { useState } from 'react';
import Image from 'next/image';
import LoginCarousel from '@/components/loginpage/login_carousel';
import Textbox from '../components/loginpage/textbox'
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
    const [formState, setFormState] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        rememberPassword: true,
        firstName: null,
        lastName: null,
    });
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        const password = document.getElementById("password").value;
        setEmailError(!document.getElementById("email").value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/));
        setPasswordError(!password);
        if (!onLoginTab){
        const confirmPassword = document.getElementById("confirmPassword").value;
        setConfirmError(!(confirmPassword && confirmPassword === password));
        setFirstNameError(!document.getElementById("firstName").value);
        setLastNameError(!document.getElementById("lastName").value);}
    }
    return (
        <Box component="form" autoComplete="on" noValidate="false" className="flex flex-col w-screen min-h-screen items-center bg-darkblue px-3 pb-10">
            <div className="flex flex-row items-center pt-6 my-0">
                <Image src="/images/enable_id_logo.svg" width={40} height={0} className="md:w-20" alt="EnableID Logo" />
                <span className="text-white text-4xl md:text-5xl px-3">EnableID</span>
            </div>
            <div className='flex flex-col mt-10 w-full md:w-1/2 transition-all-500'>
                <LoginCarousel onLoginTab={onLoginTab} setOnLoginTab={setOnLoginTab} />
                <div className='flex flex-col text-center bg-white rounded-b-xl pt-5'>
                    {onLoginTab ? null : <div className="">
                        <Textbox
                            error={firstNameError}
                            setFormState={setFormState}
                            id={"firstName"}
                            label={"First Name"}
                            placeholder={"First Name"}
                        />
                        <Textbox
                            error={lastNameError}
                            setFormState={setFormState}
                            id={"lastName"}
                            label={"Last Name"}
                            placeholder={"Last Name"}
                        />
                    </div>}
                    <Textbox
                        setFormState={setFormState}
                        id={"email"}
                        required={true}
                        type={"email"}
                        startIcon={<EmailIcon />}
                        label={"Email Address"}
                        placeholder={"Email Address"}
                        error={emailError || null}
                    />
                    <Textbox
                        setFormState={setFormState}
                        error={passwordError}
                        id={"password"}
                        required={true}
                        type={passwordVisible ? "text" : "password"}
                        startIcon={<VpnKeyIcon />}
                        endIcon={passwordVisible ? <VisibilityIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} /> : <VisibilityOffIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />}
                        label={"Password"}
                        placeholder={"Password"}
                    />
                    {onLoginTab ? <div onClick={() => { setRememberPassword(!rememberPassword); setFormState(prevState => ({ ...prevState, rememberPassword: !document.getElementById("rememberPassword").checked })) }} className="px-6 mt-3 self-start cursor-pointer"><Checkbox id="rememberPassword" className="my-auto" label="Remember Password" variant="outlined" checked={rememberPassword} /><span className="align-middle my-auto">Remember Password</span></div> : <Textbox
                        setFormState={setFormState}
                        error={ confirmError}
                        id={"confirmPassword"}
                        type={passwordVisible ? "text" : "password"}
                        startIcon={<VpnKeyIcon />}
                        endIcon={passwordVisible ? <VisibilityIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} /> : <VisibilityOffIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />}
                        label={"Confirm Password"}
                        placeholder={"Confirm Password"}
                    />}
                    <Button onClick={(e) => handleSubmit(e)} id="submitBtn" variant="contained" className="mx-5 py-3 my-5 text-xl">{onLoginTab ? "Login" : "Create Account"}</Button>
                </div>
            </div>
        </Box>
    );
}