import Features from "./features.jsx";
import HomeHeader from "./home_header.jsx"
import Loading from "../../components/loading.jsx"
import IdCard from "./id_card.jsx";
import { useEffect, useState } from 'react';
import axios from "axios";
export default function Homepage(props) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: res } = await axios.get("https://gebirah-backend-2r6b52gguq-as.a.run.app/users/1");
                setData(res);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col  px-5 w-90 items-center">
            {!props.loading && data && <div><HomeHeader text={"Home"} />
                <IdCard data={data} loading={loading} />
                <Features /></div>}
            {props.loading && data && <Loading text={"Loading..."} />}
            {!props.loading && !data && <Loading text={"500: Internal Error\nUnable to fetch user data"} />}
        </div>);
}
