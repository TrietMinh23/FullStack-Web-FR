import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { rows } from "../../data/orderData";
import { postReview } from "../../../../../api/Review/postReview";

export default function PopupReview({ close, i, at }) {
  const [value, setValue] = useState("");
  const [iscomfirm, setIsComfirm] = useState(false);
  const [iscomment, setIsComment] = useState(false);
  const confirm = () => {
    close();
    setIsComfirm(true);
    const rate = { star: value, comment: iscomment };
    const data = {
      rating: rate,
      buyer: rows[i].idBuyer,
      seller: rows[i].idSeller,
    };
    Review(data);
  };
  const Review = async (data) => {
    console.log(data);
    await postReview(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div
      className={`container p-7 modal`}
      style={{ top: `calc(50% + ${at}px)` }}
    >
      {!iscomfirm ? (
        <>
          <h1 className="flex justify-center text-2xl	">
            Write comment for seller
          </h1>
          <div className="mt-10 ">
            <div>
              <span>Star:</span>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(value, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            <div className="flex mt-6">
              <label for="myInput">Comment</label>
              <textarea
                className="w-full border ml-2 "
                name="myInput"
                onChange={(e) => setIsComment(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="ml-2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
              onClick={confirm}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="flex justify-center text-2xl	">
            Review Sent Successfully
          </h1>
          <p className="flex justify-center mt-4">
            We apologize for the inconvenience, we will handle it promptly.
          </p>
          <div className="mt-10 flex flex-col gap-y-5 ">
            <div className="mt-3 flex justify-center px-5 grow">
              <button
                className=" md:w-1/2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                onClick={close}
              >
                Return to all order page
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
