import React from "react";
import { useEffect, useState } from "react";
import Tracker from "../components/Tracker";
import TableAS from "../components/Table/TableAS";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { getSellerPerformanceStats } from "../../../api/seller";
import { todayCountReview } from "../../../api/Review/countAllReview";

export default function Allsellers() {
  const [sellerData, setSellerData] = useState([]);
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);
  const [todayTotalPositive, setTodayTotalPositive] = useState(0);
  const [todayTotalNegative, setTodayTotalNegative] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0); // Total number of pages returned by the API
  const [searchQuery, setSearchQuery] = useState("");

  const staticTable = [
    {
      icon: <ThumbUpAltIcon />,
      id: 1,
      title: "Positive",
      text: "positive",
      today: todayTotalPositive,
      all: totalPositive,
      color: "#bbf7d0",
      textColor: "text-green-600",
    },
    {
      icon: <ThumbDownAltIcon />,
      id: 2,
      title: "Negative",
      text: "negative",
      today: todayTotalNegative,
      all: totalNegative,
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
    const fetchSellers = async () => {
      sessionStorage.setItem("page", page.toString());
      sessionStorage.setItem("perPage", perPage.toString());
      try {
        const response = await getSellerPerformanceStats(
          page,
          perPage,
          searchQuery
        );
        setSellerData(response.data.Sellers);
        setTotalPositive(response.data.totalPositive);
        setTotalNegative(response.data.totalNegative);
        setTotalPages(response.data.totalPages);

        const responseToday = await todayCountReview();
        setTodayTotalPositive(responseToday.data.positiveCount);
        setTodayTotalNegative(responseToday.data.negativeCount);

        sessionStorage.setItem(
          "totalPage",
          response.data.totalPages.toString()
        );
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchSellers();
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
          <TableAS
            at={document.documentElement.scrollTop}
            rows={sellerData}
            page={page}
            onPageChange={handleChange}
            onPerPageChange={handlePerPageChange}
            perPage={perPage}
            totalPages={totalPages}
            onSearchTermChange={handleSearch} // Pass the callback prop
          />
        </div>
      </div>
    </React.Fragment>
  );
}
