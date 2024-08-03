import Image from "next/image";
import { Camera } from "react-camera-pro";
import { useState, useEffect } from 'react';
import { Button } from "@mui/base"
import { Alert, AlertTitle } from '@mui/material'
export default function CameraView({ cameraRef, setImage }) {
    const [hover, setHover] = useState("/images/camera_white.svg");
    const [hasAlert, setAlert] = useState(false);
    const [cameraLoaded, setCameraLoaded] = useState(false)
    
    async function loadCam() {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const videoDevice = devices.filter((d) => d.kind === "videoinput");
        setCameraLoaded(videoDevice.length > 0)
        return videoDevice.length > 0
    }

    return (
        <div className="relative flex w-full h-7/12 items-center justify-center">
            {hasAlert && !cameraLoaded ? (
                <Alert className="absolute w-10/12 self-center z-40" severity="error">
                    <AlertTitle>No Camera Detected</AlertTitle>
                    Allow camera permissions and refresh page.
                </Alert>
            ) : null}
    
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-darkblue shadow-lg">
                <Camera
                    priority
                    ref={cameraRef}
                    facingMode="environment"
                    aspectRatio={1} // 1:1 Aspect ratio for the circular view
                />
            </div>
        </div>
    )
}