import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { PiMagnifyingGlass } from "react-icons/pi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import PopupProcess from "../PopUp/PopupProcess";
import { updateReport } from "../../../../api/Report/updateReport";
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
  const [isHandle, setIsHandle] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [isProcess, setIsProcess] = useState(false);

  const updateSearchTerm = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchTermChange(newSearchTerm); // Call the callback prop
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

  const finishProcess = () => {
    setIsProcess(false);
    rows[isHandle].status = "Done";
    Update(rows[isHandle]._id);
    window.location.reload();
  };

  const Update = async (data) => {
    await updateReport({ _id: data })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const closeProcess = () => {
    setIsProcess(false);
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
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const parts = new Date(date)
      .toLocaleDateString(undefined, options)
      .split(" ");
    return `${parts[1]} ${parts[0]}, ${parts[2]}`;
  };
  useEffect(() => {
    console.log("right?", rows);
  }, [rows]);

  return (
    <div className="p-5 h-full bg-gray-100 w-full rounded-md">
      <h1 className="text-xl mb-2">All Reports</h1>

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

      <div className="overflow-auto rounded-lg shadow hidden lg:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th
                className="w-20 p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("id_reporter.name")}
              >
                Reporter{" "}
                {sortColumn === "id_reporter.name" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("id_reporter.isBlocked")}
              >
                Status Reporter{" "}
                {sortColumn === "id_reporter.isBlocked" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("id_reported.name")}
              >
                Reported{" "}
                {sortColumn === "id_reported.name" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("id_reported.isBlocked")}
              >
                Status Reported{" "}
                {sortColumn === "id_reported.isBlocked" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("title")}
              >
                Report title{" "}
                {sortColumn === "title" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("createdAt")}
              >
                Post date{" "}
                {sortColumn === "createdAt" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="w-32 p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortColumn === "status" && (sortOrder === "asc" ? "▲" : "▼")}
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
                key={row.id_reporter._id}
              >
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.id_reporter.name}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap ">
                  <span
                    className={
                      "block text-center p-2 rounded-md bg-opacity-50  " +
                      (row.id_reporter.isBlocked === false
                        ? "text-green-800 bg-green-200"
                        : "text-red-800 bg-red-200")
                    }
                  >
                    {row.id_reporter.isBlocked === false ? "Active" : "Blocked"}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.id_reported.name}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap ">
                  <span
                    className={
                      "block text-center p-2 rounded-md bg-opacity-50  " +
                      (row.id_reported.isBlocked === false
                        ? "text-green-800 bg-green-200"
                        : "text-red-800 bg-red-200")
                    }
                  >
                    {row.id_reported.isBlocked === false ? "Active" : "Blocked"}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.title}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {formatDate(row.createdAt)}
                </td>
                <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap text-center">
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                      row.status === "Done"
                        ? "text-green-800 bg-green-200"
                        : row.status === "Pending"
                        ? "text-yellow-800 bg-yellow-200"
                        : ""
                    } rounded-lg bg-opacity-50`}
                  >
                    {row.status}
                  </span>
                </td>
                {row.status === "Done" ? (
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    <button className="text-blue-500 font-bold hover:underline">
                      <AiOutlineCheckCircle className="w-5 h-5 text-blue-500" />
                    </button>
                  </td>
                ) : (
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    <button
                      onClick={() => {
                        setIsProcess(!isProcess);
                        setIsHandle(index);
                      }}
                      className="text-blue-500 font-bold hover:underline "
                    >
                      <PiMagnifyingGlass className="w-5 h-5 text-blue-500" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {getCurrentPageData()?.map((row, index) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={row.id_reporter.name}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div className="text-blue-500 font-bold ">
                {row.id_reporter.name} reported {row.id_reported.name}
              </div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                    row.status === "Done"
                      ? "text-green-800 bg-green-200"
                      : row.status === "Pending"
                      ? "text-yellow-800 bg-yellow-200"
                      : ""
                  } rounded-lg bg-opacity-50`}
                >
                  {row.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">{row.title}</div>
            <div className="text-sm font-medium text-black ">
              Post Date: {formatDate(row.createdAt)}
            </div>
            <div className="flex justify-end">
              {row.status === "Done" ? (
                <button className="text-blue-500 font-bold hover:underline">
                  <AiOutlineCheckCircle className="w-5 h-5 text-blue-500" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsProcess(!isProcess);
                    setIsHandle(index);
                  }}
                  className="text-blue-500 font-bold hover:underline "
                >
                  <PiMagnifyingGlass className="w-5 h-5 text-blue-500" />
                </button>
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
          <PaginationComponent
            setPage={onPageChange}
            page={page}
            totalPage={totalPages}
          />
        </div>
      </div>
      {isProcess && (
        <div className="flex lg:flex-row flex-col">
          <PopupProcess
            close={closeProcess}
            finish={finishProcess}
            i={isHandle}
            data={rows}
          />
          <div id="dimScreen" className={"block"}></div>
        </div>
      )}
    </div>
  );
};

export default Table;
