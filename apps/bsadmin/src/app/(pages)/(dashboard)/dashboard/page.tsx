"use client";

import { Grid } from "@mui/material";
import Total from "../../../components/Dashboard/components/Total";
import SrvcSales from "../../../components/Dashboard/components/SrvcSales";
import SalesByItem from "../../../components/Dashboard/components/SalesByItem";
import SalesByItem2 from "../../../components/Dashboard/components/SalesByItem2";
import AgncTop from "../../../components/Dashboard/components/AgncTop";
import InstTop from "../../../components/Dashboard/components/InstTop";
import DashboardHeader from "../../../components/Dashboard/components/DashboardHeader";
import Idle from "../../../components/Dashboard/components/Idle";

export default function Page() {
  return (
    <>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <DashboardHeader />
        </Grid>
        <Grid item xs={6}>
          {/*<Stack spacing={1} direction="row" justifyContent="flex-end">*/}
          {/*  <FileDownloadBtn exportUrl={``} iconName="xls3" />*/}
          {/*  <KeywordSearch />*/}
          {/*</Stack>*/}
        </Grid>
      </Grid>
      <Grid container spacing={2.5} sx={{ mb: 2.5 }} alignItems="stretch">
        <Grid item xs={7}>
          <Total />
        </Grid>
        <Grid item xs={5}>
          <SrvcSales />
        </Grid>
      </Grid>
      <Grid container spacing={2.5} sx={{ mb: 2.5 }} alignItems="stretch">
        <Grid item xs={6}>
          <SalesByItem />
        </Grid>
        <Grid item xs={6}>
          <SalesByItem2 />
        </Grid>
      </Grid>
      <Grid container spacing={2.5} sx={{ mb: 2.5 }} alignItems="stretch">
        <Grid item xs={6}>
          <InstTop />
        </Grid>
        <Grid item xs={6}>
          <AgncTop />
        </Grid>
      </Grid>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Idle />
        </Grid>
      </Grid>
    </>
  );
}
