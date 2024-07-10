import {Component, useState} from "react";
import Image from "next/image";
import tickIcon from "../../../public/images/tick_icon.svg"
import crossIcon from "../../../public/images/cross_icon.svg"
import exclamationIcon from "../../../public/images/exclamation_icon.svg"
import accordionButton from "../../../public/images/accordion_button.svg"
import Listing from "@/components/document_manager/dm_listing";

export default function Accordion(props){
    const [accordionOpen, setAccordionOpen] = useState(false);
    const handleAccordion = () => {
        setAccordionOpen(!accordionOpen)
    }
    const data = props.documents;
    return (
        <>
        <div className='bg-darkblue w-[95%] mx-auto'>
            <div className='py-4 flex flex-row items-center'>
                <div className="ml-4 md:w-[3vw] w-[2vw]">
                    {props.title === "Approved Documents" &&
                        <Image src={tickIcon} layout='responsive' alt="Tick Icon"/>
                    }
                    {props.title === "Pending Documents" &&
                        <Image src={exclamationIcon} layout='responsive' alt="Exclamation Icon"/>
                    }
                    {props.title === "Rejected Documents" &&
                        <Image src={crossIcon} layout='responsive' alt="Cross Icon"/>
                    }
                </div>
                <h1 className='ml-6 text-white font-bold md:text-[2vw] text-[3vw]'>
                    {props.title}
                </h1>
                <div className={`w-[2vw] ml-auto mr-8 ${accordionOpen ? 'rotate-180': ''}`}>
                    <Image src={accordionButton} layout="responsive" onClick={handleAccordion} alt="Accordion dropdown"/>
                </div>
            </div>
        </div>
        <div className={`w-[95%] mx-auto ${accordionOpen ? 'opacity-100 pb-4' : 'opacity-0'}`}>
                    {accordionOpen && data.length > 0 ? (
                data.map((document) => (
                  <Listing url={document.file_url} title={document.name}/>
                ))
              ) : (
                <p className={`text-center text-black font-bold text-[1.5vw] ${accordionOpen ? 'opacity-100 mt-10 mb-6' : 'opacity-0'}`}>No documents available</p>
              )}
        </div>
        </>
    )
}
