import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import PopupReview from "./Popup/PopupReview";
import PaginationComponent from "../../Home/components/Pagination";
import Rating from "@mui/material/Rating";

export default function TableReview({
  rows,
  onPageChange,
  page,
  onPerPageChange,
  perPage,
  totalPages,
  onSearchTermChange,
}) {
  const [currentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [indexReview, setIndexReview] = useState(0);
  const [detailReview, setDetailReview] = useState(false);

  const closeSee = () => {
    setDetailReview(false);
  };
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Update the search term when input changes
  const updateSearchTerm = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchTermChange(newSearchTerm); // Call the callback prop
  };

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem._id !== item._id
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
  useEffect(() => {
    console.log(rows);
  }, [rows]);
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const parts = new Date(date)
      .toLocaleDateString(undefined, options)
      .split(" ");
    return `${parts[1]} ${parts[0]}, ${parts[2]}`;
  };
  return (
    <div className="p-5 h-full bg-gray-100 w-full rounded-md">
      <h1 className="text-xl mb-2">All reviews</h1>

      {/* Search and Delete */}
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
        <button
          className="ml-2 p-2 hover:bg-red-600 bg-red-500 text-white rounded-md"
          onClick={handleDelete}
        >
          <FaTrashAlt />
        </button>
      </div>

      {/* Desktop Table */}
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
                onClick={() => handleSort("_id")}
              >
                ID {sortColumn === "_id" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("buyer")}
              >
                Buyer{" "}
                {sortColumn === "buyer" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("star")}
              >
                Star{" "}
                {sortColumn === "star" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("comment")}
              >
                Comment{" "}
                {sortColumn === "comment" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("createdAt")}
              >
                Post date{" "}
                {sortColumn === "createdAt" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {getCurrentPageData().map((row, index) => (
              <tr
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                key={row._id}
              >
                <td className="p-3 text-sm text-center text-gray-700 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.some((item) => item._id === row._id)}
                    onChange={(event) => handleCheckboxChange(event, row)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <div className="w-20 truncate">{row._id}</div>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.buyer.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.rating.star}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                  <div className="w-40 truncate">{row.rating.comment}</div>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {formatDate(row.createdAt)}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex justify-center">
                  <button
                    className="text-blue-500 font-bold "
                    onClick={() => {
                      setIndexReview(index);
                      setDetailReview(true);
                    }}
                  >
                    <AiFillEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:hidden">
        {getCurrentPageData().map((row) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={row._id}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <a
                  href="/#"
                  className="text-blue-500 font-bold hover:underline"
                >
                  {row._id}
                </a>
              </div>
              <div className="text-gray-500">{formatDate(row.createdAt)}</div>
            </div>
            <div className="text-sm text-gray-700">
              Buyer <span className="text-sky-500">{row.buyer.name}</span>
            </div>
            <div className="text-sm font-medium text-black">
              <Rating name="read-only" readOnly value={row.rating.star} />
            </div>
            <div className="text-sm font-medium text-black truncate">
              Rating comment: {row.rating.comment}
            </div>
            <div className="flex justify-end">
              <button className="text-blue-500 font-bold hover:underline">
                <AiFillEye />
              </button>
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
        <PaginationComponent setPage={onPageChange} page={page} totalPage={totalPages}/>
      </div>
      {detailReview && (
        <div className="flex lg:flex-row flex-col">
          <PopupReview
            close={closeSee}
            i={indexReview}
            data={rows}
            at={document.documentElement.scrollTop}
          />
          <div id="dimScreen" className={"block"}></div>
        </div>
      )}
    </div>
  );
}
