import Image from "next/image";
export default function FeatureCard(props) {
    return (
        <div className="feature-card card px-5">
            <div className="flex flex-col flex-auto">
                <div className="flex">
                    <Image className="flex-1 fill-current icon p-0 ml-0 mr-2" src={props.img} width={200} height={0} alt="icon" />
                    <span className="h2-text flex-1">{props.btnName}</span>
                </div>
                <span className="line-clamp-3 overflow-ellipsis">{props.text}</span>
            </div>
            
            <a href="#"><Image src="/images/keyboard_arrow_left.svg" width={70} height={50} alt="next page" /></a>
        </div>
    );
}