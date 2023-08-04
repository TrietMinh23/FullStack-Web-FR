import React, { useEffect, useState } from "react";

export default function PopupPaySuccess ({finish}) {

    return (
        <div className ="!w-1/3 !text-center container absolute z-10 modal p-10 h-auto ">
            <div className ="model-wrapper ">
                <h1 className = "flex justify-center text-2xl	">Order Successful</h1>
                <p className = "flex justify-center mt-4">Thank you for your purchase.</p>
                <p className = "flex justify-center"> Your order will be delivered soon.</p>
                <div className ="mt-10 flex justify-evenly grow">
                    <button
                    className="md:w-1/3 ml-2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                    onClick ={finish}
                    >Yes</button>
                </div>
            </div>
        </div>
    )
}