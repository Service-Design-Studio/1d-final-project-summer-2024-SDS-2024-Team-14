import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NaviBar from "@/components/NaviBar";
import "../styles/globals.css"
import axiosInstance from "../utils/axiosInstance";
import useAuth from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";
import FamilyCard from "@/components/missing_family/family_card";
import SideList from "@/components/missing_family/family_card_components/side_list";
import FamilyForm from "@/components/missing_family/family_card_components/family_form";
import PotentialMatches from "@/components/missing_family/potential_matches";
import EditForm from "@/components/missing_family/family_card_components/edit_form";
import Tutorial from "@/components/Tutorial"; // Import the Tutorial component
import famTreeTutorialContent from "@/components/modalContent/famtree"; // Import the tutorial content

export default function FamilyTree() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();
    const [data, setData] = useState([]);
    const [fetch, setFetch] = useState(true);
    const [selectedData, setSelectedData] = useState();
    const [matches, setMatches] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [edit, setEdit] = useState(null);
    const [isTutorialOpen, setIsTutorialOpen] = useState(false); // State to control the tutorial modal

    let getMissingPersons = async () => {
        let userID = localStorage.getItem("userID");
        try {
            const resp = await axiosInstance.get(`/missing/${userID}`);
            if (resp.data.length > 0) {
                const updatedEntries = await Promise.all(
                    resp.data.map(async (entry) => {
                        await axiosInstance.get(`/missing/photo/${entry.id}`).then(async res => {
                            entry["src"] = res.data.photo_url;
                        });
                        return entry;
                    })
                );
                setData(updatedEntries);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getMissingPersons();
        setFetch(false);
        if (selectedData) {
            try {
                //TODO: fix get match/id in backend
                // axiosInstance.get(`/match/${selectedData["id"]}`).then(res => {
                //     setMatches(res.data);
                // })

            } catch (error) {
                setMatches([]);
            } finally {
                if (matches && matches.length > 1) {
                    setMatches((prev) => {
                        prev.sort((i1, i2) => {
                            return i2["percentage"] - i1["percentage"];
                        });
                    });
                } else {
                    setMatches([]);
                }
            }
        }
    }, [fetch]);

    useEffect(() => {
        if (data && selected < data.length) {
            setSelectedData(data[selected]);
        }
    }, [selected, data])

    useEffect(() => {

    }, [selectedData])

    useAuth();

    const openTutorial = () => {
        setIsTutorialOpen(true);
    };

    const closeTutorial = () => {
        setIsTutorialOpen(false);
    };

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
                    <div className="flex flex-row lg:h-[53vh] h-[500px] xl:max-h-fit w-full xl:mb-0 mb-10 overflow-y-scroll">
                        <SideList
                            selected={selected}
                            setSelected={setSelected}
                            data={data}
                            setData={setData}
                            addNew={addNew}
                            setEdit={setEdit}
                            setAddNew={setAddNew}
                        />
                        {addNew && !edit && <FamilyForm
                            setAddNew={setAddNew}
                            setFetch={setFetch}
                            setSelected={setSelected}
                            numberOfEntries={data ? data.length : 0}
                        />}
                        {!addNew && !edit &&
                            <FamilyCard
                                setAddNew={setAddNew}
                                selectedData={selectedData}
                                setFetch={setFetch}
                                setSelected={setSelected}
                                selected={selected}
                                setEdit={setEdit}
                            />}
                        {edit && edit >= 0 && <EditForm
                            setFetch={setFetch}
                            setEdit={setEdit}
                            selectedData={selectedData}
                        />}
                    </div>
                    <PotentialMatches
                        selected={selected}
                        matches={matches}
                    />
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
