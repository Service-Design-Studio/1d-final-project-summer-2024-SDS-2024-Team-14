import { useState, useRef, useEffect, useCallback } from 'react';
import "../../styles/globals.css";
import ScannedImage from '@/components/scanner/scanned_item';
import CameraView from '../../components/scanner/camera';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image'
import Header from '../../components/header';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContentText, DialogTitle, Button, MenuItem, TextField, Alert, AlertTitle, IconButton, FormControl, } from '@mui/material';
import PDFDocument from 'pdfkit'
import axiosInstance from "@/utils/axiosInstance";
import {useRouter} from "next/router";

export default function Scanner() {
    const fs = require('fs') //filesystem for upload pdf test
    const [imageList, setImageList] = useState({});
    const [uploadBtn, setUploadBtn] = useState("/images/upload.svg");
    const [image, setImage] = useState(null);
    const [count, setCount] = useState(Object.keys(imageList).length)
    const [open, setOpen] = useState(false);
    const [notif, setNotif] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
    const imageRef = useRef(null);
    const fileNameRef = useRef(null);
    const fileCategoryRef = useRef(null);
    const backButtonUrl = "/documents";
    const [slideCount, setSlideCount] = useState(1);
    const [fileName, setFileName] = useState(null);
    const fileCategories = [
        {
            value: "Career",
            label: "Career"
        },
        {
            value: "Education",
            label: "Education"
        },
        {
            value: "Family",
            label: "Family"
        },
        {
            value: "Finance",
            label: "Finance"
        },
        {
            value: "Health",
            label: "Health"
        },
        {
            value: "Property",
            label: "Property"
        }
    ]
    const router = useRouter();
    const [category, setCategory] = useState(fileCategories[0].value)
    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    function base64ToBlob(base64, contentType) {
        const byteCharacters = atob(base64.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    }

    function uploadImages() {
        const userId = localStorage.getItem('userID');
        // const category =
        const formData = new FormData();
        Object.values(imageList).forEach((image, index) => {
            const contentType = image.split(',')[1]
            const blob = base64ToBlob(image, contentType);
            formData.append("files[]", blob, `photo${index}.jpg`);
        });
        formData.append("id", userId)
        formData.append("category", category)
        axiosInstance.post("/document", formData).then((resp)=>{
            if (resp.status === 200 || resp.status === 201) {
                localStorage.setItem('notificationMessage', 'You have successfully uploaded the file. Please check that the file is in your folder.');
                localStorage.setItem('status', 'success')
            }
            else{
                localStorage.setItem('notificationMessage', 'There was an error uploading the file. Please contact your administrator for help.');
                localStorage.setItem('status', 'error')
            }
            router.push("/documents")
        })
    }

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
        <div className='flex flex-col min-w-full min-h-screen h-full bg-white items-center'>
            <div className="w-11/12 mt-4">
                <Header title={"Scanner"} backButton={backButtonUrl} />
            </div>
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
                <div className=' text-darkblue text-xl sm:text-3xl mt-5 lg:ml-20 lg:mt-0 w-full lg:w-7/12  font-semibold'>
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
                                {Object.entries(imageList).map((kv, i) => {
                                    return (<ScannedImage
                                        src={kv[1]}
                                        key={kv[0]}
                                        index={i}
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
                    <FormControl required className='w-full mt-10'>
                        <span className='mb-3'>Document Details</span>
                        {/* <TextField onChange={(e) => {
                            setFileName(e.target.value)
                        }} fullWidth sx={{ "marginBottom": 3 }} ref={fileNameRef} required label="Input File Name" rows={1} variant='outlined' placeholder="File name"></TextField> */}

                        <TextField onChange={(e) => {
                            setCategory(e.target.value)
                        }} required select fullWidth sx={{ "marginBottom": 3, }} ref={fileCategoryRef} label="Category" placeholder="Category" rows={1} variant='outlined' defaultValue={`${fileCategories[0].label}`}>
                            {fileCategories.map((val) => {
                                return (<MenuItem key={val.value} value={val.value}>{val.label}</MenuItem>)
                            })}
                        </TextField>
                    </FormControl>
                    <Button
                        onMouseEnter={() => setUploadBtn("/images/upload_darkblue.svg")}
                        onMouseLeave={() => setUploadBtn("/images/upload.svg")}
                        onClick={() => {
                            setOpen(true);
                        }} className='btn-submit'><Image src={uploadBtn} className=" w-5 mx-2 hover:fill-darkblue" width={1} height={1} alt='Upload document' />Upload Document</Button>
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
                        <DialogContentText>
                            <span>Confirm document upload?</span>
                        </DialogContentText>
                    </div>

                    <DialogActions className='flex flex-row'>
                        <Button className="w-3/12" onClick={() => setOpen(false)}>Close</Button>
                        <Button className="w-3/12 bg-darkblue text-white hover:text-white hover:bg-darkblue" onClick={() => {
                            setOpen(false);
                            uploadImages();
                        }}>Yes</Button>
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