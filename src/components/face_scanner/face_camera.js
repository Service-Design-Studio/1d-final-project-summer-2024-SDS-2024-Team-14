import Image from "next/image";
import { Camera } from "react-camera-pro";
import { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';

export default function CameraView({ cameraRef, capturedFrames }) {
    const [hasAlert, setAlert] = useState(false);
    const [cameraLoaded, setCameraLoaded] = useState(false);

    async function loadCam() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevice = devices.filter((d) => d.kind === "videoinput");
        setCameraLoaded(videoDevice.length > 0);
        return videoDevice.length > 0;
    }

    useEffect(() => {
        loadCam(); // Load camera when component mounts
    }, []);

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
                    aspectRatio={1}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Testing for captured frames -- uncomment the bottom part */}
            {/*{capturedFrames.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Captured Frames:</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {capturedFrames.map((frame, index) => (
                            <img key={index} src={frame} alt={`Captured Frame ${index}`} className="rounded-lg border-2 border-darkblue" />
                        ))}
                    </div>
                </div>
            )}*/}
        </div>
    );
}

            
            
            
            
            
            
            
            
            
            
 // Testing for captured frames           
{/* Display the captured frames */}
{/*<div className="mt-4">
    {capturedFrames.length > 0 && (
        <div>
            <h2 className="text-lg font-bold">Captured Frames:</h2>
            <div className="grid grid-cols-3 gap-2">
                {capturedFrames.map((frame, index) => (
                    <img key={index} src={frame} alt={`Captured Frame ${index}`} className="rounded-lg border-2 border-darkblue" />
                ))}
            </div>
        </div>
    )}
</div>*/}
