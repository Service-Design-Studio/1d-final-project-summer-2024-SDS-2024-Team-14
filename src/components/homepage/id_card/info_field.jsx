export default function Field(props) {
    return (<div>
        <div className="title-text">{props.title}</div>
        <h1 id="idcard-identify" className="content-text overflow-ellipsis">{props.content}</h1>
    </div>)
}