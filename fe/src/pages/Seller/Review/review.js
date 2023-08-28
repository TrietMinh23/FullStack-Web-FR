import React,{useState, useEffect} from "react";
import TableReview from "../components/TableReview";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Card from "../../Home/PersonalProfile/components/card";
import { getReview } from "../../../api/Review/getAllReviewbyID";
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Review() {
  const [thisreview, setReview] = useState([]);
  const [allData, setAllData] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const staticTable = [
    {
      icon: <StarBorderIcon />,
      id: 1,
      text: "",
      number: allData.totalStar1,
      interaction: "53",
      color: "red",
      title: "1 Star",
    },
    {
      icon: <StarBorderIcon />,
      id: 2,
      text: "",
      number: allData.totalStar2,
      interaction: "53",
      color: "orange",
      title: "2 Star",
    },
    {
      icon: <StarBorderIcon/>,
      id: 3,
      text: "",
      number: allData.totalStar3,
      interaction: "53",
      color: "#FFD700",
      title: "3 Star",
    },
    {
      icon: <StarBorderIcon />,
      id: 4,
      text: "",
      number: allData.totalStar4,
      interaction: "53",
      color: "blue",
      title: "4 Star",
    },
    {
      icon: <StarBorderIcon />,
      id: 5,
      text: "",
      number: allData.totalStar5,
      interaction: "53",
      color: "green",
      title: "5 Star",
    },
    {
      icon: <StarBorderIcon />,
      id: 5,
      text: "",
      number: allData.AvgStar,
      interaction: "53",
      color: "pink",
      title: "Avg Star",
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

    let sellerId = localStorage.getItem("_id");
    let cleanedSellerId = sellerId.replace(/"/g, "");
    const path = cleanedSellerId;
    fetchData(path);
  }, [page, perPage, searchQuery]);
  const fetchData = async (path) => {
    sessionStorage.setItem("pageTableReviews", page.toString());
    sessionStorage.setItem("pageTableReviewsPerPage", perPage.toString());

    try {
      const response = await getReview(path, page, perPage, searchQuery);
      console.log(response.data);
      setReview(response.data.reviews);
      setAllData(response.data);
      setTotalPages(response.data.totalPages);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {staticTable.map((item) => (
          <Card
            icon={item.icon}
            text={item.text}
            number={item.number}
            money={item.money}
            color={item.color}
            title={item.title}
            key={item.id}
          />
        ))}
      </div>
      <div className="w-full">
        <TableReview 
        rows={thisreview}
        page={page}
        perPage={perPage}
        onPageChange={handleChange}
        onPerPageChange={handlePerPageChange}
        onSearchTermChange={handleSearch}
        totalPages={totalPages}
        />
      </div>
    </div>
  );
}
