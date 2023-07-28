import React from "react";
import ChartOne from "../components/ChartOne";
import AnalyticEcommerce from "../components/AnalyticEcommerce";

import { Stack, Grid } from "@mui/material";

export default function FinancialManagement() {
  return (
    <div>
      <Grid container rowSpacing={2.5} columnSpacing={2.75}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Seller"
            count="300"
            percentage={20}
            extra="35,000"
            liltitle="you have an extra"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Buyer"
            count="400"
            percentage={27.3}
            extra="8,900"
            liltitle="you have an extra"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Visit"
            count="78,250"
            percentage={27.3}
            extra="8,900"
            liltitle="you have an extra"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales"
            count="78,250"
            percentage={27.3}
            extra="8,900"
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
        <ChartOne />
      </div>
    </div>
  );
}
