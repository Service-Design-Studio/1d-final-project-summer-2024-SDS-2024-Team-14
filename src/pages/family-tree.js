import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NaviBar from "@/components/NaviBar";
import Tutorial from "@/components/Tutorial"; // Import the Tutorial component
import "../styles/globals.css";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
import FamilyCard from "@/components/missing_family/family_card";
import SideList from "@/components/missing_family/family_card_components/side_list";
import FamilyForm from "@/components/missing_family/family_card_components/family_form";
import PotentialMatches from "@/components/missing_family/potential_matches";
import famTreeTutorialContent from "@/components/modalContent/famtree"; // Import the tutorial content

export default function FamilyTree() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [addNew, setAddNew] = useState(false);
    const [isTutorialOpen, setIsTutorialOpen] = useState(false); // State to control the tutorial modal

    const placeholderData = [
        {
            "name": "Abdul Ahmed",
            "gender": "M",
            "age": "12",
            "dob": "12 Jun 2012",
            "ethnicity": "Arab",
            "relationship": "Brother",
            "src": "/images/family_member_placeholder.png"
        },
        {
            "name": "Anita Bin Fatima",
            "gender": "F",
            "age": "5",
            "dob": "23 April 1999",
            "ethnicity": "Malay",
            "relationship": "Father",
            "src": "/images/family_member_placeholder.png"
        },
        {
            "name": "John Sinclair",
            "gender": "F",
            "age": "69",
            "dob": "12 Dec 1912",
            "ethnicity": "Chinese",
            "relationship": "Mother",
            "src": "/images/family_member_placeholder.png"
        },
        // Add more placeholder data as needed
    ];

    useEffect(() => {
        setData(placeholderData);
    }, []);

    useEffect(() => {
        setSelectedData(placeholderData[selected]);
    }, [selected]);

    useAuth();

    const openTutorial = () => {
        setIsTutorialOpen(true);
    };

    const closeTutorial = () => {
        setIsTutorialOpen(false);
    };

    return (
        <div className="bg-white w-screen px-20 min-h-screen bg-cover bg-[url('/images/background/gebirah-bluebg.png')] flex flex-col">
            <NaviBar open={open} setOpen={setOpen} />
            <div className="flex flex-col w-full h-full ml-10 md:mt-20">
                <div className="text-darkblue font-semibold sm:text-[3.5vw] md:text-[2.3vw] text-[6.5vw]">
                    Missing Family & Friends
                </div>
                <div className="md:my-2 text-[4vw] md:text-[1.5vw] my-4">
                    Add more pictures using the plus button to improve matches.<br />
                    Click on the swap button to swap the missing family member
                </div>
                <div className="flex flex-row w-full md:mt-20">
                    <div className="flex flex-row h-[26vw]">
                        <SideList
                            selected={selected}
                            setSelected={setSelected}
                            data={data}
                            addNew={addNew}
                            setAddNew={setAddNew}
                        />
                        {addNew && <FamilyForm setAddNew={setAddNew} />}
                        {!addNew && <FamilyCard setAddNew={setAddNew} selectedData={selectedData} />}
                    </div>
                    <PotentialMatches />
                </div>
            </div>
            <ChatBot />
            {/* Conditionally render the Tutorial modal */}
            {isTutorialOpen && (
                <Tutorial title="Family Tree Tutorial" steps={famtreeTutorialContent} onClose={closeTutorial} />
            )}
        </div>
    );
}
