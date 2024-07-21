export default function Field(props) {
    return (<div>
        <div className="text-left"></div>
        <div className="title-text text-left" data-cy={'info'}>{props.title}</div>
        <h1 id="idcard-identify" className="content-text text-left overflow-ellipsis">{props.content}</h1>
    </div>)
}