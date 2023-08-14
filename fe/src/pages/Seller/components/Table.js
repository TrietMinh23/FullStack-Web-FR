import React, { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import PaginationComponent from "../../Home/components/Pagination";
import { deleteProduct } from "../../../api/products";

export default function Table({
  rows,
  nameTable,
  onPageChange,
  page,
  onPerPageChange,
  perPage,
  onSelectEditRow,
}) {
  // const [perPage, setPerPage] = useState(5); // Số hàng trên mỗi trang
  const [currentPage] = useState(1); // Trang hiện tại
  const [sortColumn, setSortColumn] = useState("postDate"); // Cột hiện tại được sắp xếp
  const [sortOrder, setSortOrder] = useState("desc"); // Thứ tự sắp xếp ('asc' hoặc 'desc')
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn
  const [selectAll, setSelectAll] = useState(false); // Tất cả sản phẩm được chọn

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
      window.location.reload();
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
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditRow = (item) => {
    onSelectEditRow(item.tradeCode); // Call the provided prop with the TradeCode
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
      <h1 className="text-xl mb-2">{nameTable}</h1>

      <div className="flex items-center mb-4">
        <label htmlFor="search" className="mr-2 hidden lg:block">
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
          className="ml-2 p-2 bg-red-500 text-white rounded-md lg:p-4"
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
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortColumn === "status" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("postDate")}
              >
                Post date{" "}
                {sortColumn === "postDate" && (sortOrder === "asc" ? "▲" : "▼")}
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
                key={row.tradeCode}
              >
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (item) => item.tradeCode === row.tradeCode
                    )}
                    onChange={(event) => handleCheckboxChange(event, row)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.tradeCode}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <div className="w-12 h-12 overflow-hidden m-1 rounded-lg">
                    <img
                      src={row.image}
                      alt={row.tradeCode}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.itemName}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.price}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap ">
                  <span
                    className={
                      "block text-center p-2 rounded-md bg-opacity-50  " +
                      (row.status == "Available" || row.status == "0"
                        ? "text-green-800 bg-green-200"
                        : row.status == "Sold out"
                        ? "text-gray-800 bg-gray-200"
                        : row.status == "Shipping"
                        ? "text-yellow-800 bg-yellow-200"
                        : row.status == "Refund" || row.status == "1"
                        ? "text-red-800 bg-red-200"
                        : "")
                    }
                  >
                    {row.status == "0" ? "Available" : "Sold"}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.postDate}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {getCurrentPageData().map((row) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={row.tradeCode}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <span className="text-blue-500 font-bold">
                  TradeCode: ..{row.tradeCode.slice(-2)}
                </span>
              </div>
              <div className="text-gray-500">{row.postDate}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                    row.status == "Available" || row.status == "0"
                      ? "text-green-800 bg-green-200"
                      : row.status == "Sold out"
                      ? "text-gray-800 bg-gray-200"
                      : row.status == "Shipping"
                      ? "text-yellow-800 bg-yellow-200"
                      : row.status == "Refund" || row.status == "1"
                      ? "text-red-800 bg-red-200"
                      : ""
                  } rounded-lg bg-opacity-50`}
                >
                  {row.status == "0" ? "Available" : "Sold"}
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
                onClick={handleDelete}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 flex-col lg:flex-row">
        <div className="flex items-center w-full">
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
        <div className="flex w-full justify-end">
          <PaginationComponent setPage={onPageChange} page={page} />
        </div>
      </div>
    </div>
  );
}
