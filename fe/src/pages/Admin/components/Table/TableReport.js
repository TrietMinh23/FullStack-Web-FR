import React, {useState, useEffect} from "react";
import {FaTrashAlt, FaPen} from "react-icons/fa";
import {PiMagnifyingGlass} from "react-icons/pi";
import {AiOutlineCheckCircle} from "react-icons/ai";
import PopupProcess from "../PopUp/PopupProcess";
import {updateReport} from "../../../../api/Report/updateReport";

const Table = ({rows}) => {
  const [perPage, setPerPage] = useState(5); // Số hàng trên mỗi trang
  const [currentPage] = useState(1); // Trang hiện tại
  const [sortColumn, setSortColumn] = useState(""); // Cột hiện tại được sắp xếp
  const [sortOrder, setSortOrder] = useState(""); // Thứ tự sắp xếp ('asc' hoặc 'desc')
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn
  const [selectAll, setSelectAll] = useState(false); // Tất cả sản phẩm được chọn
  const [isHandle, setIsHandle] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [isProcess, setIsProcess] = useState(false);

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
  };

  const Update = async (data) => {
    await updateReport({_id: data})
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
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (event, item) => {
    const {checked} = event.target;

    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) =>
            selectedItem._id!== item._id
        )
      );
    }
  };

  const handleSelectAllChange = (event) => {
    const {checked} = event.target;

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
    return sortedData?.slice(startIndex, endIndex);
  };
  const formatDate = (date) => {
    const options = {year: "numeric", month: "short", day: "numeric"};
    const parts = new Date(date)
      .toLocaleDateString(undefined, options)
      .split(" ");
    return `${parts[1]} ${parts[0]}, ${parts[2]}`;
  };
  useEffect(() => {
    console.log("right?",rows);
  },[rows]);
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
          onChange={handleSearch}
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
                className="w-24 p-3 text-sm font-semibold tracking-wide text-center"
                onClick={() => handleSort("id_reported.name")}
              >
                Reported{" "}
                {sortColumn === "id_reported.name" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
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
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">
                Status
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
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (item) => item._id === row._id
                    )}
                    onChange={(event) => handleCheckboxChange(event, row)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.id_reporter.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {row.id_reported.name}
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
              <div>
                <a
                  href="/#"
                  className="text-blue-500 font-bold hover:underline"
                >
                  id_reporter.name {row.id_reporter.name}
                </a>
              </div>
              <div className="text-gray-500">{row.createdAt}</div>
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
              Post Date: {row.createdAt}
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
      {isProcess && (
        <div className="flex lg:flex-row flex-col">
          <PopupProcess
            close={closeProcess}
            finish={finishProcess}
            i={isHandle}
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
