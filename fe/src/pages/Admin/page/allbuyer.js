import React, { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import TableAB from "../components/Table/TableAB";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { instance } from "../../../api/config";
import { getBuyerPerformanceStats } from "../../../api/buyer";

export default function Allbuyer() {
  const [buyerData, setBuyerData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0); // Total number of pages returned by the API
  const [totalSumProcessing, setTotalSumProcessing] = useState(0); // Total number of pages returned by the API
  const [totalSumCancelled, setTotalSumCancelled] = useState(0); // Total number of pages returned by the API

  const staticTable = [
    {
      icon: <ReceiptLongIcon />,
      id: 1,
      title: "Processing",
      text: "processing orders",
      today: "10",
      all: totalSumProcessing,
      color: "#bbf7d0",
      textColor: "text-green-600",
    },
    {
      icon: <CancelIcon />,
      id: 2,
      title: "Cancelled",
      text: "canceled orders",
      today: "10",
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

  useEffect(() => {
    const fetchBuyers = async () => {
      sessionStorage.setItem("page", page.toString());
      sessionStorage.setItem("perPage", perPage.toString());
      try {
        const response = await getBuyerPerformanceStats(page, perPage);
        setBuyerData(response.data.Buyers);

        setTotalPages(response.data.totalPages);

        setTotalSumProcessing(response.data.TotalSumProcessing);
        setTotalSumCancelled(response.data.TotalSumCancelled);

        sessionStorage.setItem(
          "totalPage",
          response.data.totalPages.toString()
        );
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBuyers();
    console.log(buyerData);
  }, [page, perPage]);

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
          />
        </div>
      </div>
    </React.Fragment>
  );
}
