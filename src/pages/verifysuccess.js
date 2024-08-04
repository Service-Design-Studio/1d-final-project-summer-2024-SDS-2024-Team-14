import { useRouter } from "next/router";
import "../styles/globals.css"
import Link from "next/link"
import useAuth from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
export default function Resources() {
    useAuth();
    const router = useRouter()
    return (<div className="bg-white w-screen h-screen">
        Placeholder for Verify success page
        <br />User id: {router.query.id}
        <br />
        <Link href={"/"}><span className="underline">back</span></Link>
        <ChatBot/>
    </div>)
}