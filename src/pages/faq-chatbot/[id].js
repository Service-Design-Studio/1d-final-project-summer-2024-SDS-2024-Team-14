import "../../styles/globals.css"
import { useRouter } from "next/router";
export default function Faq() {
    const router = useRouter()
    return (<div className="bg-white w-screen h-screen">
        Placeholder for FAQ Chatbot feature
        <br />User id: {router.query.id}
    </div>)
}