import "../../styles/globals.css"
import { Button } from "@mui/base"
import Image from "next/image"
export default function ScannedImage(props ) {
    return (<div className="aspect-auto w-4/12 h-auto mr-3">
        <img src={props.src}/>
        <Button className="text-red underline" onClick={() => props.remove(props.index)}><Image src="/images/cross.svg" className="w-fit h-auto mr-1" width={ 1} height={1} alt="Remove Item"/>Remove</Button>
    </div>)
}