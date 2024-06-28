import IdCard from "../../components/homepage/id_card";
import PersonalInfo from "../../components/homepage/id_card/personal_info";
import ProfilePic from "../../components/homepage/id_card/profile_pic";
import Loading from "@/components/loading"
import ExtendedInfo from "@/components/extended_info"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/globals.css"
import Link from "next/link";

export default function Info() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_URL,
        withCredentials: true,
    });
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("test:",router.query.id)
                const { data: res } = await axiosInstance.get("/users/" + router.query.id);
                setData(res);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, data);
    return (
        <div className="bg-white w-screen h-screen text-center">
            {console.log("get data:", data)}
            <br />
            <Link href={"/"}><span className="underline">back</span></Link>
            {!loading && data && <div className="id-card">
                <div className="block">
                    <div className="flex">
                        <ProfilePic />
                        <PersonalInfo
                            userName={data.name}
                            sex={data.gender}
                            status={data.verification_status}
                            issuedDate={"no column"}
                            expiryDate={"no column"}
                            idNo={ `000-000-00000${data.id}`}
                            dob={data.date_birth}
                            country={data.country}
                        />
                        <h1></h1>
                    </div>
                </div>
                <ExtendedInfo />
            </div>}
            {loading && data && <Loading text={"Loading..."} />}
            {!loading && !data && <Loading text={"500: Internal Error\nUnable to fetch user data"} />}
        </div>
    )
}