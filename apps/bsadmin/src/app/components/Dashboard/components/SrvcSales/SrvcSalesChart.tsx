import React from "react";
import { Box, Stack } from "@mui/material";
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
        <Box sx={{ width: 200, height: 200, my: 5 }}>
          <PieContent
            salesLabels={salesLabels}
            salesColors={salesColors}
            salesData={salesData}
          />
        </Box>
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
