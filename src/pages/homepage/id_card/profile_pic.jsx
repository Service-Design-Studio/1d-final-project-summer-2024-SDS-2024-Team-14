import Image from 'next/image'
export default function ProfilePic() {
    return (
        <div className="">
            <Image src="/images/Profile_pic_grp.svg" className='min-w-160' width={160} height={160} alt="Profile photo"/>
        </div>
    )
}