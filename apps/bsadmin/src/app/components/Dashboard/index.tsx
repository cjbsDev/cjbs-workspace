"use client";
import React from "react";
import { Grid } from "@mui/material";
import DashboardHeader from "./components/DashboardHeader";
import Total from "./components/Total";
import SrvcSales from "./components/SrvcSales";
import SalesByItem from "./components/SalesByItem";
import SalesByItem2 from "./components/SalesByItem2";
import InstTop from "./components/InstTop";
import AgncTop from "./components/AgncTop";
import Idle from "./components/Idle";
import { useSession } from "next-auth/react";
import useArrayContainsCharacter from "../../hooks/useArrayContainsCharacter";

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
  console.log("IT or NGS_SALES 체크 ==>>", containsChar);

  if (!containsChar) {
    return (
      <div>
        <p>IT / NGS_SALES / TOTAL_MANAGER 아닙니다!</p>
      </div>
    );
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
