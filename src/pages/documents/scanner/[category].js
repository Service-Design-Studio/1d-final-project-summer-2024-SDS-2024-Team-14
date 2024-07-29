import React, { useState, useRef, useEffect, useCallback } from 'react';
import "../../../styles/globals.css";
import ScannedImage from '@/components/scanner/scanned_item';
import CameraView from '../../../components/scanner/camera';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image'
import NaviBar from '../../../components/NaviBar';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContentText, DialogTitle, Button, TextField, Alert, AlertTitle, IconButton, FormControl, } from '@mui/material';
import { jsPDF } from "jspdf";
import Header from '@/components/document_manager/dm_header';
import axiosInstance from "@/utils/axiosInstance";
import {useRouter} from "next/router";
import ChatBot from "@/components/ChatBot";
import EnableId from "../../../../public/images/enable_id_logo.svg";

export default function Category() {
    const [imageList, setImageList] = useState({});
    const [uploadBtn, setUploadBtn] = useState("/images/upload.svg");
    const [image, setImage] = useState(null);
    const [count, setCount] = useState(Object.keys(imageList).length)
    const [open, setOpen] = useState(false);
    const [notif, setNotif] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
    const imageRef = useRef(null);
    const backButtonUrl = "/documents";
    const [slideCount, setSlideCount] = useState(1);
    const [fileName, setFileName] = useState("");
    const router = useRouter();
    const category = router.query.category;
    const [categoryName, setCategoryName] = useState(null);
    const doc = new jsPDF();

    useEffect(() => {
        if (category && !categoryName) setCategoryName(category[0].toUpperCase() + category.slice(1))
    }, [category])
    
    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    // function base64ToBlob(base64, contentType) {
    //     const byteCharacters = atob(base64.split(',')[1]);
    //     const byteNumbers = new Array(byteCharacters.length);
    //     for (let i = 0; i < byteCharacters.length; i++) {
    //         byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }
    //     const byteArray = new Uint8Array(byteNumbers);
    //     return new Blob([byteArray], { type: contentType });
    // }

    function uploadImages() {
        const userId = localStorage.getItem('userID');
        const formData = new FormData();
        Object.values(imageList).forEach((image, index, array) => {
            doc.addImage(image, 'PNG', 0, 0, 210, 297);
            if (index < array.length - 1) {
                doc.addPage();
            }
        });
        formData.append("files[]", doc.output('blob'), `${fileName}.pdf`);
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
        <div className="flex flex-col min-h-screen bg-[url('/images/background/gebirah-bluebg.png')] bg-cover ">
            <div className="md:flex md:items-center pt-4 ml-4">
                <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
                <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
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
            <div className='flex flex-col pt-6 pb-14 lg:flex-row w-10/12 lg:ml-10 mx-auto'>
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
                    <FormControl className='w-full'>
                        <span className='mt-3 mb-3'>Document Name</span>
                        <TextField
                            required={ true}
                            id="file_name"
                            className='mb-6'
                            label="Document Name"
                            onChange={(e)=> setFileName(e.target.value)}
                            defaultValue={fileName.length > 0 ? fileName : ""}
                            placeholder="Document Name"
                            helperText={fileName.length > 0 ? `Your document will appear as '${fileName}.pdf' in '${categoryName}' category.` : "Please fill in document name"}
                        />
                        <Button
                            type="submit"
                            onMouseEnter={() => setUploadBtn("/images/upload_darkblue.svg")}
                            onMouseLeave={() => setUploadBtn("/images/upload.svg")}
                            onClick={() => {
                                setOpen(true);
                            }} className='btn-submit'><Image src={uploadBtn} className=" w-5 mx-2 hover:fill-darkblue" width={1} height={1} alt='Category document' />Upload Documents</Button>
                    </FormControl>
                    
                </div>

            </div>
            {count > 0 && fileName.length > 0 ?
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    fullWidth={true}
                >
                    <div className='mx-4 flex flex-col text-start items-start'>
                        <DialogTitle>Confirm Upload?</DialogTitle>
                        <DialogContentText>
                            <span>{`Upload document '${fileName}.pdf' with ${count} pages?`}</span>
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
                        <DialogContentText>Please add 1 or more document and fill in document name before uploading.</DialogContentText>
                    </div>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            }
        <ChatBot/>
        </div>
    )
}