import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import Legend from "./Legend";
import PieContent from "./Pie";
import useDashboardParams from "../../hooks/useDashboardParams";

const SrvcSalesChart = () => {
  const { startMonth, startYear, endMonth, endYear, typeCc } =
    useDashboardParams();

  const { data: srvcSalesData } = useSWR(
    `/dashboard/sls/srvc?startYear=${startYear}&startMonty=${startMonth}&endYear=${endYear}&endMonty=${endMonth}&typeCc=${typeCc}`,
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
    },
  );

  console.log("srvcSalesData", srvcSalesData);

  const salesLabels = srvcSalesData.labels;
  const salesData = srvcSalesData.slsForAnlsResList.map(
    (item: { sales: any }) => item.sales,
  );
  const salesPercent = srvcSalesData.slsForAnlsResList.map(
    (item: { percent: any }) => item.percent,
  );
  const salesColors = srvcSalesData.colors;
  const salesPerColors = srvcSalesData.perColors;

  return (
    <Box>
      <Stack alignItems="center">
        <Box sx={{ mt: 2, mb: 4 }}>
          <PieContent
            salesLabels={salesLabels}
            salesColors={salesColors}
            salesData={salesData}
          />
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2.5 }}>
        <Typography variant="body2">단위: 백만원</Typography>
      </Stack>
      <Legend
        salesData={salesData}
        salesLabels={salesLabels}
        salesColors={salesColors}
        salesPerColors={salesPerColors}
        salesPercent={salesPercent}
      />

      {/*<Stack*/}
      {/*  justifyContent="space-between"*/}
      {/*  alignItems="center"*/}
      {/*>*/}
      {/*  <Stack alignItems="center">*/}
      {/*    */}
      {/*  </Stack>*/}
      {/*</Stack>*/}
    </Box>
  );
};

export default SrvcSalesChart;
