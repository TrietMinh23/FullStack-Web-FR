import React, { useState } from "react";
import Rating from "@mui/material/Rating";

export default function PopupReview({ close, i, at, data }) {
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const parts = new Date(date).toLocaleDateString(undefined, options).split(' ');
        return `${parts[1]} ${parts[0]}, ${parts[2]}`;
      }
    return (
        <div className="modal p-7" style={{ top: `calc(50% + ${at}px)` }}>
            <h1 className="flex justify-center text-2xl">
                Review Details
            </h1>
            <div className="m-5 p-5 border rounded-md border-green-sheen">
                <div className = "grow flex">
                    <div className ="md:w-1/5" >Review id: </div>
                    <div
                        className="md:w-4/5" 
                    >   
                        <div>{data[i]._id}</div>
                    </div>
                </div>
                <div className = "grow flex  mt-5">
                    <div className ="md:w-1/5">Post date: </div>
                    <div className ="md:w-4/5" 
                        >{formatDate(data[i].createdAt)}
                    </div>
                </div>
                <div className = "grow flex mt-5">
                    <div className ="md:w-1/5">Product id: </div>
                    <div className ="md:w-4/5" 
                        >{data[i].orderedProduct}
                    </div>
                </div>
                <div className = "grow flex mt-5 ">
                    <div className ="md:w-1/5">Buyer: </div>
                    <div className="md:w-4/5">{data[i].buyer.name}</div>
                </div>
                <div className = "mt-5 grow flex items-start">
                    <div className ="md:w-1/5">Rating:  </div>
                    <div className ="md:w-4/5">
                        <div className ="flex">
                            <div>Star</div>
                            <Rating
                                color="primary"
                                name="read-only"
                                readOnly
                                value={data[i].rating.star}
                            />                    
                        </div>
                        <div>
                            <span>Comment: </span>
                            <span>{data[i].rating.comment}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 flex justify-end">
                <button
                    className="ml-2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                    onClick={close}
                >
                Return to All Review page
                </button>
            </div>
        </div>
  );
}
