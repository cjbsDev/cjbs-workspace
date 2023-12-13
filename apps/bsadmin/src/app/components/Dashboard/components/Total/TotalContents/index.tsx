import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import { useRecoilValue } from "recoil";
import {
  dashboardYearAtom,
  dashboardTypeCcAtom,
  dashboardTargetAtom,
} from "../../../dashboardAtom";
import Charts from "./Charts";
import Sales from "./Sales";

const Index = () => {
  const getYear = useRecoilValue(dashboardYearAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);
  const getTarget = useRecoilValue(dashboardTargetAtom);

  const { data: totalData } = useSWR(
    `/dashboard/sls/perd?year=${getYear}&typeCc=${getTypeCc}&target=${
      getTypeCc === "BS_2100005"
        ? getTarget.halfTarget
        : getTypeCc === "BS_2100004"
          ? getTarget.quarterTarget
          : getTypeCc === "BS_2100003"
            ? getTarget.monthTarget
            : 12
    }`,
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
    slsForCurrentYear,
    slsForLastYear,
    slsForPreLastYear,
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
            slsForCurrentYear={slsForCurrentYear}
            slsForLastYear={slsForLastYear}
            slsForPreLastYear={slsForPreLastYear}
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
