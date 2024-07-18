import Image from 'next/image'
import avatar from "../../../../public/images/avatar_placeholder.png"

export default function ProfilePic() {
    return (
        <div className="overflow-hidden mt-2 w-3/12 rounded-2xl">
            <Image className="rounded-2xl" src={avatar} alt="Profile photo"/>
         </div>
    )
}