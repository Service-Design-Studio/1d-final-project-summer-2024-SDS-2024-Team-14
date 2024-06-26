import "../styles/globals.css"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import LoginCarousel from '../components/loginpage/login_carousel';
import Textbox from '../components/loginpage/textbox'
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button'
import { InputLabel, MenuItem, Select, FormControl, Checkbox } from '@mui/material'
import { getSession, SessionProvider, signIn } from "next-auth/react";
import axios from "axios";
import { redirect } from 'next/navigation'
import DropdownItem from "../components/loginpage/dropdown_item";

// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//     if (session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };
//     }
//     return {
//         props: {
//             session,
//         },
//     };
// }

export default function Login({ session }) {
    const router = useRouter();
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
    const [errorState, setErrorState] = useState(true);

    function checkErrors() {
        return new Promise((resolve, reject) => {
            const password = document.getElementById("password").value;
            setEmailError((formState.email ? false : true) || !formState.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/));
            setPasswordError(formState.password ? false : true);
            if (!onLoginTab) {
                setConfirmError(!(confirmPassword && confirmPassword === password));
                setFirstNameError(!document.getElementById("firstName").value);
                setLastNameError(!document.getElementById("lastName").value);
                setErrorState(emailError || passwordError || confirmError || firstNameError || lastNameError);
            } else {
                setErrorState(emailError || passwordError);
            }
            return errorState;
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await checkErrors().then((state) => {
            if (onLoginTab && !state) {
                router.push('/',);
            }
        })
        return;
    }
    return (
        <Box onSubmit={(e) => handleSubmit(e)} component="form" autoComplete="on" noValidate className={`flex flex-col w-screen min-h-screen items-center bg-darkblue bg-no-repeat bg-center bg-cover px-3 pb-10`}>
            <div className="flex flex-row items-center pt-6 my-0">
                <Image src="/images/enable_id_logo.svg" width={40} height={0} className="md:w-20" alt="EnableID Logo" />
                <span className="text-white text-4xl md:text-5xl px-3">EnableID</span>
            </div>
            <div className='flex flex-col mt-6 w-full md:w-1/2 transition-all-50'>
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
                        error={confirmError}
                        id={"confirmPassword"}
                        type={passwordVisible ? "text" : "password"}
                        startIcon={<VpnKeyIcon />}
                        endIcon={passwordVisible ? <VisibilityIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} /> : <VisibilityOffIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />}
                        label={"Confirm Password"}
                        placeholder={"Confirm Password"}
                    />}
                    <Button type="submit" id="submitBtn" variant="contained" className="mx-5 py-3 my-5 text-xl">{onLoginTab ? "Login" : "Create Account"}</Button>
                    {onLoginTab ? <a href="#" className="underline text-darkblue">Forgot Password</a> : null}
                    <FormControl className="w-fit h-fit my-5 mx-auto text-default text-normal"><InputLabel id="language">Language</InputLabel>
                        <Select labelId="language" label="Language" defaultValue={"English"} className="flex w-40 h-10 flex-row">
                            <MenuItem value={"English"}><DropdownItem span={"English"} src={"/images/english.svg"} /></MenuItem>
                            <MenuItem value={"Burmese"}><DropdownItem span={"မြန်မာ"} src={"/images/Burma_flag.svg"} /></MenuItem>
                            <MenuItem value={"Malay"}><DropdownItem span={"Melayu"} src={"/images/Malaysia_flag.svg"} /></MenuItem>
                            <MenuItem value={"Thai"}><DropdownItem span={"ภาษาไทย"} src={"/images/Thailand_flag.svg"} /></MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </Box>
    );
}