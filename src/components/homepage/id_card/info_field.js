export default function Field(props) {
    return (<div className=''>
        <div className="text-left "></div>
        <div className="xl:title-text text-lightgray uppercase font-semibold text-[2vw] text-left" data-cy={'info'}>{props.title}</div>
        <h1 id="idcard-identify" className="xl:content-text text-[2.5vw] font-medium text-left overflow-ellipsis">{props.content}</h1>
    </div>)
}