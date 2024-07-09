import "../../styles/globals.css"
import { Button } from "@mui/base"
import Image from "next/image"
export default function Header(props) {
    return (
        <div className="flex flex-row items-center w-10/12 lg:w-11/12 h-20 text-darkblue text-4xl font-semibold mx-auto">
            <Button><Image
                className="w-5 mr-4"
                onClick={props.onClick} src={"/images/previous_chevron.svg"} width={1} height={1} alt="click to go to previous page" /></Button>
            <span>{props.text}</span>
        </div>

    )
}