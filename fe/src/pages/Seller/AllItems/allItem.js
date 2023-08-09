import Table from "../components/Table";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Card from "../../Home/PersonalProfile/components/card";
import { sellerProduct } from "../../../api/products";
import NewProductForm from "../NewItem/NewForm";

export default function AllItems() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selectedTradeCode, setSelectedTradeCode] = useState(false);
  const [totalSold, setTotalSold] = useState(0);
  const [totalAvaiable, setTotalAvaiable] = useState(0);

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

    const fetchProducts = async () => {
      sessionStorage.setItem("pageTableProducts", page.toString());

      sessionStorage.setItem("pageTableProductsPerPage", perPage.toString());

      try {
        // window.scrollTo(0, 0);
        const response = await sellerProduct(cleanedSellerId, page, perPage);
        const dataProducts = response.data.products;
        setTotalSold(response.data.totalSold0);
        setTotalAvaiable(response.data.totalSold1);
        const data = dataProducts.map((product) => ({
          tradeCode: product._id,
          itemName: product.title,
          price: product.price,
          status: product.sold,
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

  const staticTable = [
    {
      icon: <DoneOutlineIcon fontSize="large" />,
      id: 1,
      text: "Total Money",
      number: totalSold,
      money: "$53",
      color: "rgb(74, 222, 128)",
      title: "SOLD",
    },
    {
      icon: <ClearIcon fontSize="large" />,
      id: 2,
      text: "Total Money",
      number: totalAvaiable,
      money: "$53",
      color: "rgb(248, 113, 113)",
      title: "AVAIABLE",
    },
  ];

  return (
    <div>
      {!selectedTradeCode && (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
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
      )}
      {!selectedTradeCode && (
        <div className="w-full">
          <Table
            rows={products}
            nameTable={"All Items"}
            onPageChange={handleChange}
            page={page}
            onPerPageChange={handlePerPageChange}
            perPage={perPage}
            onSelectEditRow={handleSelectEditRow}
          />
        </div>
      )}

      {selectedTradeCode && (
        <NewProductForm tradeCode={selectedTradeCode} /> // Pass the selected TradeCode as a prop
      )}
    </div>
  );
}
