import "../../../styles/globals.css"
import { CircularProgress, Typography } from "@mui/material"
export default function Similarity(props) {
    return (
        <div className="absolute z-40 -top-10 -right-10 rounded-full w-10 h-10 md:w-16 md:h-16 2xl:w-24 2xl:h-24 bg-white text-white text-center">
            <div className="flex flex-col relative w-full rounded-full bg-white h-full items-center justify-center align-middle">
                <span className="text-darkblue font-semibold md:text-lg lg:text-xl">
                    {props.similarity + "%"}
                    <p className="text-md md:text-md lg:text-2md">Similarity</p>
                </span>
                <CircularProgress size="100%" className="absolute z-50" variant="determinate" value={props.similarity} />
            </div>
            

        </div>)
}