import "../../styles/globals.css"
import Image from "next/image"
import CardDetails from "./suggestion_card_components/card_details"
export default function FamilyCard(props) {
    return (
        
        <div className="relative flex flex-col rounded-r-2xl w-[30vw] h-full max-w-96 shadow-lg bg-white">
            {props.selectedData ? <div><div className="flex-1 relative overflow-ellipsis">
                <Image
                    unoptimized
                    src={props.selectedData.src}
                    width={1}
                    height={1}
                    alt={`${props.selectedData.name}`}
                    className="flex-1 min-w-full aspect-square object-cover rounded-tr-2xl static"
                />
                <div className="bg-gradient-to-t from-default to-white-15 py-5 bg-blend-multiply z-50 absolute w-full bottom-0 text-white">
                    <div className="text-lg md:text-2xl lg:text-3xl mx-7 line-clamp-2 font-semibold">{props.selectedData.name}
                    </div>
                </div>
            </div>
            <CardDetails
                gender={props.selectedData.gender}
                age={props.selectedData.age}
                dob={props.selectedData.dob}
                ethnicity={props.selectedData.ethnicity}
                relationship={props.selectedData.relationship}
                /> </div> :
                <div className="self-center my-auto text-darkblue font-semibold">
                    <Image src="/images/graphic_magnifying_glass.svg" width={1} height={ 1}  className="w-[80%] my-10 opacity-75 mx-auto" alt=""/>
                    Select an available entry on the left to view
                </div>}
            
        </div>
    )
}