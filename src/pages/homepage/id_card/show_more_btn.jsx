import { useState } from 'react';
import Image from 'next/image'
export default function ShowBtn() {
     const [isHovering, setIsHovering] = useState(false);
    let onMouseEnter = () => setIsHovering(true);
    let onMouseLeave = () => setIsHovering(false);
    return (
        <div className="my-6">
            <button className="btn-darkblue" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {isHovering ? <Image className="fill-current icon" width={120} height={0} src="/images/open_eye_blue.svg" alt="eye open icon" /> : <Image className="fill-current icon" width={120} height={0} src="/images/open_eye.svg" alt="eye open icon"/>}
                <span className="btn-text">Show UNHCR Card</span>
            </button>
        </div>
    )
}