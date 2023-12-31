import React, { useEffect, useState } from "react";

export default function PopupCancel({ close, finish, at }) {
  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      document.querySelector(".modal").removeAttribute("style");
    } else {
      document
        .querySelector(".modal")
        .setAttribute("style", `top: calc(50% + ${at}px)`);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (window.innerWidth <= 1024) {
      document.querySelector(".modal").removeAttribute("style");
    } else {
      document
        .querySelector(".modal")
        .setAttribute("style", `top: calc(50% + ${at}px)`);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Dependency array is empty to add the event listener only once
  return (
    <div
      className=" container modal p-7"
      style={{ top: `calc(50% + ${at}px)` }}
    >
      <div>
        <h1 className="text-center text-2xl	">
          Are you sure to cancel the order?
        </h1>
        <p className="text-center mt-4">
          If you cancel &gt; 3 items in a month, you will be block
        </p>
        <div className="mt-10 flex justify-evenly grow">
          <button
            className="md:w-1/3 bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
            onClick={close}
          >
            No
          </button>
          <button
            className="md:w-1/3 ml-2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
            onClick={finish}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
