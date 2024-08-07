import DocumentsTag from "./features/documents_tag";
import FeatureCard from "./features/feature_card";
import SpecialFeatureCard from "./features/special_feature_card";
import Link from "next/link"
export default function Features(props) {
    return (
        <div className="flex flex-col lg:w-5/12 w-full md:mx-0">
            <span data-aos='fade-left' data-aos-delay='500' className="card my-4 pb-0 shadow-none text-3xl font-medium text-darkblue">Services</span>
            <div className="mx-auto md:mx-0 w-11/12 md:w-full">
                <Link data-aos='fade-left' data-aos-delay='500' href={`documents` }><FeatureCard btnName={"Documents Manager"} img={"/images/homepage/documents.svg"} text={<div className="flex justify-around"><DocumentsTag quantity={"40"} text={"Uploaded documents"} /><DocumentsTag quantity={"18"} text={"Verified documents"} /><DocumentsTag quantity={"07"} text={"Pending Verification"} /></div>} /></Link>
                <a data-aos='fade-left' data-aos-delay='700' href={``}><SpecialFeatureCard btnName={"Guiding Video"} img={"/images/homepage/video_icon.svg"} text={"Need help? Click here to see our guiding video for the website"} /></a>
                <Link data-aos='fade-left' data-aos-delay='900' href={`family-tree`}><FeatureCard btnName={"Family Tree"} img={"/images/homepage/family.svg"} text={"Find family members by uploading their photos."} /></Link>
                {/*<Link data-aos='fade-left' data-aos-delay='1100' href={`resources`}><SpecialFeatureCard btnName={"Resource Locator"} img={"/images/homepage/resources.svg"} text={"Find donated resources and how to get them."} /></Link>*/}
            </div>
        </div>
    );
}