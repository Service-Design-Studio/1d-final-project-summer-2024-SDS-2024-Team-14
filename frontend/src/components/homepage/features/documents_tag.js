export default function DocumentsTag(props) {
    return (
        <div className="flex flex-row items-center">
            <span className="text-[5vw] md:text-[2vw] font-semibold">
                {/*TODO - dynamically populate*/}
                { props.quantity}
            </span> 
            <h1 className="md:text-[1vw] text-[2.5vw] md:ml-[0.5vw] ml-[1vw]">
                {props.text.split(" ")[0]} <br /> {props.text.split(" ").slice(1).join(" ")}
            </h1>
        </div>
    );
}