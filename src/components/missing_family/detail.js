import "../../styles/globals.css"

export default function Detail(props) {
    return (
        <span className="flex-1 font-semibold my-2">{ props.subtitle}:&nbsp;
            <span className="font-medium">{ props.content}</span>
        </span>
    )
}