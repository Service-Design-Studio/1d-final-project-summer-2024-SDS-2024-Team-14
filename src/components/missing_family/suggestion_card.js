import "../../styles/globals.css"
import Image from "next/image"
import CardDetails from "./card_details"
import Similarity from "./similarity"
export default function SuggestionCard(props) {
    return (
        <div className="flex flex-col rounded-2xl w-2/12 shadow-lg relative">
            <div className="flex-1 relative">
                <Image
                    src={props.src}
                    width={1}
                    height={1}
                    alt={`${props.name}`}
                    className="flex-1 w-full bg-cover z-0 rounded-t-2xl static"
                />
                <div className="bg-gradient-to-t from-white to-white-25 py-5 bg-blend-multiply z-40 absolute w-full bottom-0">
                    <div className="text-3xl mx-7 font-semibold">{props.name}
                    </div>
                </div>
            </div>
            <CardDetails
                gender={props.gender}
                age={props.age}
                dob={props.dob}
                ethnicity={props.ethnicity}
            />
            <Similarity similarity={props.similarity} />
        </div>)
}