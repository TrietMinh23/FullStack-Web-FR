import React, { useState, useEffect } from "react";
import PopUpInforSeller from "../PopUp/PopUpInforSeller";
import { blockSeller, unblockSeller } from "../../../../api/seller";
import { TbLockOpen, TbLock } from "react-icons/tb";
import { FcInfo } from "react-icons/fc";
import PaginationComponent from "../../../Home/components/Pagination";
import formatNumberWithCommas from "../../../../utils/formatNumberWithCommas";

const Table = ({
  rows,
  onPageChange,
  page,
  onPerPageChange,
  perPage,
  totalPages,
  onSearchTermChange,
}) => {
  const [currentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [detailInfor, setDetailInfor] = useState(false);
  const [indexInfor, setIndexInfor] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const closeSee = () => {
    setDetailInfor(false);
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

  const handleBlockUser = async () => {
    try {
      const userIsBlock = selectedItems.map((item) => item._id);
      for (const orderId of userIsBlock) {
        await blockSeller(orderId);
      }
      setSelectedItems([]);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUnblockUser = async () => {
    try {
      const userIsBlock = selectedItems.map((item) => item._id);
      for (const orderId of userIsBlock) {
        await unblockSeller(orderId);
      }
      setSelectedItems([]);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBlockUserRow = async (item) => {
    try {
      setIsUpdating(true);
      await blockSeller(item._id);
      // Handle success or update your local data accordingly
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem.tradeCode !== item.tradeCode
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating order status:", error.message);
      // Handle error or display an error message
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUnblockUserRow = async (item) => {
    try {
      setIsUpdating(true);
      await unblockSeller(item._id);
      // Handle success or update your local data accordingly
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem.tradeCode !== item.tradeCode
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating order status:", error.message);
      // Handle error or display an error message
    } finally {
      setIsUpdating(false);
    }
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
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const parts = new Date(date)
      .toLocaleDateString(undefined, options)
      .split(" ");
    return `${parts[1]} ${parts[0]}, ${parts[2]}`;
  };

  return (
    <div className="p-5 h-full bg-gray-100 w-full rounded-md">
      <h1 className="text-xl mb-2">All sellers</h1>

      {/* Search and Delete */}
      <div className="flex items-center mb-4">
        <div className="flex justify-start w-1/2">
          <label htmlFor="search" className="xl:mr-2">
            <span className="xl:block hidden">Search:</span>
          </label>
          <input
            id="search"
            type="text"
            className="border border-gray-300 rounded-md p-1 w-full"
            value={searchTerm}
            onChange={updateSearchTerm}
          />
        </div>
        <div className="flex justify-end w-1/2">
          <button
            className="ml-2 p-2 hover:bg-red-600 bg-red-500 text-white rounded-md flex items-center"
            onClick={handleBlockUser}
          >
            <TbLock className="xl:mr-2" />{" "}
            <span className="xl:block hidden">Block</span>
          </button>
          <button
            className="ml-2 p-2 hover:bg-green-600 bg-green-500 text-white rounded-md items-center flex"
            onClick={handleUnblockUser}
          >
            <TbLockOpen className="xl:mr-2" />{" "}
            <span className="xl:block hidden">Unblock</span>
          </button>
        </div>
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
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("name")}
              >
                Username{" "}
                {sortColumn === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("positiveCount")}
              >
                Positive Reviews{" "}
                {sortColumn === "positiveCount" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("negativeCount")}
              >
                Negative Reviews{" "}
                {sortColumn === "negativeCount" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("totalSales")}
              >
                Total Income{" "}
                {sortColumn === "totalSales" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("isBlocked")}
              >
                Status{" "}
                {sortColumn === "isBlocked" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("createdAt")}
              >
                Sign up date{" "}
                {sortColumn === "createdAt" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-center">
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
                <td className="p-3 text-sm text-center text-gray-700 whitespace-nowrap text-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.some((item) => item._id === row._id)}
                    onChange={(event) => handleCheckboxChange(event, row)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.positiveCount}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.negativeCount}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {formatNumberWithCommas(row.totalSales)}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap text-center">
                  <span
                    className={
                      "block text-center p-2 rounded-md bg-opacity-50  " +
                      (row.isBlocked === false
                        ? "text-green-800 bg-green-200"
                        : "text-red-800 bg-red-200")
                    }
                  >
                    {row.isBlocked === false ? "Active" : "Blocked"}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {formatDate(row.createdAt)}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  <button
                    onClick={() => {
                      setDetailInfor(true);
                      setIndexInfor(index);
                    }}
                    className="text-blue-500 font-bold hover:underline hover:text-blue-600"
                  >
                    <FcInfo />
                  </button>
                  <button
                    className="text-red-500 font-bold hover:underline ml-2 hover:text-red-600"
                    onClick={() => handleBlockUserRow(row)}
                  >
                    <TbLock />
                  </button>
                  <button
                    className="text-green-500 font-bold hover:underline ml-2 hover:text-green-600"
                    onClick={() => handleUnblockUserRow(row)}
                  >
                    <TbLockOpen />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:hidden">
        {getCurrentPageData().map((row, index) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={row._id}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div className="text-blue-500 font-bold">
                {row.name}
              </div>
              <div className="text-gray-500">{formatDate(row.createdAt)}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                    row.isBlocked === false
                      ? "text-green-800 bg-green-200"
                      : "text-red-800 bg-red-200"
                  } rounded-lg bg-opacity-50`}
                >
                  {row.isBlocked === false ? "Active" : "Blocked"}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              Positives:{" "}
              <span className="text-sky-500">{row.positiveCount}</span>,
              Negatives:{" "}
              <span className="text-red-400">{row.negativeCount}</span>
            </div>
            <div className="text-sm font-medium text-black">
              VND {formatNumberWithCommas(row.totalSales)}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setDetailInfor(true);
                  setIndexInfor(index);
                }}
                className="text-blue-500 font-bold hover:underline hover:text-blue-600"
              >
                <FcInfo />
              </button>
              <button
                className="text-red-500 font-bold hover:underline ml-2 hover:text-red-600"
                onClick={() => handleBlockUserRow(row)}
              >
                <TbLock />
              </button>
              <button
                className="text-green-500 font-bold hover:underline ml-2 hover:text-green-600"
                onClick={() => handleBlockUserRow(row)}
              >
                <TbLockOpen />
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
        <div className="flex w-full justify-end">
          <PaginationComponent
            setPage={onPageChange}
            page={page}
            totalPage={totalPages}
          />
        </div>
      </div>
      {detailInfor && (
        <div className="flex lg:flex-row flex-col">
          <PopUpInforSeller
            close={closeSee}
            i={indexInfor}
            data={rows}
            at={document.documentElement.scrollTop}
          />
          <div id="dimScreen" className={"block"}></div>
        </div>
      )}
    </div>
  );
};

export default Table;
