import React, { useEffect, useState } from "react";

export default function PopupPayUnsuccess ({finish}) {

    return (
        <div className ="!text-center container absolute z-10 modal p-10 h-auto ">
            <div className ="model-wrapper ">
                <h1 className = "flex justify-center text-2xl	">Order Unsuccessful</h1>
                <p className = "flex justify-center mt-4"> We regret to inform you that the payment was not successful</p>
                <p className = "flex justify-center"> Please ensure your payment method is valid and try again.</p>
                <div className ="mt-10 flex justify-evenly grow">
                    <button
                    className=" ml-2 bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                    onClick ={finish}
                    >Return to main page</button>
                </div>
            </div>
        </div>
    )
}