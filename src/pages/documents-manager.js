import { useRouter } from "next/router"
import Document from "../components/homepage/document_manager";
import "../styles/globals.css"
import Link from "next/link"
export default function DocumentsManager() {
    const router = useRouter();
    return (<div className="bg-white w-screen h-screen">
        Placeholder for documents manager feature
        <br />User id: {router.query.id}
        <br/>
        <Link href={"/"}><span className="underline">back</span></Link>
        <Document/>
    </div>)
}