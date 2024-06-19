import Field from "./info_field"
export default function PersonalInfo(props) {
    return (
        <div>
            <div className="grid-2-cols-4-rows">
                <Field title={"Nama / Name"} content={props.userName} />
                <Field title={"Issued Date"} content={props.issuedDate} />
                <Field title={"verification Status"} content={props.status} />
                <Field title={"Expiry Date"} content={props.expiryDate} />
                <Field title={"Identification No."} content={props.idNo} />
                <Field title={"Jantina / Sex"} content={props.sex} />
                <Field title={"Country of Origin"} content={props.country} />
                <Field title={"Date Of Birth"} content={props.dob} />
            </div>
        </div>
    )
}