import Image from "next/image";
import CameraIcon from "../../../public/images/icons/camera.svg"
import { Camera } from "react-camera-pro";
import { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import redAvatarOutline from "../../../public/images/passport/red_avatar.svg"
import blueAvatarOutline from "../../../public/images/passport/blue_avatar.svg"
import greenAvatarOutline from "../../../public/images/passport/green_avatar.svg"

export default function FaceCamera({ cameraRef, isCameraOn, countdown, isMatched, lastFrame }) {
    const [hasAlert, setAlert] = useState(false);
    const [cameraLoaded, setCameraLoaded] = useState(false);
    const [countdownSize, setCountdownSize] = useState(100); // Default size

    async function loadCam() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevice = devices.filter((d) => d.kind === "videoinput");
        setCameraLoaded(videoDevice.length > 0);
        return videoDevice.length > 0;
    }

    useEffect(() => {
        loadCam(); // Load camera when component mounts
        const updateSize = () => {
          const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

          let newSize;
          if (vw <= 480) {
            // Mobile screens
            newSize = vw * 0.7; // 50% of viewport width
          } else if (vw <= 768) {
            // Tablet screens
            newSize = vw * 0.7; // 30% of viewport width
          } else {
            // Desktop screens
            newSize = vw * 0.2; // 20% of viewport width
          }
          setCountdownSize(newSize); // 20% of viewport width
        };

        updateSize(); // Set the initial size
        window.addEventListener('resize', updateSize); // Update size on window resize

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className="relative flex w-full h-full items-center justify-center">
            {hasAlert && !cameraLoaded ? (
                <Alert className="absolute w-10/12 self-center z-40" severity="error">
                    <AlertTitle>No Camera Detected</AlertTitle>
                    Allow camera permissions and refresh page.
                </Alert>
            ) : null}
                {isCameraOn && isMatched !== true && (
                <>
                <div className={`relative w-[70vw] h-[70vw] md:w-[20vw] md:h-[20vw] rounded-full shadow-lg overflow-hidden border-4 border-gray`}>
                    <Camera
                        priority
                        ref={cameraRef}
                        facingMode="environment"
                        aspectRatio={1}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="absolute w-full h-full flex items-center justify-center">                
                    <CountdownCircleTimer
                        isPlaying={isCameraOn}
                        duration={15} // 15 seconds countdown
                        initialRemainingTime={countdown}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[15, 10, 5, 0]}
                        trailColor="#d9d9d9" // Light grey color for the remaining part
                        strokeLinecap="round"
                        size={countdownSize} // Use the dynamic size
                        />
                </div>
                </>
                )}
                {!isCameraOn && isMatched === null && (
                <div className="relative w-[70vw] h-[70vw] md:w-[20vw] md:h-[20vw] rounded-full shadow-lg overflow-hidden border-4 border-darkblue">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-30 bg-[#000000]/50">
                    </div>
                     <Image className="w-[94%] absolute z-20 bottom-0 left-1/2 -translate-x-1/2"
                    src={blueAvatarOutline}/>
                    <div className="flex-col absolute left-0 top-0 w-full h-full z-40 rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                            className="w-[10vw] md:w-[4vw]"
                            src={CameraIcon} />
                        <p className="text-white text-md z-10">Press Begin Face Scan to turn on camera </p>
                        <p className="text-white text-md">and begin scanning</p>
                    </div>
                </div>
                )}
                {!isCameraOn && isMatched === false && (
                <div className="relative w-[70vw] h-[70vw] md:w-[20vw] md:h-[20vw] rounded-full shadow-lg overflow-hidden border-4 border-red">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-20" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    </div>
                    <Image className="w-full h-full bg-black bg-opacity-20" src={lastFrame} width="100" height="100"/>
                    <Image className="animate-pulse w-[94%] absolute z-30 bottom-0 left-1/2 -translate-x-1/2"
                    src={redAvatarOutline}/>
                </div>
                    )}
                {!isCameraOn && isMatched === true && (
                    <div className="relative w-[70vw] h-[70vw] md:w-[20vw] md:h-[20vw] rounded-full shadow-lg overflow-hidden border-4 border-[#00994C]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-20" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        </div>
                        <Image className="w-full h-full bg-black bg-opacity-20" src={lastFrame} width="100" height="100"/>
                        <Image className="animate-pulse w-[94%] absolute z-30 bottom-0 left-1/2 -translate-x-1/2"
                        src={greenAvatarOutline}/>
                    </div>
                        )}
        </div>
    );
}


            

