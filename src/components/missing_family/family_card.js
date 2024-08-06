import "../../styles/globals.css";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Button } from "@mui/material"
import axiosInstance from "../,,/../../utils/axiosInstance";
import CardDetails from "./suggestion_card_components/card_details";
export default function FamilyCard(props) {
    const [deletePerson, setDeletePerson] = useState(null)
    //TODO: let user delete missing person entry

    useEffect(() => {
        if (deletePerson != null) {
            axiosInstance.post("/missing/delete",
                {
                    "id": deletePerson
                }
            );
            setDeletePerson(null);
            props.setFetch(true);
            props.setSelected()
        }
    }, [deletePerson])

    return (
        <div className="relative h-full flex flex-col rounded-r-2xl shadow-lg bg-white min-h-fit w-full min-w-fit xl:min-w-[20vw] missing-person-card">
            {props.selectedData && props.selected >= 0 ?
                <div className="flex flex-col w-full">
                    <div className="flex-1 relative w-full">
                        <Image
                            src={props.selectedData.src || "/images/default_profile_pic.svg"}
                            width={1}
                            height={1}
                            alt={`${props.selectedData.name}`}
                            className="w-full 2xl:aspect-square object-cover max-h-[30vw] rounded-tr-2xl static"
                        />

                        <div className="bg-gradient-to-t from-default to-white-15 py-5 bg-blend-multiply z-50 absolute w-full bottom-0 text-white">
                            <div className="text-lg md:text-2xl lg:text-3xl mx-7 line-clamp-2 font-semibold">{props.selectedData.name}
                            </div>
                        </div>
                    </div>
                    <CardDetails
                        gender={props.selectedData.gender}
                        age={props.selectedData.age}
                        dob={props.selectedData["date_birth"]}
                        ethnicity={props.selectedData.ethnicity}
                    // relationship={props.selectedData.relationship}
                    />
                    <div className="w-fit flex flex-row self-end px-10 text-center h-fit p-0 justify-center items-center lg:mt-20">
                        <Button
                            className="edit bg-darkblue hover:bg-darkblue hover:opacity-65 text-white rounded-lg h-fit w-fit items-center"
                            onClick={
                                () => props.setEdit(props.selectedData.id)
                            }
                        >
                            <Image width={1} height={1} className="h-fit min-w-fit w-auto px-3" src={"/images/edit.svg"} alt="Edit Entry" />
                            Edit
                        </Button>
                        <Button
                            className="delete hover:underline-offset-4 hover:underline text-darkblue h-full"
                            onClick={() => {
                                props.setAddNew(false);
                                setDeletePerson(props.selectedData.id);
                            }}>
                            <Image width={1} height={1} className="h-fit w-auto" src={"/images/cross_icon.svg"} alt="Delete Entry" /> Delete
                        </Button>
                        <div className="h-20" />
                    </div>
                </div> :
                <div className="flex flex-col self-center my-auto px-5 text-darkblue font-semibold min-w-fit w-24 lg:w-52 xl:w-96 text-center md:min-h-[500px]">
                    <Image src="/images/graphic_magnifying_glass.svg" width={1} height={1} className="w-full max-w[400px] my-10 opacity-75" alt="" />
                    Select an available entry on the left to view
                </div>}
        </div>
    )
}