import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ChartOne from "../components/ChartOne";
import AnalyticEcommerce from "../components/AnalyticEcommerce";
import formatNumberWithCommas from "../../../utils/formatNumberWithCommas";

import { Stack, Grid } from "@mui/material";
import { getIncomeForAllMonths, getRefundForAllMonths,getIncomeForAllDeliveredOrders, getCurrentMonthIncome, getCurrentYearIncome, getRefundForAllDeliveredOrders } from "../../../api/order";
import { countSellers } from "../../../api/seller";
import { countBuyer } from "../../../api/buyer";

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

export default function FinancialManagement() {
  const [monthlyIncome, setMonthlyIncome] = useState(defaultMonthlyIncome); // income for the month [1, 12]
  const [incomeForAllDeliveredOrders, setIncomeForAllDeliveredOrders] = useState(0);
  const [incomeCurrentMonth, setIncomeCurrentMonth] = useState(0); // income for the current month
  const [incomeCurrentYear, setIncomeCurrentYear] = useState(0); // income for the current year
  const [sellerCount, setSellerCount] = useState(0);  // count sellers
  const [buyerCount, setBuyerCount] = useState(0);  // count buyers
  const [refundForAllDeliveredOrders, setRefundForAllDeliveredOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responeMonthlyIncome = await getIncomeForAllMonths();
        const responeMonthlyRefund = await getRefundForAllMonths();
        const responeIncomeForAllDeliveredOrders = await getIncomeForAllDeliveredOrders();
        const responeIncomeCurrentMonth = await getCurrentMonthIncome();
        const responeIncomeCurrentYear = await getCurrentYearIncome();  
        const responeCountSellers = await countSellers();
        const responeCountBuyers = await countBuyer();
        const responeRefundForAllDeliveredOrders = await getRefundForAllDeliveredOrders();

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

        // Set the mappedCustomSeries to the state
        setIncomeForAllDeliveredOrders(responeIncomeForAllDeliveredOrders.data["totalIncome"]);
        setRefundForAllDeliveredOrders(responeRefundForAllDeliveredOrders.data["totalRefund"]);
        setMonthlyIncome(mappedCustomSeries);
        setIncomeCurrentYear(responeIncomeCurrentYear.data["income"]);
        setIncomeCurrentMonth(responeIncomeCurrentMonth.data["income"]);
        setSellerCount(responeCountSellers.data["count"]);
        setBuyerCount(responeCountBuyers.data["count"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Grid container rowSpacing={2.5} columnSpacing={2.75}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Seller"
            count={`${sellerCount}`}
            percentage={(sellerCount - 1) / 1 * 100}
            extra={`${sellerCount - 1}`}
            liltitle="you have an extra"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Buyer"
            count={`${buyerCount}`}
            percentage={(buyerCount - 1) / 1 * 100}
            extra={`${buyerCount - 1}`}
            liltitle="you have an extra"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales"
            count={formatNumberWithCommas(incomeForAllDeliveredOrders)}
            percentage={`${(incomeCurrentYear - incomeForAllDeliveredOrders) / incomeForAllDeliveredOrders * 100}`}
            extra={formatNumberWithCommas(incomeCurrentYear)}
            liltitle="you made an extra"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Refund"
            count={formatNumberWithCommas(refundForAllDeliveredOrders)}
            percentage={`0`}
            extra={formatNumberWithCommas(refundForAllDeliveredOrders)}
            liltitle="you made an extra"
          />
        </Grid>
        <Grid
          item
          md={8}
          sx={{ display: { sm: "none", md: "block", lg: "none" } }}
        />
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}></Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 w-full">
        <ChartOne series={monthlyIncome} />
      </div>
    </div>
  );
}
