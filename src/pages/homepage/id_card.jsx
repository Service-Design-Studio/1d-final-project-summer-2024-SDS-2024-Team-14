import ShowBtn from "./id_card/show_more_btn"
import ProfilePic from "./id_card/profile_pic"
import PersonalInfo from "./id_card/personal_info"
export default function IdCard() {
    return (
        <div className="max-w-lg min-w-200 mx-auto my-6 p-8 rounded-xl shadow-md overflow-hidden md:max-w-2xl bg-gradient-to-r from-lightblue to-lightpink">
            <div className="block">
                <div className="flex">
                    <ProfilePic />
                    <PersonalInfo/>
                </div>
                <ShowBtn/>
            </div>
        </div>)
};