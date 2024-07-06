import Textbox from "./textbox";
import EmailIcon from '@mui/icons-material/Email'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@mui/material'
import { useState, useEffect, useCallback } from 'react';
import { Store, ReactNotifications } from 'react-notifications-component'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
export default function SignUpForm({ formState, setFormState }) {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [pageNumber, setPage] = useState(1);
    const [birthDate, setBirthDate] = useState(dayjs());
    const [arrivalDate, setArrivalDate] = useState(dayjs());
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, watchDrag: false })
    const [notification, setNotification] = useState();

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
        setPage(true)
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
        setPage(false)
    }, [emblaApi])
    return (
        <div id="signUpForm" onKeyDownCapture={(e) => { if (e.which == 9) e.preventDefault() }}>
            <div className="embla__controls embla__buttons">
                <Button className="embla__button embla__button--prev" onClick={() => {
                    onPrevButtonClick();
                    if (pageNumber == 2) {
                        setPage(1);
                    } else if (pageNumber == 3) {
                        setPage(2);
                    }
                    if (pageNumber <= 0) setPage(1);
                }} disabled={pageNumber == 1} type="button" >Prev</Button>
                <Button className="embla__button embla__button--next" onClick={() => {
                    Object.keys(formState).forEach(key => window[key] = formState[key]);
                    if (pageNumber == 1 && arrivalDate && birthDate && firstName && lastName) {
                        onNextButtonClick();
                        setPage(2);
                    } else if (pageNumber == 2 && originCountry && ethnicity && gender && religion) {
                        onNextButtonClick();
                        setPage(3);
                    } else {
                        if (!notification) {
                            setNotification(
                                Store.addNotification({
                                    title: "Error",
                                    message: "Please fill form to continue.",
                                    type: "danger",
                                    insert: "top",
                                    container: "bottom-right",
                                    animationIn: ["animate__animated", "animate__fadeIn"],
                                    animationOut: ["animate__animated", "animate__fadeOut"],
                                    dismiss: {
                                        duration: 3000,
                                        onScreen: true,
                                        showIcon: true,
                                    }
                                })
                            )
                        } else {
                            Store.removeNotification(notification);
                            setNotification();
                        }
                    }

                }} disabled={pageNumber == 3} type="button" >Next</Button>

            </div>
            <div className=" embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide flex flex-col" key={1}>
                        <h2 className="font-semibold">Step 1: Personal Information 1</h2>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                format="DD/MMM/YYYY"
                                label="Date of Birth"
                                id="birthDate"
                                onChange={(e) => {
                                    setFormState(prevState => ({
                                        ...prevState, "birthDate": JSON.stringify(e)
                                    }))
                                }}
                                defaultValue={dayjs()}
                                className="mx-auto mt-5"
                                disableFuture={true}
                                sx={{ width: '90%' }}
                                maxDate={dayjs()}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                format="DD/MMM/YYYY"
                                label="Date of Arrival"
                                onChange={(e) => setFormState(prevState => ({ ...prevState, "arrivalDate": JSON.stringify(e) }))}
                                id="arrivalDate"
                                defaultValue={dayjs()}
                                className="mx-auto mt-5"
                                disableFuture={true}
                                sx={{ width: '90%' }}
                                maxDate={dayjs()}
                            />
                        </LocalizationProvider>

                    </div>
                    <div className="embla__slide flex flex-col" key={2}>
                        <h2 className="font-semibold">Step 2: Personal Information 2</h2>
                        <Textbox
                            // error={lastNameError}
                            setFormState={setFormState}
                            id={"originCountry"}
                            label={"Country of Origin"}
                            placeholder={"Country Name"}
                        />
                        <Textbox
                            // error={lastNameError}
                            setFormState={setFormState}
                            id={"ethnicity"}
                            label={"Ethnicity"}
                            placeholder={"Ethnicity"}
                        />
                        <Textbox
                            // error={lastNameError}
                            setFormState={setFormState}
                            id={"gender"}
                            label={"Gender"}
                            placeholder={"Male/Female/Non-binary"}
                        />
                        <Textbox
                            // error={lastNameError}
                            setFormState={setFormState}
                            id={"religion"}
                            label={"Religion"}
                            placeholder={"Religion"}
                        />
                    </div>
                    <div className="embla__slide flex flex-col" key={3}>
                        <h2 className="font-semibold">Step 3: Account Details</h2>
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
                        <Textbox
                            setFormState={setFormState}
                            error={confirmError}
                            id={"confirmPassword"}
                            type={passwordVisible ? "text" : "password"}
                            startIcon={<VpnKeyIcon />}
                            endIcon={passwordVisible ? <VisibilityIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} /> : <VisibilityOffIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />}
                            label={"Confirm Password"}
                            placeholder={"Confirm Password"}
                        />
                        <Button type="submit" onClick={console.log(formState)} id="submitBtn" variant="contained" className="mx-5 pt-3 mt-5 text-xl">Create Account</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}