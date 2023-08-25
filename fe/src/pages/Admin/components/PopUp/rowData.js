export default function RowData ({titles, data, css}) {
  return (
    <div className = {`grow flex  ${css}`}>
        <div className ="md:w-2/5">{titles}: </div>
        <div className ="md:w-3/5" 
            >{data}
        </div>
    </div>
  )
}
