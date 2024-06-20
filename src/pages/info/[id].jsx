import IdCard from "../../components/homepage/id_card";
import PersonalInfo from "../../components/homepage/id_card/personal_info";
import ProfilePic from "../../components/homepage/id_card/profile_pic";
import ExtendedInfo from "./extended_info";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Info() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: res } = await axios.get("https://gebirah-backend-2r6b52gguq-as.a.run.app/users/" + router.query.id);
                setData(res);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    return (
        <div className="id-card">
            <div className="block">
                <div className="flex">
                    <ProfilePic />
                    <PersonalInfo />
                    <h1></h1>
                </div>
            </div>    
            <ExtendedInfo />
        </div>
    )
}