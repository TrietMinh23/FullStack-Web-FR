import React, { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import PopupReview from "./PopupReview";
const TableItem = ({rows}) => {
  const [perPage, setPerPage] = useState(5); // Số hàng trên mỗi trang
  const [currentPage] = useState(1); // Trang hiện tại
  const [sortColumn, setSortColumn] = useState(""); // Cột hiện tại được sắp xếp
  const [sortOrder, setSortOrder] = useState(""); // Thứ tự sắp xếp ('asc' hoặc 'desc')
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn
  const [selectAll, setSelectAll] = useState(false); // Tất cả sản phẩm được chọn
  const [isReview, setIsReview] = useState(false); 

  const close = () => {
    setIsReview(false);
  }
  const finish = () => {
    setIsReview(false);
  }

  const handleSort = (column) => {
    if (column === sortColumn) {
      // Đang sắp xếp theo cột đã chọn, thay đổi thứ tự sắp xếp
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Đang sắp xếp theo một cột khác, đặt cột và thứ tự sắp xếp mới
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem.shopName !== item.shopName
        )
      );
    }
  };

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;

    if (checked) {
      setSelectAll(true);
      setSelectedItems(rows);
    } else {
      setSelectAll(false);
      setSelectedItems([]);
    }
  };

  const handleDelete = () => {
    setSelectedItems([]);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    let filteredData = rows;

    if (searchTerm) {
      filteredData = rows.filter((row) => {
        return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    let sortedData = filteredData;

    if (sortColumn) {
      sortedData = filteredData.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      });
    }

    return sortedData.slice(startIndex, endIndex);
  };

  return (
    <div className="p-5 h-full bg-gray-100 w-full rounded-md">
      <h1 className="text-xl mb-2">All Buyers</h1>

      <div className="flex items-center mb-4">
        <label htmlFor="search" className="mr-2">
          Search:
        </label>
        <input
          id="search"
          type="text"
          className="border border-gray-300 rounded-md p-1"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="ml-2 p-2 hover:bg-red-600 bg-red-500 text-white rounded-md"
          onClick={handleDelete}
        >
          <FaTrashAlt />
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow hidden xl:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th
                className="w-20 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("shopName")}
              >
                Shop Name{" "}
                {sortColumn === "shopName" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("product")}
              >
                Product name{" "}
                {sortColumn === "product" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("price")}
              >
                Price{" "}
                {sortColumn === "price" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortColumn === "status" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("orderDate")}
              >
                order Date{" "}
                {sortColumn === "orderDate" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("receiveDate")}
              >
                receive Date{" "}
                {sortColumn === "receiveDate" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {getCurrentPageData().map((row, index) => (
              <tr
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                key={row.shopName}
              >
                <td className="p-3 text-sm text-center text-gray-700 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (item) => item.shopName === row.shopName
                    )}
                    onChange={(event) => handleCheckboxChange(event, row)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.shopName}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.product}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.price}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap ">
                  <span
                    className={
                      "block text-center p-2 rounded-md bg-opacity-50  " +
                      (row.status === "Complete"
                        ? "text-green-800 bg-green-200"
                        : row.status === "Expense"
                        ? "text-gray-800 bg-yellow-200"
                        : row.status === "Shipping"
                        ? "text-gray-800 bg-blue-200"
                        : row.status === "Cancel"
                        ? "text-red-800 bg-red-200"
                        : "")
                    }
                  >
                    {row.status}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.orderDate}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.receiveDate}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.status === "Complete" &&
                    <div className ="grow flex">
                      <button
                        onClick ={() => setIsReview(!isReview)}
                        className="mr-2 md:w-1/2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                      >Review</button>
                      <button
                        className=" md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                      >Report</button>
                      {isReview && (
                        <div className="flex lg:flex-row flex-col">
                        <PopupReview
                          close = {close}
                          finish = {finish}
                          />
                        </div>
                      )}
                    </div>
                  }
                    {row.status === "Shipping" &&
                      <div className ="grow flex">
                        <button
                          className="mr-2 md:w-1/2 bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                          >Cancel</button>
                        <button
                          className=" md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                          >Report</button>
                      </div>
                    }
                    {row.status === "Expense" &&
                      <div className ="grow flex">
                        <button
                          className="mr-2 md:w-1/2 bg-yellow-500 py-2 px-4 text-white font-semibold rounded-md border-2 border-transparent "
                          >Waiting</button>
                        <button
                          className="md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                          >Report</button>
                      </div>
                    }
                    {row.status === "Cancel" &&
                      <div className ="grow flex">
                        <button
                          className="md:w-full bg-orange-500 py-2 px-16 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                          >Report</button>
                      </div>
                    }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:hidden">
        {getCurrentPageData().map((row) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={row.shopName}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <a
                  href="/#"
                  className="text-blue-500 font-bold hover:underline"
                >
                  shopName {row.shopName}
                </a>
              </div>
              <div className="text-gray-500">{row.orderDate}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                    row.status === "ONL"
                      ? "text-green-800 bg-green-200"
                      : row.status === "OFF > 15 day"
                      ? "text-gray-800 bg-gray-200"
                      : row.status === "OFF"
                      ? "text-yellow-800 bg-yellow-200"
                      : ""
                  } rounded-lg bg-opacity-50`}
                >
                  {row.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">product order: {row.product}</div>
            <div className="text-sm font-medium text-black">${row.price}</div>
            <div className="flex justify-end">
              <button className="text-blue-500 font-bold hover:underline">
                <FaPen />
              </button>
              <button className="text-red-500 font-bold hover:underline ml-2">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 flex-col lg:flex-row">
        <div className="flex items-center w-full mb-10">
          <label htmlFor="rowsPerPage" className="mr-2">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            className="border border-gray-300 rounded-md p-1"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div className="flex">
          <a
            href="/#"
            className="px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </div>
          </a>
          <a
            href="/#"
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            1
          </a>
          <a
            href="/#"
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            2
          </a>
          <a
            href="/#"
            className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            3
          </a>
          <a
            href="/#"
            className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            4
          </a>
          <a
            href="/#"
            className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            5
          </a>
          <a
            href="/#"
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TableItem;
