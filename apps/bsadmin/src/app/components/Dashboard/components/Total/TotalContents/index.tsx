import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import { useRecoilValue } from "recoil";
import { dashboardYearAtom, dashboardMonthAtom } from "../../../dashboardAtom";
import Charts from "./Charts";
import Sales from "./Sales";

const Index = () => {
  const getYear = useRecoilValue(dashboardYearAtom);
  const getMonth = useRecoilValue(dashboardMonthAtom);

  console.log("get year, month", getYear, getMonth);

  const { data: totalData } = useSWR(
    `/dashboard/sls/year?year=${getYear}&month=${getMonth}`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Total Data", totalData);

  const {
    labels,
    totalSales,
    changeSales,
    isIcs,
    slsForLastYear,
    slsForPreLastYear,
  } = totalData;

  return (
    <Box>
      <Grid container>
        <Grid item xs={2.5}>
          <Sales
            changeSales={changeSales}
            totalSales={totalSales}
            isIcs={isIcs}
          />
        </Grid>
        <Grid
          item
          xs={9.5}
          sx={{ position: "relative", justifyContent: "flex-end" }}
        >
          <Charts
            slsForLastYear={slsForLastYear}
            slsForPreLastYear={slsForPreLastYear}
            labels={labels}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
