import { useRouter } from "next/router";
import {useState } from "react";
import NaviBar from "@/components/NaviBar";
import "../styles/globals.css"
import Link from "next/link"
import useAuth from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
import SuggestionCard from "@/components/missing_family/suggestion_card";
import FamilyCard from "@/components/missing_family/family_card";
export default function FamilyTree() {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    useAuth();
    return (
        <div className="bg-white w-screen h-screen bg-cover bg-[url('/images/background/gebirah-bluebg.png')]">
        <NaviBar open={ open} setOpen={setOpen} />
        Placeholder for family tree feature
        <br />User id: {router.query.id}
        <br />
        <Link href={"/"}><span className="underline">back</span></Link>
        <SuggestionCard
            src={"/images/avatar_placeholder.png"}
            name={"Abdul Ahmed"}
            gender={"M"}
            age={"12"}
            dob={"14 Jun 2000"}
            ethnicity={"Arab"}
            similarity={ 95}
        />
        <br></br>
        <FamilyCard
            src={"/images/avatar_placeholder.png"}
            name={"Abdul Ahmed"}
            gender={"M"}
            age={"12"}
            dob={"14 Jun 2000"}
            ethnicity={"Arab"}
            relationship={"Brother"}
        />
        <ChatBot/>
    </div>)
}