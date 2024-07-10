import "../styles/globals.css"
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import LoginCarousel from '../components/loginpage/login_carousel';
import { Box, InputLabel, MenuItem, Select, FormControl, } from '@mui/material';
import DropdownItem from "../components/loginpage/dropdown_item";
import { Store, ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import axiosInstance from "../utils/axiosInstance";

import dayjs from "dayjs";
import LoginForm from "../components/loginpage/login_form";
import SignUpForm from "../components/loginpage/signup_form";

export default function Login({ session }) {
    const router = useRouter();
    const [onLoginTab, setOnLoginTab] = useState(true);
    const [formState, setFormState] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        rememberPassword: true,
        firstName: null,
        lastName: null,
        ethnicity: null,
        religion: null,
        originCountry: null,
        birthDate: dayjs(),
        arrivalDate: dayjs(),
        gender: null,
    });
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    // const [errorState, setErrorState] = useState(true);
    useEffect(() => {
        const message = localStorage.getItem('notificationMessage');
        if (message) {
        Store.addNotification({
                    title: "Error",
                    message: message,
                    type: "danger",
                    insert: "bottom",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
        localStorage.removeItem('notificationMessage'); // Clear the message after displaying
    }
  }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (!onLoginTab) {
            SignUpHandler(formState)
        } else {
            LogInHandler(formState)
        }
    }

    function SignUpHandler(req) {
        const email = req.email;
        const password = req.password;
        const password_confirmation = req.confirmPassword
        const name = req.firstName + ' ' + req.lastName
        const country = req.originCountry
        const religion = req.religion
        const ethnicity = req.ethnicity
        const gender = req.gender
        const date_birth = req.birthDate
        const date_arrival = req.arrivalDate
        axiosInstance.post('/users', {
            email,
            password,
            password_confirmation,
            name,
            country,
            religion,
            ethnicity,
            gender,
            date_birth,
            date_arrival
        }).then(
            (resp) => {
                if (resp.status === 200 || resp.status === 201) {
                localStorage.setItem('userID', resp.data.user_id)
                router.push('/');
            }
        }).catch((error) => {
            Store.addNotification({
                title: "Error",
                message: error.response.data.message,
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            }
        );
    }

    function LogInHandler(req) {
        const email = req.email
        const password = req.password
        axiosInstance.post('/login', {
            email,
            password,
        }).then((resp) => {
            if (resp.status === 200 || resp.status === 201) {
                localStorage.setItem('userID', resp.data.user_id)
                router.push('/');
            }
        }).catch((error) => {
            Store.addNotification({
                title: "Error",
                message: error.response.data.message,
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
        )
    }
    return (<>
        <ReactNotifications />
        <Box onSubmit={(e) => handleSubmit(e)} component="form" autoComplete="on" noValidate={false} className={`flex flex-col min-w-screen min-h-screen items-center bg-[url("/images/Zaatari_refugee_camp,_Jordan_(3).jpg")] bg-no-repeat bg-center bg-cover px-3 pb-10`}>
            <div className="flex flex-row items-center pt-6 my-0">
                <Image src="/images/enable_id_logo.svg" width={40} height={0} className="md:w-20" alt="EnableID Logo" />
                <span className="text-white text-4xl md:text-5xl px-3">EnableID</span>
            </div>
            <div className='flex flex-col mt-6 w-full lg:w-1/2 transition-all-50 bg-opacity-70 backdrop-blur-sm'>
                <LoginCarousel onLoginTab={onLoginTab} setOnLoginTab={setOnLoginTab} />
                <div className='flex flex-col text-center bg-gradient-to-b from-white/100 to-white/65 rounded-b-xl pt-5'>
                    {onLoginTab ? <LoginForm onLoginTab={onLoginTab} setFormState={setFormState} /> : <SignUpForm onLoginTab={onLoginTab} formState={formState} setFormState={setFormState}/>}
                    {onLoginTab ? <a href="#" className="underline mt-5 text-darkblue">Forgot Password</a> : null}
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
    </>
    );
}