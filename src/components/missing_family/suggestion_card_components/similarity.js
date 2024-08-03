import "../../../styles/globals.css"
import { CircularProgress, Typography } from "@mui/material"
export default function Similarity(props) {
    return (
        <div className="absolute z-40 -top-10 -right-10 rounded-full w-[8vw] h-[8vw] max-w-32 max-h-32 bg-white text-white text-center">
            <div className="flex flex-col relative w-full rounded-full bg-white h-full items-center justify-center align-middle">
                <span className="text-darkblue font-semibold md:text-lg lg:text-2xl">
                    {props.similarity + "%"}
                    <p className="text-md md:text-mdd lg:text-2mdd">Simlarity</p>
                </span>
                <CircularProgress size="100%" className="absolute z-50" variant="determinate" value={props.similarity} />
            </div>
            

        </div>)
}