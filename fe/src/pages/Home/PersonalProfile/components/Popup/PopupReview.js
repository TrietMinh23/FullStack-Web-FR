import React, { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';

export default function PopupReview ({close, finish}) {
  const [value, setValue] = useState('');
    return (
        <div className ="container absolute z-10 modal p-10 h-auto">
            <h1 className = "flex justify-center text-2xl	">Write comment for seller</h1>
            <form>
              <div className = "mt-10 ">
                  <div>
                      <span>Star:</span>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                  </div>
                  <div className ="flex mt-6" >
                      <label for ="myInput">
                          Comment
                      </label>
                      <textarea
                      className="w-full border ml-2 "
                      name="myInput" />
                  </div>
              </div>
              <div className ="mt-6 flex justify-end">
                <button
                className="mr-2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                onClick ={finish}
                >Submit</button>
                <button
                className="bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                onClick = {close}
                >Cancel</button>
              </div>
            </form>
        </div>
    )
}