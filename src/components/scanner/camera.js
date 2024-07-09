import Image from "next/image";
import { Camera } from "react-camera-pro";
import { useState } from 'react';
import { Button } from "@mui/base"
export default function CameraView({ cameraRef, cameraLoaded, setImage, camera }) {
    const [hover, setHover] = useState("/images/camera_white.svg");
    return (
        <div className="relative flex w-full h-7/12 items-center justify-center">
            <span className="absolute top-14 z-20 p-1 text-white text-md sm:text-lg xsm:text-xl opacity-55 bg-default bg-opacity-60">Position document within boundary </span>
            <Image src="/images/A4_crosshairs.svg" className="absolute z-10 w-11/12" width={1} height={1} alt="Camera view" />
            <Button
                className="btn-submit absolute z-40 w-fit bottom-5 rounded-full p-1"
                onMouseEnter={() => setHover("/images/camera_darkblue.svg")}
                onMouseLeave={() => setHover("/images/camera_white.svg")}
                onClick={() => {
                    if ({ cameraLoaded }) { setImage(cameraRef.current.takePhoto())}
                }}
            ><Image src={hover} className="w-fit" width={1} height={1} alt='Upload document'/></Button>
            <Camera priority ref={cameraRef} facingMode="environment" aspectRatio={1 / 1.4142} />
        </div>
    )
}