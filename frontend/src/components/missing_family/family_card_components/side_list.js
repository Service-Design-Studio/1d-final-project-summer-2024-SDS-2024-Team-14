import "../../../styles/globals.css"
import { Button, Divider } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
export default function SideList(props) {
    return (
        <div className="flex flex-col min-w-fit md:min-w-52 rounded-l-2xl min-h-full bg-white shadow-lg md:max-w-72">
            <div onClick={() => props.setAddNew(true)} className={`add_new md:flex md:flex-row w-fit md:w-[80%] p-2 h-auto bg-darkblue md:mx-5 mx-1 max-h-14 text-white font-semibold text-lg rounded-xl my-8 md:py-3 self-center items-center hover:bg-darkblue hover:opacity-85 ${props.addNew ? "pointer-events-none bg-disabled" : ""}`}>
                <Image className="w-fit h-auto max-w-32 md:mr-3 my-auto" width="100" height="100" alt="add family member" src="/images/plus.svg" />
                <span className="line-clamp-1 hidden w-0 md:inline md:w-fit">Add New</span>
            </div>
            <div className="overflow-y-scroll">
                {
                    props.data.map((data, idx) => {
                        return <div
                            key={`${idx}`}
                            className={`missing-person-entry w-full min-h-fit flex flex-col text-darkblue font-semibold text-xl justify-center py-3 border-t border-lightgray ${props.selected == idx ? "pointer-events-none bg-darkblue text-white" : "hover:bg-darkblue hover:bg-opacity-65 hover:text-white"}`}
                            onClick={() => {
                                props.setSelected(idx);
                                props.setSelectedMissing(data);
                                props.setAddNew(false);
                                props.setEdit(null);
                            }}
                        >
                            <div className="flex flex-row w-full">
                                <div className="aspect-square md:w-[20%] w-[50%] max-w-14 self-center md:mr-5">
                                    {data.src ?
                                        <Image
                                            key={`${idx}`}
                                            className="w-full object-cover aspect-square rounded-full mx-3"
                                            src={`${data.src}?${new Date().getTime()}`}
                                            width={300} height={300}
                                            alt="entry image" />
                                        :
                                        <Image
                                            key={`${idx}`}
                                            className="w-full object-cover aspect-square rounded-full mx-3"
                                            src={"/images/default_profile_pic.svg"}
                                            width={10} height={10}
                                            alt="entry image" />
                                    }
                                </div>
                                <span className="line-clamp-1 my-auto overflow-ellipsis md:inline w-0 md:max-w-64 md:w-[80%] hidden">
                                    <div className="line-clamp-1">{data.name}</div>
                                </span>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}