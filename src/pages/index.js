import Head from 'next/head';
import Homepage from "./homepage/homepage.jsx";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import "../styles/globals.css"
import axios from "axios";
import Loading from '../components/loading.jsx';

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: res } = await axios.get("https://gebirah-backend-2r6b52gguq-as.a.run.app/users/1");
        setData(res);
        console.log("console logging: ", res);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
  fetchData();
  }, []);

  return (
    <main className="flex flex-col align-middle min-w-minContent min-h-screen my-0 mx-0 bg-white transition-all-500">
      {loading && <Loading/> }
      {!loading && <Homepage />}
    </main>
  );
}
