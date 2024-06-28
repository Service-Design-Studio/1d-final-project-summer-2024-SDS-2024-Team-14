import Textbox from "./textbox";
import EmailIcon from '@mui/icons-material/Email'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@mui/material'
import { useState, useEffect, useCallback } from 'react';
import {Store, ReactNotifications } from 'react-notifications-component'

export default function SignUpForm({ formState, setFormState }) {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [onFirstPage, setPage] = useState(true);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()) // Access API
        }
        
    }, [emblaApi])
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
        <div className="">
            <ReactNotifications />

            <div className="embla__controls embla__buttons">
                <Button className="embla__button embla__button--prev" onClick={onPrevButtonClick} disabled={ onFirstPage } type="button" >Prev</Button>
                <Button className="embla__button embla__button--next" onClick={() => {
                    const { email, password, confirmPassword, firstName, lastName } = formState;
                    if (email && password && confirmPassword && firstName && lastName) {
                        onNextButtonClick();
                    } else {
                        Store.addNotification({
                            title: "Error",
                            message: "form not filled",
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
                    
                }} disabled={!onFirstPage} type="button" >Next</Button>

            </div>
            <div className=" embla" ref={emblaRef}>
            <div className="embla__container">
                    <div className="embla__slide flex flex-col" key={1}>
                    <h2 className="font-semibold">Step 1: Personal Information</h2>
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
                        type={passwordVisible ? "password" : "password"}
                        startIcon={<VpnKeyIcon />}
                        endIcon={passwordVisible ? <VisibilityIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} /> : <VisibilityOffIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />}
                        label={"Confirm Password"}
                        placeholder={"Confirm Password"}
                    />
                </div>
                    <div className="embla__slide flex flex-col" key={2}>
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
                        type={passwordVisible ? "password" : "password"}
                        startIcon={<VpnKeyIcon />}
                        endIcon={passwordVisible ? <VisibilityIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} /> : <VisibilityOffIcon className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)} />}
                        label={"Confirm Password"}
                        placeholder={"Confirm Password"}
                    />
                    <Button type="submit" id="submitBtn" variant="contained" className="mx-5 pt-3 mt-5 text-xl">Create Account</Button>
                </div>
            </div>
            </div>
        </div>
    )
}