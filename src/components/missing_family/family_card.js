import "../../styles/globals.css"
import Image from "next/image"
import CardDetails from "./suggestion_card_components/card_details"
export default function FamilyCard(props) {
    return (
        <div className="flex flex-col rounded-2xl w-[30vw] max-w-96 h-fit shadow-lg relative bg-white">
            <div className="text-2mdd md:text-2xl lg:text-3xl font-semibold text-darkblue line-clamp-2 overflow-ellipsis mx-auto">{props.name}</div>
            <div className="w-fit mx-auto my-3"><Image className="w-[25vw] h-[25vw] lg:w-80 lg:h-80 overflow-clip rounded-full" src={props.src} width={1} height={1} alt={`${props.name}`} /></div>
            <CardDetails
                gender={props.gender}
                age={props.age}
                dob={props.dob}
                ethnicity={props.ethnicity}
                relationship={props.relationship}
            />
        </div>
    )
}