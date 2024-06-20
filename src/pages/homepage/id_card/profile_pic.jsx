import Image from 'next/image'
export default function ProfilePic() {
    return (
        <div className="profile-image">
            <Image src="/images/Profile_pic_grp.svg" className='' width={160} height={160} alt="Profile photo"/>
        </div>
    )
}