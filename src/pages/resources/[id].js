import { useRouter } from "next/router";
import "../../styles/globals.css"
export default function Resources() {
    const router = useRouter()
    return (<div className="bg-white w-screen h-screen">
        Placeholder for Resource Locator feature
        <br />User id: {router.query.id}
    </div>)
}