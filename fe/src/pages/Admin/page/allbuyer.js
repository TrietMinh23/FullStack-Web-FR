import React, { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import TableAB from "../components/Table/TableAB";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { instance } from "../../../api/config";
import { getBuyerPerformanceStats, countStatusToday } from "../../../api/buyer";

export default function Allbuyer() {
  const [buyerData, setBuyerData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0); // Total number of pages returned by the API
  const [totalSumProcessing, setTotalSumProcessing] = useState(0); // Total number of pages returned by the API
  const [totalSumCancelled, setTotalSumCancelled] = useState(0); // Total number of pages returned by the API
  const [totalSumProcessingToday, setTotalSumProcessingToday] = useState(0); // Total number of pages returned by the API
  const [totalSumCancelledToday, setTotalSumCancelledToday] = useState(0); // Total number of pages returned by the API
  const [searchQuery, setSearchQuery] = useState("");

  const staticTable = [
    {
      icon: <ReceiptLongIcon />,
      id: 1,
      title: "Processing",
      text: "orders",
      today: totalSumProcessingToday,
      all: totalSumProcessing,
      color: "#bbf7d0",
      textColor: "text-green-600",
    },
    {
      icon: <CancelIcon />,
      id: 2,
      title: "Cancelled",
      text: "orders",
      today: totalSumCancelledToday,
      all: totalSumCancelled,
      color: "#fecaca",
      textColor: "text-red-600",
    },
  ];

  const handleChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  const handleSearch = (newSearchTerm) => {
    setSearchQuery(new RegExp(newSearchTerm.replace(/\s+/g, " "), "i").source); // Update the search query state
  };

  useEffect(() => {
    const fetchBuyers = async () => {
      sessionStorage.setItem("page", page.toString());
      sessionStorage.setItem("perPage", perPage.toString());
      try {
        const response = await getBuyerPerformanceStats(
          page,
          perPage,
          searchQuery
        );
        const responeCountStatusToday = await countStatusToday();
        setBuyerData(response.data.Buyers);

        setTotalPages(response.data.totalPages);

        setTotalSumProcessing(response.data.TotalSumProcessing);
        setTotalSumCancelled(response.data.TotalSumCancelled);
        setTotalSumProcessingToday(
          responeCountStatusToday.data.TotalSumProcessing
        );
        setTotalSumCancelledToday(
          responeCountStatusToday.data.TotalSumCancelled
        );

        sessionStorage.setItem(
          "totalPage",
          response.data.totalPages.toString()
        );
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBuyers();
  }, [page, perPage, searchQuery]);

  return (
    <React.Fragment>
      <div>
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {staticTable.map((item) => (
            <Tracker
              icon={item.icon}
              text={item.text}
              today={item.today}
              all={item.all}
              color={item.color}
              textColor={item.textColor}
              title={item.title}
              key={item.id}
            />
          ))}
        </div>
        <div className="mt-8 w-full">
          <TableAB
            rows={buyerData}
            page={page}
            onPageChange={handleChange}
            onPerPageChange={handlePerPageChange}
            perPage={perPage}
            totalPages={totalPages}
            onSearchTermChange={handleSearch}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
