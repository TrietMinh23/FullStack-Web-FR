import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import PopupReview from "./Popup/PopupReview";
import PopupCancel from "./Popup/PopupCancel";
import moment from "moment";
import PopupReport from "./Popup/PopupReport";
import { getOrdersByUserId } from "../../../../api/order";
import PaginationComponent from "../../../Home/components/Pagination";

const TableItem = (
  {rows,
  onPageChange,
  page,
  onPerPageChange,
  perPage,
  totalPages,
  onSearchTermChange,}
) => {
  const [currentPage] = useState(1); // Trang hiện tại
  const [sortColumn, setSortColumn] = useState(""); // Cột hiện tại được sắp xếp
  const [sortOrder, setSortOrder] = useState(""); // Thứ tự sắp xếp ('asc' hoặc 'desc')
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [isReview, setIsReview] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isReport, setIsReport] = useState(false);
  // const [isAlReview, setIsAlReview] = useState(false);

  const [indexReview, setIndexReview] = useState("");
  const [indexReport, setIndexReport] = useState("");
  const [indexCancel, setIndexCancel] = useState("");

  const closeReview = () => {
    setIsReview(false);
  };
  const finishReview = () => {
    setIsReview(false);
    // setIsAlReview(true);
  };
  const closeCancel = () => {
    setIsCancel(false);
  };
  const finishCancel = () => {
    setIsCancel(false);
  };
  const closeReport = () => {
    setIsReport(false);
  };

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

  const updateSearchTerm = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchTermChange(newSearchTerm); // Call the callback prop
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

    return sortedData?.slice(startIndex, endIndex);
  };

  useEffect(() => {
    console.log("right?",rows);
  },[rows]);
  return (
    <div className="p-5 h-full bg-gray-100 w-full rounded-md">
      <h1 className="text-xl mb-2">All Orders</h1>

      <div className="flex items-center mb-4">
        <label htmlFor="search" className="mr-2">
          Search:
        </label>
        <input
          id="search"
          type="text"
          className="border border-gray-300 rounded-md p-1"
          value={searchTerm}
          onChange={updateSearchTerm}
        />
      </div>

      <div className="overflow-auto rounded-lg shadow hidden xl:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th
                className="w-20 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("shopName")}
              >
                Shop Name{" "}
                {sortColumn === "shopName" && (sortOrder === "asc" ? "▲" : "▼")}
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
                className="w-24 p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("orderStatus")}
              >
                Status{" "}
                {sortColumn === "orderStatus" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("orderDate")}
              >
                order Date{" "}
                {sortColumn === "orderDate" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {getCurrentPageData()?.map((row, index) => (
              <tr
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                key={index}
              >
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.products[0].sellerId.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.products.map((item) => (
                    <p>{item.title}</p>
                  ))}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.products.map((item) => (
                    <p>{item.price}</p>
                  ))}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap ">
                  <span
                    className={
                      "block text-center p-2 rounded-md bg-opacity-50  " +
                      (row.orderStatus === "Delivered"
                      ? "text-green-800 bg-green-200"
                      : row.orderStatus === "Processing"
                      ? "text-gray-800 bg-yellow-200"
                      : row.orderStatus === "Dispatched"
                      ? "text-gray-800 bg-blue-200"
                      : row.orderStatus === "Not Processed"
                      ? "text-gray-800 bg-orange-200"
                      : row.orderStatus === "Cancelled"
                      ? "text-red-800 bg-red-200"
                      : "")
                    }
                  >
                    {row.orderStatus}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {moment(row.orderDate).format("DD/MM/YYYY")}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.orderStatus === "Delivered" && (
                    <div className="grow flex">
                      <button
                        onClick={() => {
                          setIsReview(!isReview);
                          setIndexReview(index);
                        }}
                        className={`mr-2 md:w-1/2 bg-green-sheen text-white font-semibold rounded-md border-2 border-transparent hover:border-2 hover:border-green-sheen hover:text-green-sheen hover:bg-white
                        `}
                      >
                        Review
                      </button>
                      <button
                        onClick={() => {
                          setIsReport(!isReport);
                          setIndexReport(index);
                        }}
                        className=" md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                      >
                        Report
                      </button>
                    </div>
                  )}
                  {row.orderStatus === "Dispatched" && (
                    <div className="grow flex">
                      <button
                        onClick={() => {
                          setIsCancel(!isCancel);
                          setIndexCancel(index);
                        }}
                        className="mr-2 md:w-1/2 bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setIsReport(!isReport);
                          setIndexReport(index);
                        }}
                        className=" md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                      >
                        Report
                      </button>
                    </div>
                  )}
                  {(row.orderStatus === "Processing" ||  row.orderStatus === "Not Processed") && (
                    <div className="grow flex">
                      <button className="mr-2 md:w-1/2 bg-yellow-500 py-2 px-4 text-white font-semibold rounded-md border-2 border-transparent ">
                        Waiting
                      </button>
                      <button
                        onClick={() => {
                          setIsReport(!isReport);
                          setIndexReport(index);
                        }}
                        className=" md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                      >
                        Report
                      </button>
                    </div>
                  )}
                  {row.orderStatus === "Cancelled" && (
                    <div className="grow flex">
                      <button
                        onClick={() => {
                          setIsReport(!isReport);
                          setIndexReport(index);
                        }}
                        className="md:w-full bg-orange-500 py-2 px-16 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                      >
                        Report
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:hidden">
        {getCurrentPageData()?.map((row, index) => (
          <div className="bg-white space-y-3 p-4 rounded-lg shadow" key={index}>
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <a
                  href="/#"
                  className="text-blue-500 font-bold hover:underline"
                >
                  shopName {row.products[0].sellerId.name}
                </a>
              </div>
              <div className="text-gray-500">{row.orderDate}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                    row.orderStatus === "Delivered"
                      ? "text-green-800 bg-green-200"
                      : row.orderStatus === "Processing"
                      ? "text-gray-800 bg-yellow-200"
                      : row.status === "Dispatched"
                      ? "text-gray-800 bg-blue-200"
                      : row.orderStatus === "Not Processed"
                      ? "text-gray-800 bg-orange-200"
                      : row.status === "Cancelled"
                      ? "text-red-800 bg-red-200"
                      : ""
                  } rounded-lg bg-opacity-50`}
                >
                  {row.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              product order: {row.product}
            </div>
            <div className="text-sm font-medium text-black">${row.price}</div>
            <div className="flex justify-end">
              {row.orderStatus === "Delivered" && (
                <div className="grow flex">
                  <button
                    onClick={() => {
                      setIsReview(!isReview);
                      setIndexReview(index);
                    }}
                    className="mr-2 md:w-1/2 bg-green-sheen py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-green-sheen hover:text-green-sheen"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => {
                      setIsReport(!isReport);
                      setIndexReport(index);
                    }}
                    className=" md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                  >
                    Report
                  </button>
                </div>
              )}
              {row.orderStatus === "Dispatched" && (
                <div className="grow flex">
                  <button
                    onClick={() => {
                      setIsCancel(!isCancel);
                      setIndexCancel(index);
                    }}
                    className="mr-2 md:w-1/2 bg-red-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-red-500 hover:text-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsReport(!isReport);
                      setIndexReport(index);
                    }}
                    className=" md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                  >
                    Report
                  </button>
                </div>
              )}
              {(row.orderStatus === "Processing"||row.orderStatus === "Not Processed" ) && (
                <div className="grow flex">
                  <button className="mr-2 md:w-1/2 bg-yellow-500 py-2 px-4 text-white font-semibold rounded-md border-2 border-transparent ">
                    Waiting
                  </button>
                  <button
                    onClick={() => {
                      setIsReport(!isReport);
                      setIndexReport(index);
                    }}
                    className=" md:w-1/2 bg-orange-500 py-2 px-4 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                  >
                    Report
                  </button>
                </div>
              )}
              {row.orderStatus === "Cancelled" && (
                <div className="grow flex">
                  <button
                    onClick={() => {
                      setIsReport(!isReport);
                      setIndexReport(index);
                    }}
                    className="md:w-full bg-orange-500 py-2 px-16 text-white font-semibold rounded-md hover:bg-white border-2 border-transparent  hover:border-2 hover:border-orange-500 hover:text-orange-500"
                  >
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 flex-col lg:flex-row">
        <div className="flex items-center w-full mb-10">
          <label htmlFor="rowsPerPage" className="mr-2">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            className="border border-gray-300 rounded-md p-1 w-12"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div className="flex w-full justify-end">
          <PaginationComponent setPage={onPageChange} page={page} totalPage={totalPages}/>
        </div>
      </div>

      {isReport && (
        <div className="flex lg:flex-row flex-col">
          <PopupReport
            close={closeReport}
            i={indexReport}
            at={document.documentElement.scrollTop}
            data={rows}
          />
          <div id="dimScreen" className={"block "}></div>
        </div>
      )}
      {isCancel && (
        <div className="flex lg:flex-row flex-col">
          <PopupCancel
            close={closeCancel}
            finish={finishCancel}
            at={document.documentElement.scrollTop}
          />
          <div id="dimScreen" className={"block "}></div>
        </div>
      )}
      {isReview && (
        <div className="flex lg:flex-row flex-col">
          <PopupReview
            close={closeReview}
            i={indexReview}
            at={document.documentElement.scrollTop}
            finish = {finishReview}
            data ={rows}
          />
          <div id="dimScreen" className={"block "}></div>
        </div>
      )}
    </div>
  );
};

export default TableItem;
