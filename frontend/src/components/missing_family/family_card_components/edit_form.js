import "../../../styles/globals.css"
import { Dialog, DialogActions, DialogContentText, DialogTitle, Button, Input } from "@mui/material"
import { useState, useEffect } from "react"
import FormField from "./form_field"
import Image from "next/image"
import axiosInstance from "../../../utils/axiosInstance";

export default function EditForm(props) {
    const [id, setId] = useState()
    const [data, setData] = useState({});
    const [photos, setPhotos] = useState();
    const [files, setFiles] = useState(null);
    const [saveable, setSaveable] = useState(false);
    const [open, setOpen] = useState(false);
    let onSaveChanges = async () => {
        try {
            await axiosInstance.post("/missing/update",
                {
                    ...data,
                    "id": id,

                }).then(resp => {
                    if (resp.status === 200 || resp.status === 201) {
                        localStorage.setItem('notificationMessage', 'You have successfully saved.');
                        localStorage.setItem('status', 'success');
                        if (photos != null) {
                            try {
                                let formData = new FormData();
                                formData.append('id', id);
                                formData.append('photo', files, files)
                                axiosInstance.post("/missing/upload", formData)
                            } catch (error) {
                                console.error('Error uploading image', error);
                            }
                        } else {
                            axiosInstance.post("/missing/upload", {
                                'id': id,
                                'photo': null
                            });
                        }
                    } else {
                        localStorage.setItem('notificationMessage', 'There was an error in saving, Please retry again later.');
                        localStorage.setItem('status', 'error');
                    }
                })
        } catch (error) {
            console.error(error.message)
        } finally {
            setData({});
            setPhotos();
            setFiles();
            props.setEdit();
            props.setFetch(true);
        }
    }

    useEffect(() => {
        if (data.name && data.age && data.gender && data.ethnicity && data.date_birth) {
            setSaveable(true);
        } else {
            setSaveable(false);
        }
    }, [data])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            // setFiles(prev => [...prev, file])
            setFiles(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                // setPhotos(prev => [...prev, reader.result]);
                setPhotos(reader.result)
            }
            reader.readAsDataURL(file);
        } else {
            //TODO: Popup for wrong file format selected
            console.log("Selected file not in .jpeg or .png format");
        }
    }

    useEffect(() => {
        if (props.selectedData) {
            let { id, ...fields } = props.selectedData;
            setData(fields);
            setId(id);
            setPhotos(props.selectedData.src);
        }
    }, [props.selectedData])

    return (
        <div className="flex flex-col rounded-r-2xl w-full h-full shadow-lg bg-white text-darkblue text-lg font-semibold px-3 ">
            <div className="mt-3 text-2xl line-clamp-1 overflow-ellipsis">
                <span>{`Edit Entry`}</span>
            </div>
            <div className="mt-1 w-full">
                <div className="flex flex-row w-full">
                    <span className="w-fit">Photos</span>
                    <Input
                        type="file"
                        className="w-fit border-none self-end mx-3"
                        onChange={handleFileChange}>
                    </Input>
                </div>
                <div className="flex flex-row w-full overflow-x-scroll mt-5 p-0">
                    {photos ? <div className="flex flex-col items-center">
                        <Image src={photos} width={1} height={1} className="aspect-square object-cover w-28 mx-5 border-darkblue border-2" alt="added photo" />
                        <div
                            className="underline"
                            onClick={() => {
                                setPhotos()
                            }}>
                            Remove
                        </div>
                    </div> : ""}
                </div>
            </div>

            <FormField title={"Name"} placeholder={"e.g. Abdul Ahmed"} setData={setData} default={data ? data.name : ""} />
            <FormField title={"Gender"} placeholder={"e.g. Male"} setData={setData} default={data ? data.gender : "Male"} />

            <FormField title={"Age"} placeholder={""} setData={setData} default={data ? data.age : ""} />
            <FormField title={"Date Of Birth"} placeholder={Date.now()} setData={setData} default={data ? data.date_birth : Date.now()} />
            <FormField title={"Ethnicity"} placeholder={"e.g. Arab"} setData={setData} default={data ? data.ethnicity : ""} />
            {/* <FormField title={"Relationship"} placeholder={"e.g. Brother"} setData={setData} /> */}
            <div className="flex md:flex-row flex-col items-center mb-5 mt-5">
                <Button
                    className="bg-gray text-white w-fit hover:bg-gray hover:bg-opacity-75 text-center my-1 mx-2"
                    onClick={() => {
                        props.setEdit();
                        setData({});
                    }}>
                    Discard Changes
                </Button>
                <Button
                    onClick={() => {
                        if (saveable) {
                            onSaveChanges();
                        } else {
                            setOpen(true);
                        }
                    }}
                    className="save_changes bg-darkblue text-white w-fit hover:bg-darkblue hover:bg-opacity-75  text-center my-1 mx-2">
                    <Image width={1} height={1} className="h-0.8 w-auto mr-2 " src={"/images/save_icon.svg"} alt="Save Changes" /> Save Changes
                </Button>
            </div>
            {open && <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth={true}
            >
                <div className='pop-up mx-4 flex flex-col text-start items-start'>
                    <DialogTitle>Unfilled Details</DialogTitle>
                    <DialogContentText>
                        {data.age > 0 ? <span>{`Please fill in all details in the form before saving.`}</span> : <span>{`Please ensure age is valid in the form before saving.`}</span>}
                    </DialogContentText>
                </div>

                <DialogActions className='flex flex-row'>
                    <Button className="w-3/12" onClick={() => {
                        setOpen(false);
                    }}>Close</Button>
                </DialogActions>
            </Dialog>}
        </div>)
}