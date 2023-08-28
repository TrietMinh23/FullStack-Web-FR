import React,{useEffect,useState} from "react";
import Statistic from "../components/Statistics";
import TableItem from "../components/TableItem";
import { getOrdersByUserId } from "../../../../api/order";

export default function AllOrders() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    fetchData();
  },[page, perPage, searchQuery]);

  const fetchData = async () => {
    sessionStorage.setItem("pageTableOrders", page.toString());
    sessionStorage.setItem("pageTableOrdersPerPage", perPage.toString());
      try {
        const response = await getOrdersByUserId(JSON.parse(localStorage.getItem("_id")),page, perPage, searchQuery);
        console.log(page, perPage, searchQuery);
        setData(response.data);
        setTotalPages(response.data.totalPages);
        sessionStorage.setItem(
          "totalPage",
          response.data.totalPages.toString()
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
  }


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
    console.log("hi",data)
  },[data]);
  return (
    <div className="xl:ml-64 ml-0 p-4 mt-[-100vh]" id="info">
      <Statistic />
      <TableItem 
        rows = {data.orders}
        page={page}
        perPage={perPage}
        onPageChange={handleChange}
        onPerPageChange={handlePerPageChange}
        onSearchTermChange={handleSearch}
        totalPages={totalPages}/>
    </div>
  );
}
