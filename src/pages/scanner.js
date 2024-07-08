import { useState, useRef, useCallback, useEffect } from 'react';
import "../styles/globals.css";
import ScannedImage from '@/components/scanner/scanned_item';
import CameraView from '../components/scanner/camera';
import { Button } from "@mui/material";
export default function Scanner() {
    const [imageList, setImageList] = useState([]);
    const [image, setImage] = useState(null);
    const camera = useRef(null);
    const [cameraLoaded, setCameraLoaded] = useState(false);

    useEffect(() => {
        if (image) {
            setImageList((prevList) => [...prevList, image]);
            console.log("imageList: ", imageList);
        }
    }, [image])

    function removeImage(index) {
        if (index < imageList.length){
        setImageList((prevList) => prevList.filter((item) => {return item != prevList[index]}));}
    }
    

    useEffect(() => {
        if (camera.current) {
            setCameraLoaded(true);
            console.log(cameraLoaded, ": cameraloaded");
        }
    }, [camera, cameraLoaded]);

    return (
        <div className='w-full h-screen bg-white'>
            <div className='w-full text-2xl ' alt={"header placeholder"}>Scanner</div>

            <div className="flex flex-col lg:flex-row items-center justify-center ">
                <div className='flex flex-col w-11/12 xsm:w-7/12 sm:w-5/12 lg:w-fit items-center'>
                    <CameraView
                        cameraRef={camera}
                    />
                    <Button
                        className={`w-full bg-darkblue text-white hover:bg-white hover:text-darkblue text-xl rounded-md my-5`}
                        onClick={() => {
                            if (cameraLoaded) setImage(camera.current.takePhoto())
                        }}
                    >Scan Document</Button>
                </div>
                <div className='flex flex-row w-11/12 xsm:w-7/12 sm:w-5/12 lg:w-fit'>
                    {imageList.map((image, index) => (
                        <ScannedImage src={image} key={index} index={ index} remove={removeImage} />
                    ))}
                </div>

            </div>
        </div>)
}