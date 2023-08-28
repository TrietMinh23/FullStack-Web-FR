import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import RowData from "./rowData";
export default function PopUpInforSeller({ close, i, at, data }) {
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
                <RowData
                    titles={"Seller id"}
                    data={data[i]._id}
                />
                <RowData
                    titles={"Address"}
                    data={data[i].address}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Post date"}
                    data={formatDate(data[i].createdAt)}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Seller Name"}
                    data={data[i].name}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Is Blocked"}
                    data={data[i].isBlocked ? "YES" : "NO"}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Email"}
                    data={data[i].email}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Phone Number"}
                    data={data[i].mobile}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Negative Review"}
                    data={data[i].negativeCount}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Positive Review"}
                    data={data[i].positiveCount}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Average Rating"}
                    data={data[i].avgRating}
                    css={"mt-3"}
                />
                <RowData
                    titles={"Total Sales"}
                    data={data[i].totalSales}
                    css={"mt-3"}
                />

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
