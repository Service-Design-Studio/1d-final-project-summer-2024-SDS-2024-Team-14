import "../../styles/globals.css"
import { Button } from "@mui/base"
import Image from "next/image"
export default function ScannedImage(props ) {
    return (<div className="flex flex-col embla__slide items-center min-w-[100px max-w-[100px]  h-auto mr-3">
        <img src={props.src}/>
        <Button className="text-red underline flex flex-row items-center text-md xsm:text-xl" onClick={() => props.remove(props.index)}><Image src="/images/cross.svg" className="w-2/12 h-5 mr-1" width={ 1} height={1} alt="Remove Item"/>Remove</Button>
    </div>)
}