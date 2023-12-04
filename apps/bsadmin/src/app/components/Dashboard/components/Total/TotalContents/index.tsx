import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import { useRecoilValue } from "recoil";
import { totalMonthAtom, totalYearAtom } from "../totalAtom";
import Charts from "./Charts";
import Sales from "./Sales";

const Index = () => {
  const year = useRecoilValue(totalYearAtom);
  const month = useRecoilValue(totalMonthAtom);

  const { data: totalData } = useSWR(
    `/dashboard/sls/year?year=${year}&month=${month}`,
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
    <Box sx={{ height: 200, mt: 3, mb: 3 }}>
      <Grid container>
        <Grid item xs={3.5}>
          <Sales
            changeSales={changeSales}
            totalSales={totalSales}
            isIcs={isIcs}
          />
        </Grid>
        <Grid
          item
          xs={8.5}
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
