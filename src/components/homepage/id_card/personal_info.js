import Field from "./info_field"
export default function PersonalInfo(props) {
    return (
        <div>
            <div className="grid-2-cols-4-rows capitalize">
                <Field title={"Verification Status"} content={props.status} />
                <Field title={"Issued Date"} content={props.issuedDate} />
                <Field title={"Sex"} content={props.sex} />
                <Field title={"Expiry Date"} content={props.expiryDate} />
                <Field title={"Country of Origin"} content={props.country} />
                <Field title={"Date Of Birth"} content={props.dob} />
                <Field title={"Religion"} content={props.religion}/>
                <Field title={"Ethnicity"} content={props.ethnicity}/>
            </div>
        </div>
    )
}