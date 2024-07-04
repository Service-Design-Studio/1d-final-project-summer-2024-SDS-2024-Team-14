import Textbox from "./textbox";
import EmailIcon from '@mui/icons-material/Email'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Checkbox, Button } from '@mui/material'
import { useState } from 'react';
export default function LoginForm({ onLoginTab, setFormState}) {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rememberPassword, setRememberPassword] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className='flex flex-col'>
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
            <div onClick={() => { setRememberPassword(!rememberPassword); setFormState(prevState => ({ ...prevState, rememberPassword: !document.getElementById("rememberPassword").checked })) }} className="px-6 mt-3 self-start cursor-pointer"><Checkbox id="rememberPassword" className="my-auto" label="Remember Password" variant="outlined" checked={rememberPassword} /><span className="align-middle my-auto">Remember Password</span></div>
            <Button type="submit" id="submitBtn" variant="contained" className="mx-5 pt-3 mt-5 text-xl">Login</Button>
            
       </div>
    )
}