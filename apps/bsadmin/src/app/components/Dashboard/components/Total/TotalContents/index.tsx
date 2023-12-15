import React from "react";
import { Box, Grid } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import Charts from "./Charts";
import Sales from "./Sales";
import useDashboardParams from "../../../hooks/useDashboardParams";

const Index = () => {
  const { startMonth, startYear, endMonth, endYear, typeCc } =
    useDashboardParams();

  const { data: totalData } = useSWR(
    `/dashboard/sls/date?startYear=${startYear}&startMonty=${startMonth}&endYear=${endYear}&endMonty=${endMonth}&typeCc=${typeCc}`,
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
    },
  );

  console.log("Total Data", totalData);

  const {
    labels,
    totalSales,
    changeSales,
    isIcs,
    slsList,
    min,
    max,
    stepSize,
  } = totalData;

  return (
    <Box sx={{ mt: 3 }}>
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
            slsList={slsList}
            labels={labels}
            min={min}
            max={max}
            stepSize={stepSize}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
