import Image from 'next/image'
import avatar from "../../../../public/images/profile_pic_grp.png"
import warning from "../../../../public/images/passport/red_error.svg"
import verified from "../../../../public/images/passport/tick_green.svg"

export default function ProfilePic(props) {
    return (
        <div className="relative mt-1 md:mt-2 mx-1 md:mx-2 w-fit rounded-2xl">
            {props.verified? <Image className="verified absolute md:w-8 md:h-8 w-6 h-6 -top-2 -right-2" src={verified}/> : <Image className="alert absolute md:w-8 md:h-8 w-6 h-6 -top-2 -right-2" src={warning}/>}
            <Image className="rounded-xl w-[30vw] md:rounded-2xl md:w-[23vw] lg:w-[30vw] xl:w-[10vw]" width='400' height='400' src={props.src ? props.src: avatar} alt="Profile photo"/>
         </div>
    )
}