import FeatureCard from "./features/feature_card";
export default function Features() {
    return (
        <div className="flex-col w-full">
            <FeatureCard btnName={"Documents Manager"} img={"/images/documents.svg"} text={"Need help? Our Chatbot can help you with your"} />
            <FeatureCard btnName={"FAQ Chatbot"} img={"/images/faq_chatbot.svg"} text={"Need help? Our Chatbot can help you with your questions."} />
            <FeatureCard btnName={"Family Tree"} img={"/images/family.svg"} text={"Find family members by uploading their photos."} />
            <FeatureCard btnName={"Resource Allocator"} img={"/images/map.svg"} text={"Find donated resources and how to get them."} />
        </div>
    );
}