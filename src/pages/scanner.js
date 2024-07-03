import React, { useState, useRef } from "react";
// import { DocumentScanner, OpenCVDocumentDetectHandler } from "opencv-document-scanner";
import { Camera } from "react-camera-pro";
import "../styles/globals.css"
export default function Scanner() {
    // const documentScanner = new DocumentScanner();
    const camera = useRef(null);
    const [image, setImage] = useState(null);
    return (
        <div className="bg-white w-scree h-screen">
            <div className="w-5/12 ">
                <Camera ref={camera} facingMode="environment" aspectRatio={2 / 3} />
            </div>
            <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
            <button onClick={() => camera.current.switchCamera()}>Switch camera</button>
            <img src={image} alt='Taken photo' />
        </div>)

};