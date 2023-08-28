import React, { useState, useEffect } from "react";
import { FcInfo } from "react-icons/fc";
import { TbLock, TbLockOpen } from "react-icons/tb";
import { blockBuyer, unblockBuyer } from "../../../../api/buyer";
import PopUpInforBuyer from "../PopUp/PopUpInforBuyer";
import PaginationComponent from "../../../Home/components/Pagination";

const Table = ({
  rows,
  onPageChange,
  page,
  onPerPageChange,
  perPage,
  totalPages,
  onSearchTermChange,
}) => {
  const [currentPage] = useState(1); // Trang hiện tại
  const [sortColumn, setSortColumn] = useState(""); // Cột hiện tại được sắp xếp
  const [sortOrder, setSortOrder] = useState(""); // Thứ tự sắp xếp ('asc' hoặc 'desc')
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn
  const [selectAll, setSelectAll] = useState(false); // Tất cả sản phẩm được chọn
  const [detailInfor, setDetailInfor] = useState(false);
  const [indexInfor, setIndexInfor] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const parts = new Date(date)
      .toLocaleDateString(undefined, options)
      .split(" ");
    return `${parts[1]} ${parts[0]}, ${parts[2]}`;
  };

  const closeSee = () => {
    setDetailInfor(false);
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
        await blockBuyer(orderId);
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
        await unblockBuyer(orderId);
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
      await blockBuyer(item._id);
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
      await unblockBuyer(item._id);
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

  return (
    <div className="p-5 h-full bg-gray-100 w-full rounded-md">
      <h1 className="text-xl mb-2">All Buyers</h1>

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
                onClick={() => handleSort("sumProcessing")}
              >
                Processing Orders{" "}
                {sortColumn === "sumProcessing" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("sumCancelled")}
              >
                Cancelled Orders{" "}
                {sortColumn === "sumCancelled" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortColumn === "status" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("signUpDate")}
              >
                Sign Up Date{" "}
                {sortColumn === "signUpDate" &&
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
                <td className="p-3 text-sm text-center text-gray-700 whitespace-nowrap">
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
                  {row.sumProcessing}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.sumCancelled}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap ">
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
                    className="text-blue-500 font-bold hover:underline"
                  >
                    <FcInfo />
                  </button>
                  <button
                    className="text-red-500 font-bold hover:underline ml-2"
                    onClick={() => handleBlockUserRow(row)}
                  >
                    <TbLock />
                  </button>
                  <button
                    className="text-green-500 font-bold hover:underline ml-2"
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
              <div className="text-blue-500 font-bold hover:underline">
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
            <div className="text-sm text-gray-900">
              Processing order:{" "}
              <span className="text-sky-500">{row.sumProcessing}</span>
            </div>
            <div className="text-sm text-gray-900">
              Cancelled Orders{" "}
              <span className="text-red-400">{row.sumCancelled}</span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setDetailInfor(true);
                  setIndexInfor(index);
                }}
                className="text-blue-500 font-bold hover:underline"
              >
                <FcInfo />
              </button>
              <button
                className="text-red-500 font-bold hover:underline ml-2"
                onClick={() => handleBlockUserRow(row)}
              >
                <TbLock />
              </button>
              <button
                className="text-green-500 font-bold hover:underline ml-2"
                onClick={() => handleUnblockUserRow(row)}
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
          <PopUpInforBuyer close={closeSee} i={indexInfor} data={rows} />
          <div id="dimScreen" className={"block"}></div>
        </div>
      )}
    </div>
  );
};

export default Table;
