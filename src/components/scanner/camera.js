import Image from "next/image";
import { Camera } from "react-camera-pro";
import { useRef, useEffect } from 'react';
export default function CameraView({cameraRef }) {
    return (
        <div className="relative flex w-full lg:w-[500px] h-7/12 lg:h-[707px] items-center justify-center">
            <span className="absolute bottom-14 z-20 p-1 text-white text-md sm:text-lg xsm:text-xl opacity-55 bg-default bg-opacity-60">Position document within boundary </span>
            <Image src="/images/A4_crosshairs.svg" className="absolute z-10 w-11/12" width={1} height={1} alt="Camera view" />
            <Camera ref={cameraRef} facingMode="environment" aspectRatio={1 / 1.4142} />
        </div>
    )
}