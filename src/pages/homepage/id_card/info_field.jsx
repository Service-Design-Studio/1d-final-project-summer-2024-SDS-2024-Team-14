export default function Field(props) {
    return (<div>
        <div className="title-text">{props.title}</div>
        <h1 className="content-text">{props.content}</h1>
    </div>)
}