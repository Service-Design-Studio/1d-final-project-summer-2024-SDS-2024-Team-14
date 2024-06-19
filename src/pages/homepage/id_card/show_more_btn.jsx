import { useState } from 'react';
import Image from 'next/image'
export default function ShowBtn(props) {
    const [isHovering, setIsHovering] = useState(false);
    let onMouseEnter = () => setIsHovering(true);
    let onMouseLeave = () => setIsHovering(false);

    const [isOpen, setIsOpen] = useState(false);
    let onClick = () => setIsOpen(!isOpen);
    return (
        <div className="my-6">
            <button className="btn-darkblue" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {isHovering ? <Image className="fill-current icon" width={120} height={0} src={isOpen ? "/images/close_eye_blue.svg" : "/images/open_eye_blue.svg"} alt="eye open icon" /> : <Image className="fill-current icon" width={120} height={0} src={isOpen ? "/images/close_eye.svg" : "/images/open_eye.svg"} alt="eye open icon" />}
                <span className="btn-text">{isOpen ? "Hide" : "Show"} UNHCR Card</span>
            </button>
        </div>
    )
}