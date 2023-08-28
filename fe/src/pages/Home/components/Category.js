import { useEffect, useState } from "react";
import { getByCategoryRelative } from "../../../api/category";

export default function Category({ setCategory }) {
  const [isPopup, setPopup] = useState(false);
  const [data, setData] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getByCategoryRelative()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const apply = () => {
    setCategory(selectedCategories);
    setPopup(!isPopup);
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
      <div>
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => setPopup(!isPopup)}
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
      <div
        id="dropdown"
        className={`z-10 ${
          !isPopup ? "hidden" : "block"
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
    </div>
  );
}
