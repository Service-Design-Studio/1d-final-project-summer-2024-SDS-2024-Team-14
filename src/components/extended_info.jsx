import Field from "@/components/homepage/id_card/info_field";

export default function ExtendedInfo() {
    return (
        <div className="grid grid-cols-2">
            <Field title={"Marriage Certificate"} content={"null"} />
            <Field title={"Birth Certificate"} content={"null"} />
            <Field title={"Family census"} content={"null"} />
            <Field title={"Passport Number"} content={"null"} />
            <Field title={"Military Service booklets"} content={"null"} />
            <Field title={"Medical Booklet"} content={"null"} />
        </div>
    )
}