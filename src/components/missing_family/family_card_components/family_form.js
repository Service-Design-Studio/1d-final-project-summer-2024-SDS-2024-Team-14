import "../../../styles/globals.css"
import { Button, Input } from "@mui/material"
import { useState, useEffect } from "react"
import FormField from "./form_field"
import Image from "next/image"
import axiosInstance from "../../../utils/axiosInstance";

export default function FamilyForm(props) {
    const [data, setData] = useState(
        {
            "name": "",
            "gender": "Male",
            "age": "",
            "date_birth": "",
            "ethnicity": ""
        });
    const [photos, setPhotos] = useState();
    const [files, setFiles] = useState(null);

    let onSaveChanges = async () => {
        try {
            await axiosInstance.post("/missing",
                {
                    ...data,
                    "user_id": localStorage.getItem('userID'),

                }).then(resp => {
                    if (resp.status === 200 || resp.status === 201) {
                        localStorage.setItem('notificationMessage', 'You have successfully saved.');
                        localStorage.setItem('status', 'success');
                        if (files) {
                            try {
                                // const blob = base64ToBlob(photos, photos.split(',')[1])
                                // console.log("I went to photos" + files.file);
                                let formData = new FormData();
                                formData.append('id', resp.data.missing_id);
                                formData.append('photo', files, files)
                                axiosInstance.post("/missing/upload", formData)
                            } catch (error) {
                                console.error('Error uploading image', error);
                            }
                        }
                    } else {
                        localStorage.setItem('notificationMessage', 'There was an error in saving, Please retry again later.');
                        localStorage.setItem('status', 'error');
                    }
                })
        } catch (error) {
            console.error(error.message)
        }
        setData({});
        setPhotos();
        setFiles();
        props.setFetch(true);
    }
    //TODO: let user delete missing person entry
    let onDelete = () => {
        axiosInstance.post("",
            {

            }
        );
        setData({});
    }
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
    return (
        <div className="flex flex-col rounded-r-2xl w-full h-full shadow-lg bg-white text-darkblue text-lg font-semibold px-3 overflow-scroll">
            <div className="mt-3 text-2xl">
                <span>Add Missing Person</span>
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
                    {/* {photos.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <Image src={item} width={1} height={1} className="aspect-square object-cover w-28 mx-5 border-darkblue border-2" alt="added photo" />
                                <div
                                    className="underline"
                                    onClick={() => {
                                        setPhotos(prev => {
                                            return prev.filter((item, i) => i != index)
                                        })
                                    }}>
                                    Remove
                                </div>
                            </div>)

                    })} */}
                    {photos ? <div className="flex flex-col items-center">
                        <Image src={photos} width={1} height={1} className="aspect-square object-cover w-28 mx-5 border-darkblue border-2" alt="added photo" />
                        <div
                            className="underline"
                            onClick={() => {
                                // setPhotos(prev => {
                                //     return prev.filter((item, i) => i != index)
                                // })
                                setPhotos()
                            }}>
                            Remove
                        </div>
                    </div> : ""}
                </div>
            </div>

            <FormField title={"Name"} placeholder={"e.g. Abdul Ahmed"} setData={setData} />
            <FormField title={"Gender"} placeholder={"e.g. M/F"} setData={setData} />

            <FormField title={"Age"} placeholder={""} setData={setData} />
            <FormField title={"Date Of Birth"} placeholder={Date.now} setData={setData} />
            <FormField title={"Ethnicity"} placeholder={"e.g. Arab"} setData={setData} />
            {/* <FormField title={"Relationship"} placeholder={"e.g. Brother"} setData={setData} /> */}
            <div className="flex flex-col items-center my-5">
                <div>
                    <Button
                        className="bg-gray text-white w-fit hover:bg-gray hover:bg-opacity-75 text-center my-1 mx-2"
                        onClick={() => {
                            props.setAddNew(false);
                            setData({});
                        }}>
                        Discard Changes
                    </Button>
                    <Button
                        onClick={() => {
                            props.setAddNew(false);
                            onSaveChanges();
                        }}
                        className="bg-darkblue text-white w-fit hover:bg-darkblue hover:bg-opacity-75  text-center my-1 mx-2">
                        <Image width={1} height={1} className="h-0.8 w-auto mr-2 " src={"/images/save_icon.svg"} alt="Save Changes" /> Save Changes
                    </Button>
                </div>

                <Button
                    className="underline text-darkblue my-3"
                    onClick={() => {
                        props.setAddNew(false);
                        onDelete();
                    }}>
                    <Image width={1} height={1} className="h-full w-auto" src={"/images/cross_icon.svg"} alt="Delete All" /> Delete All
                </Button>
            </div>
        </div>)
}