import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NaviBar from "@/components/NaviBar";
import "../styles/globals.css"
import Link from "next/link"
import useAuth from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
import FamilyCard from "@/components/missing_family/family_card";
import SideList from "@/components/missing_family/family_card_components/side_list";
import FamilyForm from "@/components/missing_family/family_card_components/family_form";
import PotentialMatches from "@/components/missing_family/potential_matches";
export default function FamilyTree() {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState();
    const [data, setData] = useState([])
    const [selectedData, setSelectedData] = useState();
    const [addNew, setAddNew] = useState(false)
    const placeholderData = [
        {
            "name": "Abdul Ahmed",
            "gender": "M",
            "age": "12",
            "Date Of Birth": "12 Jun 2012",
            "ethnicity": "Arab",
            "relationship": "Brother",
            "src": "/images/family_member_placeholder.png"
        }, {
            "name": "Anita Bin Fatima",
            "gender": "F",
            "age": "5",
            "Date Of Birth": "23 April 1999",
            "ethnicity": "Malay",
            "relationship": "Father",
            "src": "/images/family_member_placeholder.png"
        }, {
            "name": "John Sinclair",
            "gender": "F",
            "age": "69",
            "Date Of Birth": "12 Dec 1912",
            "ethnicity": "Chinese",
            "relationship": "Mother",
            "src": "/images/family_member_placeholder.png"
        },
        {
            "name": "Abdul Ahmed",
            "gender": "M",
            "age": "12",
            "Date Of Birth": "12 Jun 2012",
            "ethnicity": "Arab",
            "relationship": "Brother",
            "src": "/images/family_member_placeholder.png"
        }, {
            "name": "Anita Bin Fatima",
            "gender": "F",
            "age": "5",
            "Date Of Birth": "23 April 1999",
            "ethnicity": "Malay",
            "relationship": "Father",
            "src": "/images/family_member_placeholder.png"
        }, {
            "name": "John Sinclair",
            "gender": "F",
            "age": "69",
            "Date Of Birth": "12 Dec 1912",
            "ethnicity": "Chinese",
            "relationship": "Mother",
            "src": "/images/family_member_placeholder.png"
        }, {
            "name": "Abdul Ahmed",
            "gender": "M",
            "age": "12",
            "Date Of Birth": "12 Jun 2012",
            "ethnicity": "Arab",
            "relationship": "Brother",
            "src": "/images/family_member_placeholder.png"
        }, {
            "name": "Anita Bin Fatima",
            "gender": "F",
            "age": "5",
            "Date Of Birth": "23 April 1999",
            "ethnicity": "Malay",
            "relationship": "Father",
            "src": "/images/family_member_placeholder.png"
        }, {
            "name": "John Sinclair",
            "gender": "F",
            "age": "69",
            "Date Of Birth": "12 Dec 1912",
            "ethnicity": "Chinese",
            "relationship": "Mother",
            "src": "/images/family_member_placeholder.png"
        }
    ]

    useEffect(() => {
        setData(placeholderData)
    }, [])
    useEffect(() => {
        setSelectedData(placeholderData[selected])
    }, [selected])

    useAuth();
    return (
        <div className="bg-white max-w-screen px-10 mx-auto md:px-20 min-h-screen bg-cover bg-[url('/images/background/gebirah-bluebg.png')] flex flex-col">
            <NaviBar open={open} setOpen={setOpen} />
            <div className="flex flex-col w-full h-full md:ml-10 md:mt-20">
                <div className="text-darkblue font-semibold lg:text-4xl md:text-3xl text-2xl">
                    Missing Family & Friends
                </div>
                <div className="md:my-2 text-lg md:text-2xl my-4">
                    Add more pictures using the plus button to improve matches.<br />
                    Click on the swap button to swap the missing family member
                </div>
                <div className="flex flex-col xl:flex-row w-full md:mt-20">
                    <div className="flex flex-row lg:h-[50vh] h-[500px] xl:max-h-fit w-full  xl:mb-0 mb-10 overflow-y-scroll">
                        <SideList
                            selected={selected}
                            setSelected={setSelected}
                            data={data}
                            addNew={addNew}
                            setAddNew={setAddNew}
                        />
                        {addNew && <FamilyForm
                            setAddNew={setAddNew}
                        />}
                        {!addNew &&
                            <FamilyCard
                                setAddNew={setAddNew}
                                selectedData={selectedData}
                            />}
                    </div>

                    <PotentialMatches />

                </div>
            </div>
            <ChatBot />
        </div>)
}