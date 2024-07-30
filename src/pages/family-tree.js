import { useRouter } from "next/router";
import { useState } from "react";
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
            <NaviBar open={open} setOpen={setOpen} />
            <div className="flex flex-col w-full h-full ml-10 md:mt-20">
                <div className="text-darkblue font-semibold sm:text-[3.5vw] md:text-[2.3vw] text-[6.5vw]">
                    Missing Family & Friends
                </div>
                <div className="md:my-2 text-[4vw] md:text-[1.5vw] my-4">
                    Add more pictures using the plus button to improve matches.<br/>
                    Click on the swap button to swap the missing family member
                </div>
                <div className="flex flex-row w-full md:mt-20">
                    <FamilyCard
                        src={"/images/family_member_placeholder.png"}
                        name={"Abdul Ahmed"}
                        gender={"M"}
                        age={"12"}
                        dob={"14 Jun 2000"}
                        ethnicity={"Arab"}
                        relationship={"Brother"}
                    />
                    <div className="flex flex-col mx-10">
                        <div className="flex-1">
                            <span className="text-darkblue text-2xl font-semibold">
                                Potential Matches
                            </span>
                            <p className="text-lg">
                                Swipe right to explore more matches
                            </p>
                        </div>
                        <div className="flex-1">
                            <SuggestionCard
                                src={"/images/family_member_placeholder.png"}
                                name={"Abdul Ahmed"}
                                gender={"M"}
                                age={"12"}
                                dob={"14 Jun 2000"}
                                ethnicity={"Arab"}
                                similarity={83}
                            />
                        </div>

                    </div>

                </div>
            </div>



            <ChatBot />
        </div>)
}