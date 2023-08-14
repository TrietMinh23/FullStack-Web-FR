import React from "react";
import Tracker from "../components/Tracker";
import TableAI from "../components/Table/TableAI";
import BlockIcon from "@mui/icons-material/Block";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import PhonelinkOffIcon from "@mui/icons-material/PhonelinkOff";
import { useState } from "react";
import { useEffect } from "react";
import { sellerProduct } from "../../../api/products";
import NewProductForm from "../../Seller/NewItem/NewForm";


const staticTable = [
  {
    icon: <PhonelinkIcon />,
    id: 1,
    title: "ONL",
    text: "online < 15 day",
    today: "10",
    all: "53",
    color: "green",
  },
  {
    icon: <PhonelinkOffIcon />,
    id: 2,
    title: "OFF > 15",
    text: "offline > 15 day",
    today: "10",
    all: "53",
    color: "gray",
  },
  {
    icon: <BlockIcon />,
    id: 3,
    title: "OFF",
    text: "offline > 30 day",
    today: "10",
    all: "53",
    color: "red",
  },
  {
    icon: <ThumbUpAltIcon />,
    id: 4,
    title: "Positive",
    text: "positive review",
    today: "10",
    all: "53",
    color: "blue",
  },
  {
    icon: <ThumbDownAltIcon />,
    id: 5,
    title: "Negative",
    text: "negative review",
    today: "10",
    all: "53",
    color: "orange",
  },
];

export default function Allitems() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selectedTradeCode, setSelectedTradeCode] = useState(false);
  const [totalSold, setTotalSold] = useState(0);
  const [totalAvaiable, setTotalAvaiable] = useState(0);
  const [totalPriceSold0, setTotalPriceSold0] = useState(0);
  const [totalPriceSold1, setTotalPriceSold1] = useState(0);

  const handleChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  useEffect(() => {
    let sellerId = localStorage.getItem("_id");
    let cleanedSellerId = sellerId.replace(/"/g, "");
    cleanedSellerId = "64ce8ef9567a2050d86bce9a";

    const fetchProducts = async () => {
      sessionStorage.setItem("pageTableProducts", page.toString());

      sessionStorage.setItem("pageTableProductsPerPage", perPage.toString());

      try {
        // window.scrollTo(0, 0);
        const response = await sellerProduct(cleanedSellerId, page, perPage);
        const dataProducts = response.data.products;
        setTotalSold(response.data.totalSold0);
        setTotalAvaiable(response.data.totalSold1);
        setTotalPriceSold0(response.data.totalPriceSold0);
        setTotalPriceSold1(response.data.totalPriceSold1);
        const data = dataProducts.map((product) => ({
          tradeCode: product._id,
          itemName: product.title,
          price: product.price,
          status: product.sold,
          image: product.image,
          postDate: product.createdAt.split("T")[0],
        }));
        setProducts(data); // Assuming the response contains the actual data
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, [page, perPage]);

  const handleSelectEditRow = (tradeCode) => {
    setSelectedTradeCode(tradeCode); // Set the selected TradeCode in state
  };

  return (
    <React.Fragment>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
          {staticTable.map((item) => (
            <Tracker
              icon={item.icon}
              text={item.text}
              today={item.today}
              all={item.all}
              color={item.color}
              title={item.title}
              key={item.id}
            />
          ))}
        </div>
        <div className="mt-8 w-full">
          <TableAI
            rows={products}
            nameTable={"All Items"}
            onPageChange={handleChange}
            page={page}
            onPerPageChange={handlePerPageChange}
            perPage={perPage}
            onSelectEditRow={handleSelectEditRow}
          />
        </div>
        {selectedTradeCode && (
          <NewProductForm tradeCode={selectedTradeCode} /> // Pass the selected TradeCode as a prop
        )}
      </div>
    </React.Fragment>
  );
}
