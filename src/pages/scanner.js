import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@mui/base";
import { Camera } from "react-camera-pro";
import * as cv from "@techstark/opencv-js";
import "../styles/globals.css";

export default function Scanner() {
    const camera = useRef(null);
    const [image, setImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);

    const processImage = useCallback(() => {
        if (!image) return;
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const src = cv.imread(canvas);
            const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
            cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
            cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);
            const contours = new cv.MatVector();
            const hierarchy = new cv.Mat();
            cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
            for (let i = 0; i < contours.size(); ++i) {
                const color = new cv.Scalar(
                    Math.round(Math.random() * 255),
                    Math.round(Math.random() * 255),
                    Math.round(Math.random() * 255)
                );
                cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
            }
            const processedCanvas = document.createElement("canvas");
            cv.imshow(processedCanvas, dst);
            setProcessedImage(processedCanvas.toDataURL());

            src.delete();
            dst.delete();
            contours.delete();
            hierarchy.delete();
        };
    }, [image]);

    useEffect(() => {
        processImage();
    }, [image, processImage]);

    return (
        <div className="bg-white w-screen h-full">
            <div className="w-5/12">
                <Camera ref={camera} facingMode="environment" aspectRatio={2 / 3} />
            </div>
            <Button
                className="card bg-darkblue text-xl text-white"
                onClick={() => {
                    setImage(camera.current.takePhoto());
                }}
            >
                Take photo
            </Button>
            <div className="flex h-50">
                <img className="flex-1 w-auto h-auto" src={image} alt="Taken photo" />
                <img className="flex-1 w-auto h-auto" src={processedImage} alt="Processed photo" />
            </div>
        </div>
    );
}