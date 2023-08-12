import React, { useState } from "react";
import {rows} from "../../data/orderData";
import { postReport } from "../../../../../api/Report/postReport";

export default function PopupReport ({ i, close}) {
    const [iscomfirm, setIsComfirm] = useState(false); 
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const comfirm = () => {
        setIsComfirm(true);
        console.log(iscomfirm);
        const data = {
            title: title,
            details:details,
            postDate: "2021-02-05 08:28:36",
            id_reporter: rows[i].idBuyer,
            id_reported: rows[i].idSeller,
            status:"Pending",
        };
        Report(data);
    }
    const Report = async (data) => {
        console.log(data);
        await postReport(data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
            console.log(err.response.data.message);
        });
      };
    return (
        <div className ="container absolute p-10 z-10 popUpmodal h-auto ">
            {!iscomfirm ?
                <div>
                    <h1 className = "flex justify-center text-2xl	">Report Seller</h1>
                    <p className = "flex justify-center mt-4">Please provide details about the issue you encountered with the seller</p>
                    <div className ="mt-10 flex flex-col gap-y-5 ">
                        <div className ="w-full flex grow">
                            <label htmlFor ="title">
                                Title: 
                            </label>
                            <input
                                className  ="border ml-3 md:w-full" 
                                type="text" name="name" id ="title"
                                onChange={(e) => setTitle(e.target.value)}
                                >
                            </input>
                        </div>
                        <div className ="flex grow items-center">
                            <label htmlFor ="title">
                                Detail:
                            </label>
                            <textarea
                                className  ="border md:w-full ml-3" 
                                type="text" name="name" id ="title"
                                onChange={(e) => setDetails(e.target.value)}
                                >
                            </textarea>
                        </div>
                        <div className ="mt-6 flex justify-between px-5 grow">
                            <button
                                className="md:w-1/3 bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                                onClick = {close}
                            >Cancel</button>
                            <button
                                className=" md:w-1/3 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                                onClick ={comfirm}
                            >Send</button>
                        </div>
                    </div>
                </div>
                :
                <>
                    <h1 className = "flex justify-center text-2xl	">Report Sent Successfully</h1>
                    <p className = "flex justify-center mt-4">We apologize for the inconvenience, we will handle it promptly.</p>
                    <div className ="mt-10 flex flex-col gap-y-5 ">
                        <div className ="mt-3 flex justify-center px-5 grow">
                            <button
                                className=" md:w-1/2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                                onClick ={close}
                            >Return to all order page</button>
                            
                        </div>
                    </div>
                </>
            }
              
        </div>
    )
}