import { MenuItem } from '@mui/material'
import Image from 'next/image'
export default function DropdownItem(props) {
    const value = props.value;
    console.log(value);
    return (
            <span className="flex flex-row">
                <Image src={props.src} className="w-5 h-4 mx-2 my-auto" width={15} height={10} alt={props.span} />
                {props.span}
            </span>)
    
}