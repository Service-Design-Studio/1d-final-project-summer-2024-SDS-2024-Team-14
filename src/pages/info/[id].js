
import PersonalInfo from "../../components/homepage/id_card/personal_info";
import ProfilePic from "../../components/homepage/id_card/profile_pic";
import Loading from "../../components/loading"
import ExtendedInfo from "../../components/extended_info"
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import "../../styles/globals.css"
import Link from "next/link";
import axiosInstance from "../../utils/axiosInstance";
import Image from "next/image";
import EnableId from "../../../public/images/enable_id_logo.svg"
import download from "../../../public/images/id_card/download.svg"
import vector from "../../../public/images/id_card/vector.png"
import DownloadIndiv from "../../../public/images/id_card/downloadindiv.svg"


export default function Info() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const categories = [
        {name:"Education", index: 0},
        {name:"Health", index:1}, 
        {name:"Property", index:2},
        {name:"Family", index:3}]

    const tabsRef = useRef([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  
    useEffect(() => {
      if (activeTabIndex === null) {
        return;
      }
  
      const setTabPosition = () => {
        const currentTab = tabsRef.current[activeTabIndex];
        if (currentTab) {
          setTabUnderlineLeft(currentTab.offsetLeft);
          setTabUnderlineWidth(currentTab.clientWidth);
        }
      };
  
      setTabPosition();
    }, [activeTabIndex]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: res } = await axiosInstance.get("/users/" + router.query.id);
                setData(res);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, data);

    return (
        <div className="bg-local bg-[url('../../public/images/background/gebirah-bluebg.png')] w-screen h-screen text-center md:px-[12vw] px-[2vw]">
            <div className="flex items-center pt-4 ml-4">
                <Image src={EnableId} alt="Logo" className="w-8 h-8 mr-2 inline-block" />
                <span className="font-bold md:text-2xl text-[4.5vw] text-[#405DB5]">Enable ID</span>
            </div>
                <br/>
                <div className="flex flex-col md:flex-row justify-center overflow-hidden">
                    <div className="flex flex-col md:w-[24vw]">
                        {!loading && data && <div className="id-card">
                            <div className="block">
                                <div className="flex flex-row">
                                    <ProfilePic/>
                                    <div className="flex flex-col">
                                        <div className="text-left px-10">
                                            <div className="font-bold uppercase text-lg md:text-2xl text-darkblue">{data.name}</div>
                                            <div className="font-semibold text-base md:text-lg text-darkblue">000-000-00000{data.id}</div>
                                        </div>
                                        <PersonalInfo
                                            sex={data.gender}
                                            status={data.verification_status}
                                            issuedDate={"no column"}
                                            expiryDate={"no column"}
                                            idNo={ `000-000-00000${data.id}`}
                                            dob={data.date_birth}
                                            country={data.country}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="py-10 w-full">
                            <div className="flex flex-row items-center justify-center bg-darkblue text-white text-bold md:text-lg py-2 rounded-lg ">
                                Download All
                                <div className="px-2">
                                    <Image className='items-center lg:w-[1vw] w-[4vw]' src={download}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex hidden md:justify-center md:flex">
                            <Image src={vector}></Image>
                        </div>
                    </div>
                    <div className="flex flex-col w-[50vw] ml-[5vw] overflow-hidden">
                        <div className="flex flex-row rounded-t-lg bg-[#E7E7E7] backdrop-blur-sm">
                            <span
                                className="absolute bottom-0 top-0 -z-10 flex overflow-hidden transition-all duration-300"
                                style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
                            >
                                <span className="h-full w-full rounded-t-lg bg-darkblue" />
                            </span>
                            {categories.map((category, index)=> {
                                const isActive = activeTabIndex === index;
                                return(
                                    <div 
                                        className={`flex-grow font-bold py-1 rounded-t-lg text-[1.5vw] text-[#939393] shadow-xl"
                                            ${isActive ? 'text-white shadow-lg':'text-[#939393] shadow-md'}`}
                                        style={{ marginRight: isActive ? '0' : '4px' }}
                                        key={index} 
                                        ref={(el) => (tabsRef.current[index] = el)}
                                        onClick={() => setActiveTabIndex(index)}
                                    >
                                        {category.name}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="bg-white w-full px-[2vw] rounded-b-lg">
                            <div className="flex flex-row justify-between">
                                <h1 className="text-darkblue text-[1.4vw] py-[1vw] inline-block font-bold">Document title</h1>
                                <Image className='w-[2vw] py-[1vw]' src={DownloadIndiv}></Image>
                            </div>
                        </div>
                    </div>
            </div>
            {loading && data && <Loading text={"Loading..."} />}
            {!loading && !data && <Loading text={"500: Internal Error\nUnable to fetch user data"} />}
        </div>
    
    )
}
