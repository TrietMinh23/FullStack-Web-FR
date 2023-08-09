import {AiOutlineClose} from "react-icons/ai";

export default function PopupSeller () {
    return (
        <div className ="container absolute z-10 modal h-auto ">
            <div className="flex justify-end">
                <buton
                    className ="text-slate-300"
                ><AiOutlineClose/></buton>
            </div>
            <div className="p-10"></div>
        </div>
    )
}