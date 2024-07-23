import Image from 'next/image'
import avatar from "../../../../public/images/avatar_placeholder.png"

export default function ProfilePic() {
    return (
        <div className="overflow-hidden mt-1 md:mt-2 mx-1 md:mx-2 w-fit rounded-2xl">
            <Image className="rounded-xl w-[23vw] md:rounded-2xl md:w-[23vw] lg:w-[30vw] xl:w-[10vw]" src={avatar} alt="Profile photo"/>
         </div>
    )
}