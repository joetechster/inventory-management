import * as React from "react";
import AreaChartComponent from "../components/ChartComponent";
import { Box, Grid, Typography } from "@mui/material";
import DonutChartComponent from "../components/DonutChartComponent";
import InfiniteScrollComponent from "../components/InfiniteList";
import Wrapper from "../components/Wrapper";
import MostSold from "../components/MostSold";
import RecentOrders from "../components/RecentOrders";

export default function DashBoard(props) {
  return (
    <>
      <AreaChartComponent />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5} lg={4}>
          <DonutChartComponent />
        </Grid>
        <Grid item xs={12} sm={7} lg={8}>
          <MostSold />
        </Grid>
      </Grid>
      <RecentOrders />
    </>
  );
}
