
import React, { useState } from 'react';
import { FaTrashAlt, FaPen } from 'react-icons/fa';

const rows = [
    {
      tradeCode: 99,
      review: 'Vel cras auctor at tortor imperdiet amet id sed rhoncus',
      price: '3,638,066',
      status: 'Available',
      postDate: '2021-02-05 08:28:36',
    },
    {
      tradeCode: 98,
      review: 'Quam aliquam odio ullamcorper ornare eleifend ipsum',
      price: '6,462,020',
      status: 'Refund',
      postDate: '2021-02-03 19:49:33',
    },
    {
      tradeCode: 97,
      review: 'Mauris quam tristique et parturient sapien.',
      price: '8,664,948',
      status: 'Sold out',
      postDate: '2021-02-02 19:17:15',
    },
    {
      tradeCode: 96,
      review: 'Fermentum porttitor amet, vulputate ornare tortor nisi',
      price: '2,592,335',
      status: 'Available',
      postDate: '2021-02-02 09:46:33',
    },
    {
      tradeCode: 95,
      review: 'Sed at ornare scelerisque in facilisis tincidunt',
      price: '6,337,875',
      status: 'Shipping',
      postDate: '2021-02-02 07:57:01',
    },
    {
      tradeCode: 94,
      review: 'Molestie est pharetra eu congue velit felis ipsum velit',
      price: '4,927,239',
      status: 'Shipping',
      postDate: '2021-02-02 05:01:54',
    },
    {
      tradeCode: 93,
      review: 'Et adipiscing vitae amet mauris eget vel.',
      price: '6,241,243',
      status: 'Sold out',
      postDate: '2021-02-02 00:18:11',
    },
    {
      tradeCode: 92,
      review: 'Leo maecenas quis sapien morbi nunc, porta nibh.',
      price: '1,556,493',
      status: 'Refund',
      postDate: '2021-02-01 11:03:33',
    },
    {
      tradeCode: 91,
      review: 'Nulla a aliquet donec curabitur risus blandit.',
      price: '1,199,750',
      status: 'Refund',
      postDate: '2021-01-31 03:42:50',
    },
  ];
  

const Table = () => {
  const [perPage, setPerPage] = useState(5); // Số hàng trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [sortColumn, setSortColumn] = useState(''); // Cột hiện tại được sắp xếp
  const [sortOrder, setSortOrder] = useState(''); // Thứ tự sắp xếp ('asc' hoặc 'desc')
  const [searchTerm, setSearchTerm] = useState(''); // Giá trị tìm kiếm
  const [selectedItems, setSelectedItems] = useState([]); // Các sản phẩm được chọn
  const [selectAll, setSelectAll] = useState(false); // Tất cả sản phẩm được chọn

  const handleSort = (column) => {
    if (column === sortColumn) {
      // Đang sắp xếp theo cột đã chọn, thay đổi thứ tự sắp xếp
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Đang sắp xếp theo một cột khác, đặt cột và thứ tự sắp xếp mới
      setSortColumn(column);
      setSortOrder('asc');
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
        prevSelectedItems.filter((selectedItem) => selectedItem.tradeCode !== item.tradeCode)
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
    // Xử lý xóa các sản phẩm đã chọn (selectedItems)
    // ...

    // Xóa các sản phẩm đã chọn khỏi selectedItems và set lại state
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
        if (sortOrder === 'asc') {
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
      <h1 className="text-xl mb-2">Your orders</h1>

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
          className="ml-2 p-1 bg-red-500 text-white rounded-md"
          onClick={handleDelete}
        >
          <FaTrashAlt />
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow hidden tl:block">
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
                onClick={() => handleSort('tradeCode')}
              >
                TradeCode {sortColumn === 'tradeCode' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort('review')}
              >
                Review {sortColumn === 'review' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort('price')}
              >
                Price {sortColumn === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort('status')}
              >
                Status {sortColumn === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                onClick={() => handleSort('postDate')}
              >
                Post date {sortColumn === 'postDate' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {getCurrentPageData().map((row, index) => (
              <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} key={row.tradeCode}>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.some((item) => item.tradeCode === row.tradeCode)}
                    onChange={(event) => handleCheckboxChange(event, row)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.tradeCode}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.review}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.price}
                </td>
               <td className="p-3 text-xs font-medium uppercase text-gray-700 whitespace-nowrap ">
                  <span className={"block text-center p-2 rounded-md bg-opacity-50  " + (row.status === 'Available'
                      ? "text-green-800 bg-green-200"
                      : row.status === 'Sold out'
                      ? "text-gray-800 bg-gray-200"
                      : row.status === 'Shipping'
                      ? "text-yellow-800 bg-yellow-200"
                      : row.status === 'Refund'
                      ? "text-red-800 bg-red-200"
                      : "")}>{row.status}</span>
</td>

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.postDate}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 tl:hidden">
        {getCurrentPageData().map((row) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={row.tradeCode}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <a href="#" className="text-blue-500 font-bold hover:underline">
                  TradeCode {row.tradeCode}
                </a>
              </div>
              <div className="text-gray-500">{row.postDate}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                    row.status === 'Available'
                      ? 'text-green-800 bg-green-200'
                      : row.status === 'Sold out'
                      ? 'text-gray-800 bg-gray-200'
                      : row.status === 'Shipping'
                      ? 'text-yellow-800 bg-yellow-200'
                      : row.status === 'Refund'
                      ? 'text-red-800 bg-red-200'
                      : ''
                  } rounded-lg bg-opacity-50`}
                >
                  {row.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">{row.review}</div>
            <div className="text-sm font-medium text-black">${row.price}</div>
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

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
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
        <div className="flex items-center">
          <button
            className="px-2 py-1 border border-gray-300 rounded-md mr-2"
            onClick={() =>
              setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
            }
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            className="px-2 py-1 border border-gray-300 rounded-md ml-2"
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < Math.ceil(rows.length / perPage) ? prevPage + 1 : prevPage
              )
            }
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
