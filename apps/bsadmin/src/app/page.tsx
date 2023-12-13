"use client";

import * as React from "react";
import {
  ContainedButton,
  SelectBox2,
  // FileDownloadBtn,
} from "cjbsDSTM";
import { Box, Grid, Stack, Typography } from "@mui/material";
// import KeywordSearch from "../../components/KeywordSearch";
// import SectionHeader from "../../../components/SectionHeader";
import { useRouter } from "next-nprogress-bar";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import {
  dashboardMonthData,
  dashboardYearData,
  periodListData,
} from "./data/inputDataLists";
import { RecoilRoot, useRecoilState } from "recoil";
import {
  dashboardMonthAtom,
  dashboardYearAtom,
} from "./components/Dashboard/dashboardAtom";
import Idle from "./components/Dashboard/components/Idle";
import Total from "./components/Dashboard/components/Total";
import SrvcSales from "./components/Dashboard/components/SrvcSales";
import SalesByItem from "./components/Dashboard/components/SalesByItem";
import AgncTop from "./components/Dashboard/components/AgncTop";
import InstTop from "./components/Dashboard/components/InstTop";
import DashboardHeader from "./components/Dashboard/components/DashboardHeader";

export default function Page() {
  // const router = useRouter();
  // const params = useParams();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const params = searchParams.get("idleduration");

  return (
    <RecoilRoot override={false}>
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
          <Grid item xs={12}>
            <Total />
          </Grid>
        </Grid>

        <Grid container spacing={2.5} sx={{ mb: 2.5 }} alignItems="stretch">
          <Grid item xs={7}>
            <SalesByItem />
          </Grid>
          <Grid item xs={5}>
            <SrvcSales />
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
    </RecoilRoot>
  );
}
