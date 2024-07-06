import { useRouter } from "next/router";
import "../styles/globals.css"
import Link from "next/link"
import "../hooks/useAuth"
import useAuth from "@/hooks/useAuth";
export default function Faq() {
    useAuth();
    const router = useRouter();
    return (<div className="bg-white w-screen h-screen">
        Placeholder for FAQ Chatbot feature
        <br />User id: {router.query.id}
        <br />
        <Link href={"/"}><span className="underline">back</span></Link>
    </div>)
}