import React, { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import PaginationComponent from "../../Home/components/Pagination";
import { deleteProduct } from "../../../api/products";

export default function TableOrders({
  rows,
  nameTable,
  onPageChange,
  page,
  onPerPageChange,
  perPage,
  onSelectEditRow,
}) {
    
  const [currentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("postDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
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
          (selectedItem) => selectedItem.tradeCode !== item.tradeCode
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

  const handleDelete = async () => {
    try {
      const productIdsToDelete = selectedItems.map((item) => item.tradeCode);
      for (const productId of productIdsToDelete) {
        await deleteProduct(productId);
      }
      setSelectedItems([]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteRow = async (item) => {
    try {
      await deleteProduct(item.tradeCode);
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem.tradeCode !== item.tradeCode
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditRow = (item) => {
    onSelectEditRow(item.tradeCode);
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

    const mergedData = [];
    let currentTradeCode = null;
    let mergedRows = [];

    for (const row of sortedData) {
      if (row.tradeCode === currentTradeCode) {
        mergedRows.push(row);
      } else {
        if (mergedRows.length > 0) {
          mergedData.push(mergedRows);
        }
        mergedRows = [row];
        currentTradeCode = row.tradeCode;
      }
    }

    if (mergedRows.length > 0) {
      mergedData.push(mergedRows);
    }

    return mergedData.slice(startIndex, endIndex);
  };

  return (
    <div className="p-5 h-full bg-gray-100 w-full rounded-md">
      <h1 className="text-xl mb-2">{nameTable}</h1>

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
          id="All"
          className="ml-2 p-4 bg-red-500 text-white rounded-md"
          onClick={handleDelete}
        >
          <FaTrashAlt />
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow hidden lg:block">
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
                onClick={() => handleSort("tradeCode")}
              >
                TradeCode{" "}
                {sortColumn === "tradeCode" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Image
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("itemName")}
              >
                Item name{" "}
                {sortColumn === "itemName" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("price")}
              >
                Price{" "}
                {sortColumn === "price" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("payment")}
              >
                Payment{" "}
                {sortColumn === "payment" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortColumn === "status" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("orderBy")}
              >
                Order By{" "}
                {sortColumn === "orderBy" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("mobile")}
              >
                Mobile Phone{" "}
                {sortColumn === "mobile" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("address")}
              >
                Address{" "}
                {sortColumn === "address" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("postDate")}
              >
                Order date{" "}
                {sortColumn === "postDate" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {getCurrentPageData().map((mergedRows, index) => (
              <tr
                className={(index % 2 === 0 ? "bg-white" : "bg-gray-50")}
                key={index}
              >
                <td
                  colSpan="12"
                  className="p-3 text-sm text-gray-700 whitespace-nowrap"
                >
                  {mergedRows.map((row, subIndex) => (
                    <div
                      key={row.tradeCode + subIndex}
                      className="flex justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.some(
                            (item) => item.tradeCode === row.tradeCode
                          )}
                          onChange={(event) =>
                            handleCheckboxChange(event, row)
                          }
                        />
                        <span>{row.tradeCode}</span>
                        {subIndex === 0 ? (
                          <img
                            src={row.image}
                            alt={row.tradeCode}
                            className="w-8 h-8 object-cover rounded-full"
                          />
                        ) : null}
                        <span>{row.itemName}</span>
                        <span>${row.price}</span>
                        <span>{row.payment}</span>
                        <span
                          className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                            row.status === "Available"
                              ? "text-green-800 bg-green-200"
                              : row.status === "Sold out"
                              ? "text-gray-800 bg-gray-200"
                              : row.status === "Shipping"
                              ? "text-yellow-800 bg-yellow-200"
                              : row.status === "Refund"
                              ? "text-red-800 bg-red-200"
                              : ""
                          }`}
                        >
                          {row.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{row.orderBy}</span>
                        <span>{row.mobile}</span>
                        <span>{row.address}</span>
                        <span>{row.orderDate}</span>
                        <button
                          className="text-blue-500 font-bold hover:underline"
                          onClick={() => handleEditRow(row)}
                        >
                          <FaPen />
                        </button>
                        <button
                          className="text-red-500 font-bold hover:underline ml-2"
                          onClick={() => handleDeleteRow(row)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {getCurrentPageData().map((mergedRows, index) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={index}
          >
            {mergedRows.map((row, subIndex) => (
              <div
                key={row.tradeCode + subIndex}
                className="space-y-2 border-b pb-2 last:border-b-0"
              >
                <div className="flex items-center space-x-2 text-sm">
                  <div>
                    <a
                      href="/#"
                      className="text-blue-500 font-bold hover:underline"
                    >
                      {row.tradeCode}
                    </a>
                  </div>
                  <div className="text-gray-500">{row.postDate}</div>
                  <div>
                    <span
                      className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                        row.status === "Available"
                          ? "text-green-800 bg-green-200"
                          : row.status === "Sold out"
                          ? "text-gray-800 bg-gray-200"
                          : row.status === "Shipping"
                          ? "text-yellow-800 bg-yellow-200"
                          : row.status === "Refund"
                          ? "text-red-800 bg-red-200"
                          : ""
                      } rounded-lg bg-opacity-50`}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-700">{row.itemName}</div>
                <div className="text-sm font-medium text-black">${row.price}</div>
                <div className="flex justify-end">
                  <button
                    className="text-blue-500 font-bold hover:underline"
                    onClick={() => handleEditRow(row)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="text-red-500 font-bold hover:underline ml-2"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
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
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <PaginationComponent setPage={onPageChange} page={page} />
      </div>
    </div>
  );
}
