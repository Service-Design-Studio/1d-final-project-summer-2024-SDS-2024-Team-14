import { useRouter } from "next/router";
import "../styles/globals.css"
import Link from "next/link"
import useAuth from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
import SuggestionCard from "@/components/missing_family/suggestion_card";
export default function FamilyTree() {
    const router = useRouter();
    useAuth();
    return (<div className="bg-white w-screen h-screen">
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
        <ChatBot/>
    </div>)
}