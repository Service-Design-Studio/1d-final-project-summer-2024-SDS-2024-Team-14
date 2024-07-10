import { useState, useRef, useEffect, useCallback } from 'react';
import "../../styles/globals.css";
import ScannedImage from '@/components/scanner/scanned_item';
import CameraView from '../../components/scanner/camera';
import { Button } from "@mui/material";
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image'
import Header from '../../components/scanner/header';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, Dialogcontent, DialogContentText, DialogTitle } from '@mui/material';


export default function Scanner() {
    const [imageList, setImageList] = useState({});
    const [uploadBtn, setUploadBtn] = useState("/images/upload.svg");
    const [image, setImage] = useState(null);
    const [count, setCount] = useState(Object.keys(imageList).length)
    const [open, setOpen] = useState(false);
    const [notif, setNotif] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
    const imageRef = useRef(null);

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
    useEffect(() => {
        if (image) {
            setImageList((prev) => ({ ...prev, [Object.keys(imageList).length]: image }));
        }
        setCount(Object.keys(imageList).length);
        setImage(null)
    }, [image])

    function removeImage(index) {
        setImageList((prev) => {
            prev = Object.keys(prev).filter(k => k !== index).reduce((newObj, key) => {
                newObj[key] = prev[key];
                return newObj
            }, {})
            setCount(Object.keys(prev).length);
            return prev;
        })
    }
    useEffect(() => {
        if (notif) {
            setTimeout(() => {
                setNotif(false);
            }, 3000);
        }
    }, [notif])

    return (
        <div className='flex flex-col min-w-full min-h-screen h-full bg-white'>
            <Header text={"Scanner"} onClick={() => { "/" }} />
            {notif ? <Alert
                className='absolute opacity-90 top-5 w-10/12 self-center z-40 bg-red text-white fill-white'
                severity='error'
                action={
                    <IconButton aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setNotif(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }><AlertTitle>No document detected</AlertTitle>Please adjust camera and try again.</Alert> : null}
            <div className='flex flex-col lg:flex-row w-10/12 lg:ml-10 mx-auto'>
                <div className='lg:w-5/12 '>
                    <div className="flex flex-col w-full ">
                        <div className='flex flex-col w-full'>
                            <CameraView
                                cameraRef={camera}
                                setImage={setImage}
                            />
                        </div>

                    </div>

                </div>
                <div className=' text-darkblue text-xl sm:text-3xl mt-5 lg:ml-5 lg:mt-0 w-full lg:w-7/12  font-semibold'>
                    <span className='w-full'>{count} Scanned Documents</span>
                    <div className='flex flex-row w-full'>
                        <Button
                            className='w-fit px-0 mx-0 embla__button embla__button--prev'
                            onClick={() => {
                                if (slideCount > 0) {
                                    onPrevButtonClick()
                                    setSlideCount((prev) => prev--)
                                }
                            }}
                        ><Image src="/images/previous_chevron.svg" className='w-4 sm:w-7 mx-0 px-0' width={1} height={1} alt="view previous scanned documents" /></Button>

                        <div ref={emblaRef} className='embla__viewport flex flex-row w-10/12 min-h-[150px] overflow-hidden'>
                            <div ref={imageRef} className=' embla__container w-[500px] px-100'>
                                {Object.entries(imageList).map((kv) => {
                                    return (<ScannedImage
                                        src={kv[1]}
                                        key={kv[0]}
                                        index={kv[0]}
                                        remove={() => removeImage(kv[0])}
                                        setNotif={setNotif}
                                    />)
                                })}
                                <div className={`embla__slide min-w-[200px] max-w-[200px]`}></div>
                            </div>
                        </div>
                        <Button
                            className={`w-1/12 embla__buttons embla__button embla__controls  {embla__button--next}`}
                            onClick={() => {
                                if (slideCount < count) {
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
            {count > 0 ?
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