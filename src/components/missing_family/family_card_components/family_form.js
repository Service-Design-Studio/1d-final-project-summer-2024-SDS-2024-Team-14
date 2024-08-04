import "../../../styles/globals.css"
import { Button } from "@mui/material"
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
    const [photos, setPhotos] = useState([])

    let onSaveChanges = () => {
        axiosInstance.post("/missing",
            {

                ...data,
                "user_id": localStorage.getItem('userID'),

            }).then(resp => {
                if (resp.status === 200 || resp.status === 201) {
                    localStorage.setItem('notificationMessage', 'You have successfully saved.');
                    localStorage.setItem('status', 'success');
                } else {
                    localStorage.setItem('notificationMessage', 'There was an error in saving, Please retry again later.');
                    localStorage.setItem('status', 'error');
                }
            });
        setData({});
        props.setFetch(true);
    }
    let onDelete = () => {
        axiosInstance.post("",
            {

            }
        );
        setData({});
    }
    return (
        <div className="flex flex-col rounded-r-2xl w-full h-full shadow-lg bg-white text-darkblue text-lg font-semibold px-3 overflow-scroll">
            <div className="mt-3 text-2xl">
                <span>Add Missing Person</span>
            </div>
            <div className="mt-1 w-full">
                <div className="flex flex-row w-full">
                    <span className="w-fit">Photos</span>
                    <Button className="w-fit bg-darkblue text-white hover:bg-darkblue hover:opacity-75 self-end mx-3">Add Photo</Button>
                </div>
                <div className="w-full overflow-x-scroll">
                    {photos.map((item, index) => {
                        <Image src={item} width={10} height={10} className="aspect-square object-cover" alt="added photo" />
                    })}
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