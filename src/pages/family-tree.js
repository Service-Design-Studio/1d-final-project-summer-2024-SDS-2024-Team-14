import { useRouter } from "next/router";
import "../styles/globals.css"
import Link from "next/link"
import useAuth from "@/hooks/useAuth";
export default function FamilyTree() {
    const router = useRouter();
    useAuth();
    return (<div className="bg-white w-screen h-screen">
        Placeholder for family tree feature
        <br />User id: {router.query.id}
        <br />
        <Link href={"/"}><span className="underline">back</span></Link>
    </div>)
}