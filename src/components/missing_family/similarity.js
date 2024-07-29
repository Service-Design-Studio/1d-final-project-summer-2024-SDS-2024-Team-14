import "../../styles/globals.css"

export default function Similarity(props) {
    return (
        <div className="absolute z-40 -top-10 -right-10 rounded-full w-fit bg-darkblue text-white text-center p-7">
            <div className="text-3xl font-semibold">{props.similarity}&nbsp;%</div>
            <div className="text-xl">Similarity</div>
        </div>)
}