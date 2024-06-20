import Features from "./features.jsx";
import HomeHeader from "./home_header.jsx"
import IdCard from "./id_card.jsx";

export default function Homepage() {
    return (
        <div className="flex flex-col  px-5 w-90 items-center">
            <HomeHeader text={ "Home"} />
            <IdCard />
            <Features/>
        </div>);
}