import { useState, useRef, useEffect, useCallback } from 'react';
import "../styles/globals.css";
import ScannedImage from '@/components/scanner/scanned_item';
import CameraView from '../components/scanner/camera';
import { Button } from "@mui/material";
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image'
import Header from '../components/scanner/header';
import { Dialog, DialogActions, Dialogcontent, DialogContentText, DialogTitle } from '@mui/material';

export default function Scanner() {
    const [imageList, setImageList] = useState([]);
    const [uploadBtn, setUploadBtn] = useState("/images/upload.svg");
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
    const [slideCount, setSlideCount] = useState(1);

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    const camera = useRef(null);
    const [cameraLoaded, setCameraLoaded] = useState(false);
    useEffect(() => {
        if (image) {
            setImageList((prevList) => [...prevList, image]);
            console.log("imageList: ", imageList);
        }
    }, [image])

    function removeImage(index) {
        if (index < imageList.length) {
            setImageList((prevList) => prevList.filter((item) => { return item != prevList[index] }));
        }
    }

    useEffect(() => {
        if (camera.current) {
            setCameraLoaded(true);
            console.log(cameraLoaded, ": cameraloaded");
        }
    }, [camera, cameraLoaded]);
    return (
        <div className='flex flex-col min-w-full w-fit min-h-screen h-full bg-white'>
            <Header text={"Scanner"} onClick={() => { }} />
            <div className='flex flex-col lg:flex-row w-10/12 lg:ml-10 mx-auto'>
                <div className='lg:w-5/12 '>
                    <div className="flex flex-col w-full ">
                        <div className='flex flex-col w-full'>
                            <CameraView
                                cameraRef={camera}
                                setImage={setImage}
                                cameraLoaded={cameraLoaded}
                            />
                        </div>

                    </div>

                </div>
                <div className=' text-darkblue text-lg sm:text-3xl lg:ml-5 w-full lg:w-7/12  font-semibold'>
                    <span className='w-full'>{imageList.length} Scanned Documents</span>
                   <div className='flex flex-row'>
                        <Button
                            className='w-1/12  embla__button embla__button--prev'
                            onClick={() => {
                                if (slideCount > 0) {
                                    onPrevButtonClick()
                                    setSlideCount((prev) => prev--)
                                }
                            }}
                        ><Image src="/images/previous_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view previous scanned documents" /></Button>
            
                    <div ref={emblaRef} className='embla__viewport flex flex-row w-[500px] min-h-[150px] overflow-hidden'>
                        <div className=' embla__container w-[500px] px-100'>
                            {imageList.map((image, index) => (
                                <ScannedImage src={image} key={index} index={index} remove={removeImage} />
                            ))}
                            <div className={`embla__slide min-w-[100px] max-w-[100px]`}></div>
                        </div>
                    </div>
                    <Button
                        className={`w-1/12 embla__buttons embla__button embla__controls  {embla__button--next}`}
                        onClick={() => {
                            if (slideCount < imageList.length) {
                                onNextButtonClick()
                                setSlideCount((prev) => prev++)
                            }
                        }}
                        ><Image src="/images/next_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view next scanned documents" /></Button>
                    </div>
                    <Button
                        onMouseEnter={() => setUploadBtn("/images/upload_darkblue.svg")}
                        onMouseLeave={() => setUploadBtn("/images/upload.svg")}
                        onClick={() => {
                            setOpen(true);
                        }} className='btn-submit'><Image src={uploadBtn} className="w-5 mx-2 hover:fill-darkblue" width={1} height={1} alt='Upload document' />Upload Document</Button>
                </div>

            </div>
            {imageList.length > 0 ?
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    fullWidth={true}
                >
                    <div className='mx-4 flex flex-col text-start items-start'>
                        <DialogTitle>Confirm Upload?</DialogTitle>
                        <DialogContentText>Confirm document upload?</DialogContentText>
                    </div>

                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Yes</Button>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

                :
                <Dialog
                    sx={{ textAlign: "start" }}
                    open={open}
                    onClose={() => setOpen(false)}
                    fullWidth={true}
                >
                    <div className='mx-4 flex flex-col text-start items-start'>
                        <DialogTitle >No document to submit</DialogTitle>
                        <DialogContentText>Please add more documents before uploading.</DialogContentText>
                    </div>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            }
        </div>)
}