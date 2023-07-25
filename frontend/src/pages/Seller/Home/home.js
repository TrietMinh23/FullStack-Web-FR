import MonthlyBarChart from "./component/BarChart";
import { Box, Stack, Grid } from "@mui/material";
import AnalyticEcommerce from "../components/statistics/AnalyticEcommerce";
import MainCard from "../components/statistics/MainCard";
import React from "react";

export default function AllItems() {
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <div>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticEcommerce
                title="Total Sales"
                count="89,236"
                percentage={59.3}
                extra="35,000"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticEcommerce
                title="Total Refund"
                count="78,250"
                percentage={27.3}
                extra="8,900"
              />
            </Grid>
            <Grid
              item
              md={8}
              sx={{ display: { sm: "none", md: "block", lg: "none" } }}
            />

            <Grid item xs={12} md={7} lg={8}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0}
                  ></Stack>
                </Grid>
              </Grid>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box sx={{ pt: 1, pr: 2 }}>
                  <MonthlyBarChart />
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
}
