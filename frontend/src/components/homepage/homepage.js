import Features from "./features.js";
import Loading from "../loading.js"
import IdCard from "./id_card.js";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axiosInstance";
export default function Homepage(props) {

    return (
        <>
            <div onMouseDown={() => props.setOpen(false)}
                 className="flex lg:flex-row flex-col justify-around md:my-4 md:mb-4 mb-10 mx-[3vw] md:px-0">
                <>
                    <IdCard data={props.data}/>
                    <Features id={props.userID}/>
                </>
            </div>
        </>
    );
}
