import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import {rows} from "../../data/orderData";

export default function PopupReview ({finish , close, i}) {
  const [value, setValue] = useState(5);
  const [iscomfirm, setIsComfirm] = useState(false); 
  const [iscomment, setIsComment] = useState(false); 
  const [isemty, setIsEmty] = useState(false); 

  const confirm = () => {
    if (iscomment){
      const rate = {star : value, comment : iscomment}
      const data = {
        rating: rate,
        buyer: rows[i].idBuyer,
        seller: rows[i].idSeller,
      };
      Review(data);
      setIsComfirm(true);
      console.log("Alo.bug goi ba")

    }
    else{
      setIsEmty(true);
      console.log("Alo.checksum")
    }
  }
  const Review = async (data) => {
    console.log(data);
    // await postReview(data)
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((err) => {
    //     console.log(err.response.data.message);
    // });
  };
    return (
      <div className ="container z-10 popUpmodal p-10 h-auto">
        {!iscomfirm ?
          <div>
            <h1 className = "flex justify-center text-2xl	">Write comment for seller</h1>
              <div className = "mt-10 ">
                  <div>
                      <span>Star:</span>
                      <Rating
                        color="primary"
                        name="simple-controlled"
                        value={value}
                        onChange={( value,newValue) => {
                          setValue(newValue);
                        }}
                      />
                  </div>
                  <div className =" flex mt-6" >
                      <label for ="myInput">
                          Comment
                      </label>
                      <textarea
                      className={`w-full border-2 ml-2 ${isemty && !iscomment &&"border-red-700"}`}
                      name="myInput" 
                      onChange={(e) => setIsComment(e.target.value)}
                      />
                  </div>
                  <div className ={`ml-20 ${isemty && !iscomment ?"text-red-700 visible font-semibold": "invisible"}`}>
                    This field can't be empty
                  </div>
              </div>
              <div className ="mt-3 flex justify-end">
              <button
                className="bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                onClick = {close}
                >Cancel</button>
                <button
                className="ml-2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                onClick ={confirm}
                >Send</button>
              </div>
          </div>
        :
          <>
            <h1 className = "flex justify-center text-2xl	">Thank for your review</h1>
            <p className = "flex justify-center text-center mt-4 mx-12">If you have any problem with seller, please contact us by using report button</p>
            <div className ="mt-10 flex flex-col gap-y-5 ">
              <div className ="mt-3 flex justify-center px-5 grow">
                <button
                  className=" md:w-1/2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                  onClick ={finish }
                >Return to all order page</button>   
              </div>
            </div>
          </>
        }
        </div>
    )
}