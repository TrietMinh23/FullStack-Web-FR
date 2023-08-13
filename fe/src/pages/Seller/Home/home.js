import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ChartOne from "../components/ChartOne";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Card from "../../Home/PersonalProfile/components/card";
import { getOrdersBySellerId } from "../../../api/order";

export default function Review() {
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderStatusTotalAmounts, setOrderStatusTotalAmounts] = useState([]);

  const staticTable = [
    {
      icon: <MonetizationOnIcon fontSize="large" />,
      id: 1,
      text: "Daily Sales $53",
      number: orderStatusTotalAmounts["Delivered"],
      interaction: "53",
      color: "blue",
      title: "Total Sales",
    },
    {
      icon: <MonetizationOnIcon fontSize="large" />,
      id: 2,
      text: "Daily Refund $53",
      number: orderStatusTotalAmounts["Cancelled"],
      interaction: "53",
      color: "orange",
      title: "Refund",
    },
  ];

  useEffect(() => {
    let sellerId = localStorage.getItem("_id");
    let cleanedSellerId = sellerId.replace(/"/g, "");

    const fetchOrders = async () => {
      try {
        const response = await getOrdersBySellerId(cleanedSellerId);

        setOrderStatus(response.data.orderStatusCounts);
        setOrderStatusTotalAmounts(response.data.orderStatusTotalAmounts);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOrders(); // Call the fetchOrders function here
  }, []);

  return (
    <div>
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
      <div className="w-full">
        <ChartOne />
      </div>
    </div>
  );
}
