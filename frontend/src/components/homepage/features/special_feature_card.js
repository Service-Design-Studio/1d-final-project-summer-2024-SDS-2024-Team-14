import Image from "next/image";
export default function SpecialFeatureCard(props) {
    return (
        <div className="feature-card card px-5">
            <div className="flex flex-col flex-auto">
                <div className="flex items-center md:mb-[0.5vw] mb-[2.0vw]">
                    <Image className="md:w-[1.5vw] w-[4.5vw] md:mr-[1vw] mr-[2vw]" src={props.img} width={"150"} height={"0"} alt="icon" />
                    <span className="md:text-[1.3vw] text-[4.5vw] flex-1 font-semibold">{props.btnName}</span>
                </div>
                <span className="line-clamp-3 overflow-ellipsis md:text-[1vw] text-[3vw] pb-[1vw]">{props.text}</span>
            </div>
        </div>
    );
}