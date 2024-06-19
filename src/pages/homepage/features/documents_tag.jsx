export default function DocumentsTag(props) {
    return (
        <div className="flex-1 flex flex-col text-center">
            <span className="text-2xl md:text-4xl font-semibold">
                { props.quantity}
            </span> 
            <span>
                {props.text}
            </span>
        </div>
    );
}