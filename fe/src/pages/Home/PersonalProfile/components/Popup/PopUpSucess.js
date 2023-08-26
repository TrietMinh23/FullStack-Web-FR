import React, { useState } from "react";
export default function PopUpSucess({ close, i, at, data }) {
    return (
        <div className=" !w-96 modal p-10" style={{ top: `calc(50% + ${at}px)` }}>
            <h1 className="flex justify-center text-2xl mb-2 text-green-sheen font-semibold">
                SUCCESS
            </h1>
            <div className="text-center text-base mb-5">
            We're pleased to inform you that your data has been successfully updated. 
            </div>
            <div className="mt-3 flex justify-center">
                <button
                    className="ml-2 bg-green-sheen py-2 px-10 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                    onClick={close}
                >
                Close
                </button>
            </div>
        </div>
  );
}
