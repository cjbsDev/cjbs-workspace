"use client";
import React, { useEffect } from "react";
import { Grid, Paper, Stack, styled, Typography } from "@mui/material";
import DashboardHeader from "./DashboardHeader";
import Total from "./Total";
import SrvcSales from "./SrvcSales";
import SalesByItem from "./SalesByItem";
import SalesByItem2 from "./SalesByItem2";
import InstTop from "./InstTop";
import AgncTop from "./AgncTop";
import Idle from "./Idle";
import { useSession } from "next-auth/react";
import useArrayContainsCharacter from "../../../../hooks/useArrayContainsCharacter";
import Dashboard2 from "./Dashboard2";

const Index = () => {
  const { data: session, status } = useSession();
  const authority = session?.authorities;
  // console.log(authority);

  // IT or NGS_SALES 부서인지 확인
  const containsChar = useArrayContainsCharacter(authority, [
    "IT",
    "NGS_SALES",
    "TOTAL_MANAGER",
  ]);

  if (!containsChar) {
    return <Dashboard2 />;
  }

  return (
    <>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <DashboardHeader />
        </Grid>
        <Grid item xs={6}></Grid>
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
};

export default Index;
