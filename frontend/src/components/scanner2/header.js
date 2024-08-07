import "../../styles/globals.css"
import { Button } from "@mui/base"
import Image from "next/image"
export default function Header(props) {
    return (
        <div className="flex flex-row items-center w-11/12 lg:w-11/12 h-fit mb-3 pt-4 text-darkblue text-3xl sm:text-4xl font-semibold mx-auto sticky top-0 bg-white shadow-white shadow-lg">
            <Button><Image
                className="w-[3vw] md:w-5 mr-6"
                onClick={props.onClick} src={"/images/previous_chevron.svg"} width={1} height={1} alt="click to go to previous page" /></Button>
            <span>{props.text}</span>
        </div>

    )
}