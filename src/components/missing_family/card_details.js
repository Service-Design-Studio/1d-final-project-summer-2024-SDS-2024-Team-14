import "../../styles/globals.css"
import Detail from "./detail"

export default function CardDetails(props) {
    return (
        <div className="flex flex-col relative text-xl mx-10 my-5">
            <Detail subtitle={"Gender"} content={props.gender} />
            <Detail subtitle={"Age"} content={props.age} />
            <Detail subtitle={"Date Of Birth"} content={props.dob} />
            <Detail subtitle={"Ethnicity"} content={props.ethnicity} />
        </div>
    )
}