import { useState } from 'react';
import Image from 'next/image'
export default function ShowBtn(props) {
    const [isHovering, setIsHovering] = useState(false);
    let onMouseEnter = () => setIsHovering(true);
    let onMouseLeave = () => setIsHovering(false);

    return (
        <div className="my-6">
            <button className="btn-darkblue" onClick={props.onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {isHovering ? <Image className="fill-current icon" width={120} height={0} src={props.hoverIcon} alt="eye open icon" /> : <Image className="fill-current icon" width={120} height={0} src={props.icon} alt="eye open icon" />}
                <span className="btn-text">{props.text}</span>
            </button>
        </div>
    )
}