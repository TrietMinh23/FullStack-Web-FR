import React, { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";

const Table = ({ rows }) => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
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
        prevSelectedItems.filter((selectedItem) => selectedItem._id !== item._id)
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
      filteredData = rows.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
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
      <h1 className="text-xl mb-2">All sellers</h1>

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
          onChange={handleSearch}
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
                onClick={() => handleSort("name")}
              >
                Name {sortColumn === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("positiveCount")}
              >
                Positive Orders{" "}
                {sortColumn === "positiveCount" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("negativeCount")}
              >
                Negative Orders{" "}
                {sortColumn === "negativeCount" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("totalSales")}
              >
                Total Income{" "}
                {sortColumn === "totalSales" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("isBlocked")}
              >
                Status{" "}
                {sortColumn === "isBlocked" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort("createdAt")}
              >
                Sign up date{" "}
                {sortColumn === "createdAt" && (sortOrder === "asc" ? "▲" : "▼")}
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
                key={row._id}
              >
                <td className="p-3 text-sm text-center text-gray-700 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (item) => item._id === row._id
                    )}
                    onChange={(event) => handleCheckboxChange(event, row)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.positiveCount}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.negativeCount}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.totalSales}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap">
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

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.createdAt}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button className="text-blue-500 font-bold hover:underline">
                    <FaPen />
                  </button>
                  <button className="text-red-500 font-bold hover:underline ml-2">
                    <FaTrashAlt />
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
                  {row.name}
                </a>
              </div>
              <div className="text-gray-500">{row.createdAt}</div>
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
              Positive reviews: <span className="text-sky-500">{row.positiveCount}</span>, negative reviews: <span className="text-red-400">{row.negativeCount}</span>
            </div>
            <div className="text-sm font-medium text-black">${row.totalSales}</div>
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

      {/* Pagination */}
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
        {/* ... (pagination buttons) */}
      </div>
    </div>
  );
};

export default Table;
