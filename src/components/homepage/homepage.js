import Features from "./features.js";
import Loading from "../loading.js"
import IdCard from "./id_card.js";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axiosInstance";
export default function Homepage(props) {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    let userID;
    // Change to dynamic
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            userID = localStorage.getItem("userID")
            try {
                await axiosInstance.get(`/users/${userID}`).then((resp) => {
                    setData(resp.data)
                    }
                );
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
        <div onMouseDown={()=>props.setOpen(false)} className="flex lg:flex-row flex-col justify-center md:my-4 mb-4 px-4 md:px-0 gap-[4vw]">
            {!props.loading && data &&
                <>
                    <IdCard data={data} loading={loading} />
                    <Features id={userID}/>
                </>
            }
            {props.loading && data && <Loading text={"Loading..."} />}
            {!props.loading && !data && <Loading text={"500: Internal Error\nUnable to fetch user data"} />}
        </div>
        </>
    );
}
