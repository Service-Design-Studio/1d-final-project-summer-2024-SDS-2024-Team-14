import FeatureCard from "./features/feature_card.jsx";
import HomeHeader from "./home_header.jsx"
import IdCard from "./id_card.jsx";

export default function Homepage() {
    return (
        <div className="flex flex-col flex-1 px-5 w-90 items-center">
            <HomeHeader/>
            <IdCard />
            <FeatureCard/>
        </div>);
}