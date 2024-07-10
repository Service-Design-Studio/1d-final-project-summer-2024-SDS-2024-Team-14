export default function HomeHeader(props) {
    return (
        <div className="mb-4 p-0 card shadow-white \rounded-xl bg-white ">
            <h1 className="header-text">{ props.text}</h1>
        </div>);
}