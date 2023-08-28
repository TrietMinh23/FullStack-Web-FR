import { useEffect, useState } from "react";
import { getByCategoryRelative } from "../../../api/category";
import React from "react";

export default function Category({ setCategory, setPrice }) {
  const [isPopup, setPopup] = useState(false);
  const [isPopupPrice, setPopupPrice] = useState(false);
  const [data, setData] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPriceU] = useState(null);

  useEffect(() => {
    getByCategoryRelative()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const priceList = [
    { title: "<= 200,000", value: 90000 },
    { title: "> 200,000", value: 210000 },
  ];

  const handleRadio = (e) => {
    setPriceU(e.target.defaultValue);
  };

  const apply = () => {
    setCategory(selectedCategories);
    setPopup(!isPopup);
    setPopupPrice(false);
  };

  const applyPrice = () => {
    setPrice(price);
    setPopupPrice(!isPopupPrice);
    setPopup(false);
  };

  const handleOnChangeCheckBoxCategory = (e) => {
    const categoryTitle = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryTitle]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryTitle)
      );
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="btn-filter">
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => {
              setPopup(!isPopup);
              setPopupPrice(false);
            }}
          >
            Filter by category
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="btn-filter">
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => {
              setPopupPrice(!isPopupPrice);
              setPopup(false);
            }}
          >
            Filter by Price
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        id="dropdown"
        className={`z-10 ${!isPopup ? "hidden" : "block"
          } absolute mt-2 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
      >
        <h6 className="mb-3 ml-4 mt-2 text-sm font-medium text-gray-900 dark:text-white">
          Category
        </h6>
        <ul
          className="space-y-2 text-sm grid grid-cols-2 md:grid-cols-4 gap-x-12 p-4"
          aria-labelledby="dropdownDefault"
        >
          {data
            ? data.map((item, i) => (
              <li className="flex items-center" key={i}>
                <input
                  id={item.title}
                  type="checkbox"
                  onChange={handleOnChangeCheckBoxCategory}
                  value={item.title}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  checked={selectedCategories.includes(item.title)}
                />

                <label
                  htmlFor={item.title}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {item.title}
                </label>
              </li>
            ))
            : ""}
        </ul>
        <div className="text-right mr-3 mt-2">
          <button
            onClick={() => apply()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Apply
          </button>
        </div>
      </div>
      <div
        id="dropdown"
        className={`z-10 ${!isPopupPrice ? "hidden" : "block"
          } absolute mt-2 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
      >
        <h6 className="mb-3 ml-4 mt-2 text-sm font-medium text-gray-900 dark:text-white">
          Price
        </h6>
        <ul>
          {priceList
            ? priceList.map((item, i) => (
              <React.Fragment>
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="flexRadioDefault"
                    id={item.title}
                    value={item.value}
                    onChange={handleRadio}
                  />
                  <label
                    className="mt-px inline-block pl-[0.15rem] text-white hover:cursor-pointer"
                    htmlFor={item.title}
                  >
                    {item.title}
                  </label>
                </div>
              </React.Fragment>
            ))
            : ""}
        </ul>
        <div className="text-right mr-3 mt-2">
          <button
            onClick={() => applyPrice()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
