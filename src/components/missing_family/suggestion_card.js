
import "../../styles/globals.css";
import Image from "next/image";
import CardDetails from "./suggestion_card_components/card_details";
import Similarity from "./suggestion_card_components/similarity";
export default function SuggestionCard(props) {
    return (
        <div
            className="flex flex-col rounded-2xl md:min-w-96 h-fit shadow-lg relative bg-white my-10 md:my-20 md:mr-14 mr-11"
            onClick={() => {
                props.setClick(props.index);
            }}
        >
            <div className="flex-1 relative overflow-ellipsis">
                <Image
                    key={ props.index}
                    src={props.src}
                    width={1}
                    height={1}
                    alt={`${props.name}`}
                    className="flex-1 min-w-full bg-cover z-0 rounded-t-2xl static"
                />
                <div className="bg-gradient-to-t from-default to-white-15 py-5 bg-blend-multiply z-40 absolute w-full bottom-0 text-white">
                    <div className="text-lg md:text-2xl lg:text-3xl mx-7 line-clamp-2 font-semibold">{props.name}
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

