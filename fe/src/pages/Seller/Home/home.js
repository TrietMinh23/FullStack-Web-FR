import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ChartOne from "../components/ChartOne";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Card from "../../Home/PersonalProfile/components/card";
import formatNumberWithCommas from "../../../utils/formatNumberWithCommas";
import {
  getOrdersBySellerId,
  getDailyIncomeBySeller,
  getDailyRefundBySeller,
  getIncomeBySellerIdForAllMonths,
  getRefundBySellerIdForAllMonths,
} from "../../../api/order";

const defaultMonthlyIncome = [
  {
    name: "Product One",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
  },
  {
    name: "Product Two",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
  },
];

export default function Review() {
  const [orderStatusTotalAmounts, setOrderStatusTotalAmounts] = useState([]);
  const [dailyIncome, setDailyIncome] = useState([]);
  const [dailyRefund, setDailyRefund] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(defaultMonthlyIncome);

  const staticTable = [
    {
      icon: <MonetizationOnIcon fontSize="large" />,
      id: 1,
      text: `Daily Sales ${formatNumberWithCommas(Number(dailyIncome) || 0)}`,
      number: orderStatusTotalAmounts["Delivered"] || 0,
      interaction: "53",
      color: "blue",
      title: "Total Sales",
    },
    {
      icon: <MonetizationOnIcon fontSize="large" />,
      id: 2,
      text: `Daily Refund ${formatNumberWithCommas(Number(dailyRefund) || 0)}`,
      number: orderStatusTotalAmounts["Cancelled"] || 0,
      interaction: "53",
      color: "orange",
      title: "Total Refund",
    },
  ];

  useEffect(() => {
    let sellerId = localStorage.getItem("_id");
    let cleanedSellerId = sellerId.replace(/"/g, "");

    const fetchOrders = async () => {
      try {
        const response = await getOrdersBySellerId(cleanedSellerId);

        setOrderStatusTotalAmounts(response.data.orderStatusTotalAmounts);

        const responeDailyIncome = await getDailyIncomeBySeller(
          cleanedSellerId
        );
        setDailyIncome(responeDailyIncome.data["income"]);

        const responeDailyRefund = await getDailyRefundBySeller(
          cleanedSellerId
        );
        setDailyRefund(responeDailyRefund.data["refund"]);

        const responeMonthlyIncome = await getIncomeBySellerIdForAllMonths(
          cleanedSellerId
        );

        const responeMonthlyRefund = await getRefundBySellerIdForAllMonths(
          cleanedSellerId
        );

        // Map the API data to the customSeries format
        const mappedCustomSeries = [
          {
            name: "Total Sales",
            data: Array(12)
              .fill(0)
              .map((_, index) => {
                const matchingMonth = responeMonthlyIncome.data["income"].find(
                  (item) => item._id.month === index + 1
                );
                return matchingMonth ? matchingMonth.totalIncome : 0;
              }),
          },
          {
            name: "Total Refund",
            data: Array(12)
              .fill(0)
              .map((_, index) => {
                const matchingMonth = responeMonthlyRefund.data["refund"].find(
                  (item) => item._id.month === index + 1
                );
                return matchingMonth ? matchingMonth.totalRefund : 0;
              }),
          },
        ];
        // Set the mapped customSeries to state
        setMonthlyIncome(mappedCustomSeries);
      } catch (error) {
        console.log(error.message);
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
        <ChartOne series={monthlyIncome} />
      </div>
    </div>
  );
}
