import React from "react";
import TableAI from "../components/Table/TableAI";
import { useState } from "react";
import { useEffect } from "react";
import { getAllProducts } from "../../../api/products";
import NewProductForm from "../../Seller/NewItem/NewForm";
import ClearIcon from "@mui/icons-material/Clear";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Card from "../../Home/PersonalProfile/components/card";
import formatNumberWithCommas from "../../../utils/formatNumberWithCommas";

export default function Allitems() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTradeCode, setSelectedTradeCode] = useState(false);
  const [totalSold, setTotalSold] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [totalPriceSold0, setTotalPriceSold0] = useState(0);
  const [totalPriceSold1, setTotalPriceSold1] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  const handleSearch = (newSearchTerm) => {
    setSearchQuery( new RegExp(newSearchTerm.replace(/\s+/g, " "), "i").source); // Update the search query state
  };

  useEffect(() => {
    const fetchProducts = async () => {
      sessionStorage.setItem("pageTableProducts", page.toString());

      sessionStorage.setItem("pageTableProductsPerPage", perPage.toString());

      try {
        // window.scrollTo(0, 0);
        const response = await getAllProducts(page, perPage, searchQuery);
        const dataProducts = response.data.products;
        setTotalSold(response.data.totalSold0);
        setTotalAvailable(response.data.totalSold1);
        setTotalPriceSold0(response.data.totalPriceSold0);
        setTotalPriceSold1(response.data.totalPriceSold1);
        setTotalPages(response.data.totalPages);
        const data = dataProducts.map((product) => ({
          tradeCode: product._id,
          itemName: product.title,
          price: product.price,
          status: product.sold,
          image: product.image,
          postDate: product.updatedAt?.split("T")[0] || "N/A",
        }));
        setProducts(data); // Assuming the response contains the actual data

        sessionStorage.setItem(
          "totalPage",
          response.data.totalPages.toString()
        );
        
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProducts();
  }, [page, perPage,searchQuery]);

  const handleSelectEditRow = (tradeCode) => {
    setSelectedTradeCode(tradeCode); // Set the selected TradeCode in state
  };

  const staticTable = [
    {
      icon: <DoneOutlineIcon fontSize="large" />,
      id: 1,
      text: "Total Money:",
      number: totalSold || 0,
      money: formatNumberWithCommas(totalPriceSold0) || 0,
      color: "rgb(74, 222, 128)",
      title: "AVAILABLE",
    },
    {
      icon: <ClearIcon fontSize="large" />,
      id: 2,
      text: "Total Money:",
      number: totalAvailable || 0,
      money: formatNumberWithCommas(totalPriceSold1) || 0,
      color: "rgb(248, 113, 113)",
      title: "SOLD",
    },
  ];
  return (
    <React.Fragment>
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
          <div className="mt-8 w-full">
            <TableAI
              rows={products}
              nameTable={"All Items"}
              onPageChange={handleChange}
              page={page}
              onPerPageChange={handlePerPageChange}
              perPage={perPage}
              onSelectEditRow={handleSelectEditRow}
              onSearchTermChange={handleSearch} // Pass the callback prop
              totalPages={totalPages}
            />
          </div>
        )}

        {selectedTradeCode && (
          <div>
            <NewProductForm tradeCode={selectedTradeCode} role={"admin"} />{" "}
            {/* Pass the selected TradeCode as a prop */}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
