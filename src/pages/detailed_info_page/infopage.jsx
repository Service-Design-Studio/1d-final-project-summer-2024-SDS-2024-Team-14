import IdCard from "../homepage/id_card";
import PersonalInfo from "../homepage/id_card/personal_info";
import ProfilePic from "../homepage/id_card/profile_pic";
import ExtendedInfo from "./extended_info";

export default function Info() {
    return (
        <div className="id-card">
            <div className="block">
                <div className="flex">
                    <ProfilePic />
                    <PersonalInfo />
                </div>
            </div>    
            <ExtendedInfo />
        </div>
    )
}