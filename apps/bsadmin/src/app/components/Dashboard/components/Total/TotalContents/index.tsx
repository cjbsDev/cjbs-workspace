import React from "react";
import { Box, Grid } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import Charts from "./Charts";
import Sales from "./Sales";
import useDashboardParams from "../../../hooks/useDashboardParams";
import Legend from "./Legend";
import { useRecoilValue } from "recoil";
import { dashboardTypeCcAtom } from "../../../recoil/dashboardAtom";

type TypeCcKey = "BS_2100003" | "BS_2100004" | "BS_2100005" | "BS_2100006";
const Index = () => {
  const { startMonth, startYear, endMonth, endYear, typeCc } =
    useDashboardParams();
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom) as TypeCcKey;

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
    colors,
    isIcs,
    slsList,
    min,
    max,
    stepSize,
  } = totalData;

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={12}>
          <Sales
            changeSales={changeSales}
            totalSales={totalSales}
            isIcs={isIcs}
          />
          {/*{getTypeCc !== "BS_2100005" && getTypeCc !== "BS_2100006" && (*/}
          {/*  <Legend colors={colors} />*/}
          {/*)}*/}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ position: "relative", justifyContent: "flex-end" }}
        >
          <Box>
            <Charts
              slsList={slsList}
              labels={labels}
              min={min}
              max={max}
              stepSize={stepSize}
              colors={colors}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
