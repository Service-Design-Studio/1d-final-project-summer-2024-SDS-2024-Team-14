import "../../../styles/globals.css"
import { Button } from "@mui/material"
export default function FamilyForm(props) {
    return (
        <div className="flex flex-col rounded-r-2xl w-[30vw] h-full max-w-96 shadow-lg bg-white">
            <div>
                <span>Photos</span>
            </div>
            <div>
                <span>Name</span>
            </div>
            <div>
                <span>Date Of Birth</span>
            </div>
            <div>
                <span>Ethnicity</span>
            </div>
            <div>
                <span>Relationship</span>
            </div>
            <Button onClick={ ()=> props.setAddNew(false)}>Discard Changes</Button>
        </div>)
}