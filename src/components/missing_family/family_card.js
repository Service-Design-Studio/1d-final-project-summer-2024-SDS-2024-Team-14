import "../../styles/globals.css"
import Image from "next/image"
import CardDetails from "./suggestion_card_components/card_details"
export default function FamilyCard(props) {
    return (

        <div className="relative flex flex-col rounded-r-2xl shadow-lg bg-white">
            {props.selectedData ?
                <div>
                    <div className="flex-1 relative overflow-ellipsis min-w-96 lg:max-w-none lg:min-w-[16vw]">
                        <Image
                            unoptimized
                            src={props.selectedData.src}
                            width={1}
                            height={1}
                            alt={`${props.selectedData.name}`}
                            className="flex-1 md:w-full w-fit md:aspect-square md:object-cover object-contain rounded-tr-2xl static"
                        />
                        <div className="bg-gradient-to-t from-default to-white-15 py-5 bg-blend-multiply z-50 absolute w-full bottom-0 text-white">
                            <div className="text-lg md:text-2xl lg:text-3xl mx-7 line-clamp-2 font-semibold">{props.selectedData.name}
                            </div>
                        </div>
                    </div>
                    <CardDetails
                        gender={props.selectedData.gender}
                        age={props.selectedData.age}
                        dob={props.selectedData["Date Of Birth"]}
                        ethnicity={props.selectedData.ethnicity}
                        relationship={props.selectedData.relationship}
                    /> </div> :
                <div className="self-center my-auto text-darkblue font-semibold">
                    <Image src="/images/graphic_magnifying_glass.svg" width={1} height={1} className="w-0.8 my-10 opacity-75 mx-auto" alt="" />
                    Select an available entry on the left to view
                </div>}

        </div>
    )
}