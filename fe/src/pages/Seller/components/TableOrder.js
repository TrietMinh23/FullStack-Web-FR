import React, { useState, useEffect } from "react";
import PaginationComponent from "../../Home/components/Pagination";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { updateOrderStatusToDispatched } from "../../../api/order";

export default function TableOrders({
  rows,
  nameTable,
  onPageChange,
  page,
  onPerPageChange,
  perPage,
  totalPages,
  onSearchTermChange,
}) {
  // const [perPage, setPerPage] = useState(5); // Số hàng trên mỗi trang
  const [currentPage] = useState(1); // Trang hiện tại
  const [sortColumn, setSortColumn] = useState("postDate"); // Cột hiện tại được sắp xếp
  const [sortOrder, setSortOrder] = useState("desc"); // Thứ tự sắp xếp ('asc' hoặc 'desc')
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn
  const [selectAll, setSelectAll] = useState(false); // Tất cả sản phẩm được chọn
  const [isUpdating, setIsUpdating] = useState(false);

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
      console.log(item);
    } else {
      console.log(2);
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

  const handleUpdateStatus = async () => {
    try {
      const orderIdsUpdate = selectedItems.map((item) => item.tradeCode);
      for (const orderId of orderIdsUpdate) {
        await updateOrderStatusToDispatched(orderId);
      }
      setSelectedItems([]);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateStatusRow = async (item) => {
    try {
      setIsUpdating(true);
      await updateOrderStatusToDispatched(item.tradeCode);
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

    // Consolidate rows with the same tradeCode
    const groupedData = {};
    sortedData.forEach((row) => {
      if (!groupedData[row.tradeCode]) {
        groupedData[row.tradeCode] = [];
      }
      groupedData[row.tradeCode].push(row);
    });

    const consolidatedData = [];
    Object.keys(groupedData).forEach((tradeCode) => {
      const items = groupedData[tradeCode];
      const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
      const consolidatedRow = {
        ...items[0],
        itemName: items.map((item) => item.itemName).join(", "),
        image: items.map((item) => item.image).join(", "), // Combine image URLs
        price: totalPrice,
      };
      consolidatedData.push(consolidatedRow);
    });

    return consolidatedData.slice(startIndex, endIndex);
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
          onChange={updateSearchTerm}
        />
        <button
          id="All"
          className="ml-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleUpdateStatus}
        >
          <CheckCircleIcon />
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
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Item name{" "}
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
                onClick={() => handleSort("order")}
              >
                Buyer{" "}
                {sortColumn === "order" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Phone{" "}
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Address{" "}
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
            {getCurrentPageData().map((row, index) => (
              <React.Fragment key={row.tradeCode}>
                <tr
                  classNam
                  e={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
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
                    {/* Display each image separately */}
                    <div className="flex flex-wrap">
                      {row.image.split(", ").map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="w-12 h-12 overflow-hidden m-1 rounded-lg"
                        >
                          <img
                            src={image}
                            alt={`${row.tradeCode}_${imgIndex}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row.itemName.split(", ").map((name, nameIndex) => (
                      <div className="py-4">
                        <div key={nameIndex}>{name} </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row.price}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row.payment}
                  </td>
                  <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap">
                    <span
                      className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                        row.status == "Delivered"
                          ? "text-green-800 bg-green-200"
                          : row.status == "Dispatched"
                          ? "text-blue-800 bg-gray-200"
                          : row.status == "Processing"
                          ? "text-yellow-800 bg-yellow-200"
                          : row.status == "Cancelled"
                          ? "text-red-800 bg-red-200"
                          : ""
                      } rounded-lg bg-opacity-50`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row.orderBy}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row.mobile}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row.address}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {row.orderDate}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button
                      className="text-green-500 font-bold hover:underline ml-2 hover:text-green-600"
                      onClick={() => handleUpdateStatusRow(row)}
                    >
                      <CheckCircleIcon />
                    </button>
                  </td>
                </tr>
                {index < getCurrentPageData().length - 1 && (
                  <tr className="h-4">
                    <td colSpan="12"></td>
                  </tr>
                )}
              </React.Fragment>
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
              <div className="text-gray-500">{row.orderDate}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                    row.status == "Delivered"
                      ? "text-green-800 bg-green-200"
                      : row.status == "Dispatched"
                      ? "text-blue-800 bg-gray-200"
                      : row.status == "Processing"
                      ? "text-yellow-800 bg-yellow-200"
                      : row.status == "Cancelled"
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
                className="text-green-500 font-bold hover:underline ml-2 hover:text-green-600"
                onClick={() => handleUpdateStatusRow(row)}
              >
                <CheckCircleIcon />
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
            className="border border-gray-300 rounded-md p-1 w-12"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <PaginationComponent
          setPage={onPageChange}
          page={page}
          totalPage={totalPages}
        />
      </div>
    </div>
  );
}
