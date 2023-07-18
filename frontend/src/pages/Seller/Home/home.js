import LeftNav from "../components/LeftNav";
import Navbar from "../components/NavBar";
import { ThemeProvider } from "@material-tailwind/react";
import MonthlyBarChart from "./component/BarChart";
import { Box, Stack, Grid } from "@mui/material";
import AnalyticEcommerce from "../components/statistics/AnalyticEcommerce";
import MainCard from "../components/statistics/MainCard";

export default function AllItems() {
  return (
    <ThemeProvider>
      <div className="md:h-screen max-h-full min-h-screen max-w-screen flex flex-col">
        <Navbar />
        <div className="flex flex-row h-full bg-white">
          <LeftNav />
          <div className="flex-1 m-4">
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
                  {/* <Grid item>
                    <Typography variant="h5">Chart</Typography>
                  </Grid> */}
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
      </div>
    </ThemeProvider>
  );
}

{
  /* {/*   
  // return (
  //   <ThemeProvider>
  //     <div className="md:h-screen max-h-full min-h-screen max-w-screen flex flex-col">
  //       <Navbar />
  //       <div className="flex flex-row">
  //         <LeftNav />
  //         <div className="flex-1  bg-white">
  //           <Grid container rowSpacing={4.5} columnSpacing={2.75}>
  //             <Grid item xs={12} sx={{ mb: -2.25 }}>
  //               <AnalyticEcommerce
  //                 title="Total Sales"
  //                 count="89,236"
  //                 percentage={59.3}
  //                 extra="35,000"
  //               />
  //             </Grid>
  //             <Grid item xs={12} sx={{ mb: -2.25 }}>
  //               <AnalyticEcommerce
  //                 title="Total Refund"
  //                 count="78,250"
  //                 percentage={27.3}
  //                 extra="8,900"
  //               />
  //             </Grid>
  //           </Grid>
  //           <div className="">
  //             <Box sx={{ p: 2, pb: 0 }}>
  //               <Stack spacing={0}>
  //                 <Typography variant="h6" color="textSecondary">
  //                   This Week Statistics
  //                 </Typography>
  //                 <Typography variant="h6">$7,650</Typography>
  //               </Stack>
  //             </Box>
  //             <MonthlyBarChart />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </ThemeProvider>
  // ); */
}
