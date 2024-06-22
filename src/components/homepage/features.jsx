import DocumentsTag from "./features/documents_tag";
import FeatureCard from "./features/feature_card";
import Link from "next/link"
export default function Features(props) {
    return (
        <div className="flex flex-col w-full">
            <span className="card mx-auto my-0 pb-0 shadow-none text-3xl font-medium text-darkblue">Services</span>
            <Link href={`documents/${props.id}` }><FeatureCard btnName={"Documents Manager"} img={"/images/documents.svg"} text={<div className="flex"><DocumentsTag quantity={"40"} text={"Uploaded Documents"} /><DocumentsTag quantity={"18"} text={"Verified Documents"} /><DocumentsTag quantity={"07"} text={"Pending Verification"} /></div>} /></Link>
            <Link href={`faq-chatbot/${props.id}`}><FeatureCard btnName={"FAQ Chatbot"} img={"/images/faq_chatbot.svg"} text={"Need help? Our Chatbot can help you with your questions."} /></Link>
            <Link href={`family-tree/${props.id}`}><FeatureCard btnName={"Family Tree"} img={"/images/family.svg"} text={"Find family members by uploading their photos."} /></Link>
            <Link href={`resources/${props.id}`}><FeatureCard btnName={"Resource Allocator"} img={"/images/map.svg"} text={"Find donated resources and how to get them."} /></Link>
        </div>
    );
}