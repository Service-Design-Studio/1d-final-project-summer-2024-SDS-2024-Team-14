export default function Loading(props) {
    return (
        <div className="flex w-full h-full items-center justify-center">
            <span className="text-xl text-darkblue">
                {props.text}
            </span>
        </div>
    )
}