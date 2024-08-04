import "../../../styles/globals.css"
import { Button, Divider } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
export default function SideList(props) {
    return (
        <div className="flex flex-col max-w-40 md:max-w-72 rounded-l-2xl bg-white shadow-lg">
            <Button onClick={() => props.setAddNew(true)} className={`flex flex-row bg-darkblue mx-1 lg:mx-5 h-16 text-white font-semibold text-lg rounded-xl my-8 hover:bg-darkblue hover:opacity-85 ${props.addNew ? "pointer-events-none bg-disabled" : ""}`}>
                <Image className="w-auto mr-3" width="100" height="100" alt="add family member" src="/images/plus.svg" />
                <span className="line-clamp-1">Add New</span>
            </Button>
            <div className="overflow-scroll">
                {
                    props.data.map((data, idx) => {
                        return <div key={idx}
                            className={` w-full h-fit flex flex-col text-darkblue font-semibold text-xl justify-center py-3 border-t border-lightgray ${props.selected == idx ? "pointer-events-none bg-darkblue text-white" : "hover:bg-darkblue hover:bg-opacity-65 hover:text-white"}`}
                            onClick={() => {
                                props.setSelected(idx)
                            }}
                        >
                            <div>
                                <div className="flex flex-row">
                                    <Image
                                        unoptimized
                                        className=" w-[20%] object-cover aspect-square rounded-full mx-3"
                                        src={data.src ? data.src[0] : "/images/default_profile_pic.svg"}
                                        width={10} height={10}
                                        alt="entry image" />
                                    <span className="flex-1 line-clamp-2 my-auto">{data.name}</span>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}