import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContentText, DialogTitle, Button } from "@mui/material"
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
    const [click, setClick] = useState(null);
    const [matchRes, setMatchRes] = useState(null);
    const placeholder = [
        {
            user: {
                name: "testing",
                age: "12",
                gender: "Male",
                src: ""
            }
            , percentage: 80,
        }, {
            user: {
                name: "testing",
                age: "12",
                gender: "Male",
                src: ""
            }
            , percentage: 10,
        },
        {
            user: {
                name: "testing",
                age: "12",
                gender: "Male",
                src: ""
            }
            , percentage: 52,
        },
        {
            user: {
                name: "testing",
                age: "12",
                gender: "Male",
                src: ""
            }
            , percentage: 20,
        }
    ]
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
            } else {
                setData([]);
                setFetch(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    let getMatches = async () => {
        //TODO: fix get match/id in backend
        await axiosInstance.get(`/match/${selectedData["id"]}`).then(res => {
            setMatches(res.data);
        })
        // setMatches(placeholder)
        // if (matches && matches.length > 1 && loadMatches) {
        //     setMatches((prev) => {
        //         prev.sort((i1, i2) => {
        //             return i2["percentage"] - i1["percentage"]
        //         })
        //     })
        // } else {
        //     setMatches([])
        // }
    }
    useEffect(() => {
        // setMatches(placeholder)
        if (selectedData) {
            try {
                getMatches();
            } catch (error) {
                setMatches([]);
            } finally {
                if (matches != null && matches.length > 1) {
                    setMatches((prev) => {
                        prev.sort((i1, i2) => {
                            return i1["percentage"] - i2["percentage"]
                        })
                    })
                } else {
                    setMatches([])
                }
                console.log("matches: ",matches)
                setFetch(false)
            }
        }
    }, [fetch, selectedData])

    useEffect(() => {
        if (fetch) {
            getMissingPersons();
        }
    }, [fetch])

    useEffect(() => {
        if (data && selected < data.length) {
            setSelectedData(data[selected]);
            setFetch(false);
        }
    }, [selected, data])

    let handleMatch = async () => {
        if (selectedData && click) {
            await axiosInstance.post('/match', {
                "user_id": selectedData.id,
                "missing": click
            }).then(res => {
                setClick(null);
                if (res.status == 200 || res.status == 201) {
                    setMatchRes("Match request sent.")
                }
            })
        }
    }
    useAuth();

    const openTutorial = () => {
        setIsTutorialOpen(true);
    };

    const closeTutorial = () => {
        setIsTutorialOpen(false);
    };

    return (
        <div className="bg-white max-w-screen md:px-3 mx-auto min-h-screen bg-cover bg-[url('/images/background/gebirah-bluebg.png')] flex flex-col">
            <NaviBar open={open} setOpen={setOpen} />
            <div className="flex flex-col w-full h-full px-5 md:mt-20">
                <div className="text-darkblue font-semibold lg:text-4xl md:text-3xl text-2xl">
                    Missing Family & Friends
                </div>
                <div className="md:my-2 text-lg md:text-2xl my-4">
                    Add more pictures using the plus button to improve matches.<br />
                    Click on the swap button to swap the missing family member
                </div>
                <div className="flex flex-col 2xl:flex-row max-w-screen md:mt-20 min-h-fit md:h-full ">
                    {/* form and list of entries, for larger screens */}
                    <div className="flex flex-row 2xl:w-[35%] min-w-fit w-[100%] xl:mb-0 mb-10">
                        <SideList
                            selected={selected}
                            setSelected={setSelected}
                            data={data}
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

                    {/* section for potential matches */}
                    <PotentialMatches
                        selected={selected}
                        matches={matches}
                        setClick={setClick}
                    />
                </div>
            </div>
            <ChatBot />
            {click ?
                <Dialog
                    open={click && click >= 0}
                    onClose={() => setClick(null)}
                    fullWidth={true}
                >
                    <div className='mx-4 flex flex-col text-start items-start'>
                        <DialogTitle>Send Match Request?</DialogTitle>
                        <DialogContentText>
                            <span>{`Send '${matches[click].user.name}' a match request?`}</span>
                        </DialogContentText>
                    </div>

                    <DialogActions className='flex flex-row'>
                        <Button className="w-3/12" onClick={() => {
                            setOpen(false);
                            setClick(null);
                        }}>Close</Button>
                        <Button className="w-3/12 bg-darkblue text-white hover:text-white hover:bg-darkblue" onClick={() => {
                            setOpen(false);
                            handleMatch(click);
                        }}>Yes</Button>
                    </DialogActions>
                </Dialog>
                : null}
            {matchRes && 
                <Dialog
                    open={matchRes != null}
                    onClose={() => setMatchRes(null)}
                    fullWidth={true}
                >
                    <div className='mx-4 flex flex-col text-start items-start'>
                        <DialogTitle>Alert</DialogTitle>
                        <DialogContentText>
                            <span>{`${matchRes}`}</span>
                        </DialogContentText>
                    </div>

                    <DialogActions className='flex flex-row'>
                        <Button className="w-3/12" onClick={() => {
                            setMatchRes(null);
                        }}>Close</Button>
                    </DialogActions>
                </Dialog>
            }
        </div>)
}
