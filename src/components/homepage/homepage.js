import Features from "./features.js";
import HomeHeader from "./home_header.js"
import Loading from "../loading.js"
import IdCard from "./id_card.js";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from "axios";
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
        <div className="flex flex-col  px-5 items-center">
            {!props.loading && data && <div><HomeHeader text={"Home"} />
                <IdCard data={data} loading={loading} />
                <Features id={userID}/></div>}
            {props.loading && data && <Loading text={"Loading..."} />}
            {!props.loading && !data && <Loading text={"500: Internal Error\nUnable to fetch user data"} />}
        </div>);
}
