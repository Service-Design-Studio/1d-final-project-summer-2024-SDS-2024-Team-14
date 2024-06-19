import Field from "./info_field"
export default function PersonalInfo() {
    return (
        <div>
            <div className="grid grid-cols-2 grid-rows-3 gap-y-1 gap-x-3 ml-3">
                <Field title={"Nama / Name"} content={"Lorem Ipsum"} />
                <Field title={"NAMA / NAME"} content={"placeholder"} />
                <Field title={"verification Status"} content={"Lorem Ipsum"} />
                <Field title={"NAMA / NAME"} content={"placeholder"} />
                <Field title={"Identification No."} content={"placeholder"} />
                <Field title={"NAMA / NAME"} content={"placeholder"} />
            </div>
        </div>
    )
}