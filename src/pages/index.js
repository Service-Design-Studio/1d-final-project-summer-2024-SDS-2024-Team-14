import Head from 'next/head';
import Homepage from "./homepage/homepage.jsx";
import { useRouter} from 'next/router'
import "../styles/globals.css"
import axios from "axios";
export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col align-middle min-w-minContent min-h-screen my-0 mx-0 bg-white">
      <Homepage />
    </main>
  );
}
