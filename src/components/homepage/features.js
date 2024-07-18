import DocumentsTag from "./features/documents_tag";
import FeatureCard from "./features/feature_card";
import Link from "next/link"
export default function Features(props) {
    return (
        <div className="flex flex-col aos-init aos-animate">
            <span data-aos='fade-left' data-aos-delay='500' className="card mx-auto my-4 pb-0 shadow-none text-3xl font-medium text-darkblue">Services</span>
            <Link data-aos='fade-left' data-aos-delay='500' href={`documents` }><FeatureCard btnName={"Documents Manager"} img={"/images/documents.svg"} text={<div className="flex"><DocumentsTag quantity={"40"} text={"Uploaded documents"} /><DocumentsTag quantity={"18"} text={"Verified documents"} /><DocumentsTag quantity={"07"} text={"Pending Verification"} /></div>} /></Link>
            <Link data-aos='fade-left' data-aos-delay='700' href={`faq-chatbot`}><FeatureCard btnName={"FAQ Chatbot"} img={"/images/faq_chatbot.svg"} text={"Need help? Our Chatbot can help you with your questions."} /></Link>
            <Link data-aos='fade-left' data-aos-delay='900' href={`family-tree`}><FeatureCard btnName={"Family Tree"} img={"/images/family.svg"} text={"Find family members by uploading their photos."} /></Link>
            <Link data-aos='fade-left' data-aos-delay='1100' href={`resources`}><FeatureCard btnName={"Resource Locator"} img={"/images/map.svg"} text={"Find donated resources and how to get them."} /></Link>
        </div>
    );
}