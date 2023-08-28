import React,{ useState,useEffect } from "react";
import Tracker from "../components/Tracker";
import TableReport from "../components/Table/TableReport";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { getReport } from "../../../api/Report/getReport";

export default function Report() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const staticTable = [
    {
      icon: <ReceiptLongIcon/>,
      id: 4,
      title: "Today: Done",
      text: "done report",
      today: data.totalDoneToday,
      all: data.totalDone,
      color: "#bbf7d0",
      textColor:"text-green-600",
    },
    {
      icon: <CancelIcon/>,
      id: 5,
      title: "Today: Pending",
      text: "pending report",
      today: data.totalPendingToday,
      all: data.totalPending,
      color: "#fef08a",
      textColor:"text-yellow-800",
    },
  ];

  
  const handleChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1); 
  };

  const handleSearch = (newSearchTerm) => {
    setSearchQuery( new RegExp(newSearchTerm.replace(/\s+/g, " "), "i").source); // Update the search query state
  };

  useEffect(() => {
    fetchData();
  },[page, perPage, searchQuery]);
  
    const fetchData = async () => {
      sessionStorage.setItem("pageTableReport", page.toString());
      sessionStorage.setItem("pageTableReportPerPage", perPage.toString());
      try {
        const response = await getReport(page, perPage, searchQuery);
        setData(response.data);
        setTotalPages(response.data.totalPages);
        sessionStorage.setItem(
          "totalPage",
          response.data.totalPages.toString()
        );
        // console.log("this is dadgsuadg",response.data.report);
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
  useEffect(() => {
    console.log("pages",totalPages);
  },[totalPages])
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
        <div className="w-full">
          <TableReport 
            rows = {data.report}
            page={page}
            perPage={perPage}
            onPageChange={handleChange}
            onPerPageChange={handlePerPageChange}
            onSearchTermChange={handleSearch}
            totalPages={totalPages}
          />
        </div>
       
      </div>
    </React.Fragment>
  );
}
