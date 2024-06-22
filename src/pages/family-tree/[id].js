import { useRouter } from "next/router"
import "../../styles/globals.css"
export default function FamilyTree() {
    const router = useRouter();
    return (<div className="bg-white w-screen h-screen">
        Placeholder for family tree feature
        <br />User id: {router.query.id}
    </div>)
}