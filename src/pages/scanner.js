import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import Image from "next/image";
import "../styles/globals.css";
import jscanify from "jscanify";
import { loadImage } from 'canvas';

export default function Scanner(){
    const camera = useRef(null);
    const [image, setImage] = useState(null);
    const [canvas, setCanvas] = useState(null);

    const paperWidth = 500;
    const paperHeight = 1000;

    loadImage(image).then((image) => {
        const scanner = new jscanify()
        scanner.loadOpenCV(function (cv) {
            scanner.extractPaper();
        })
        const extracted = scanner.extractPaper(image, width, height) //...
        const highlighted = scanner.highlightPaper(image) //...
    })
    return (
        <div className="bg-white w-screen h-screen">
            <div className="w-5/12">
                <Camera ref={camera} facingMode="environment" aspectRatio={2 / 3} />
            </div>
            <button onClick={() => {
                setImage(camera.current.takePhoto());
            }}>Take photo</button>
            <button onClick={() => camera.current.switchCamera()}>Switch camera</button>

            <Image width={300} height={400} src={image} alt='Taken photo' />

            {canvas && <div>{canvas}</div>}
        </div>
    );
};