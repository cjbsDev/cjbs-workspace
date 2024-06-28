import React, { useRef, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import Legend from "./Legend";
import PieContent from "./Pie";
import useDashboardParams from "../../hooks/useDashboardParams";

const SrvcSalesChart = () => {
  const anchorRef = useRef(null);

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
    <Box ref={anchorRef}>
      <Stack direction="row" alignItems="center">
        <Stack alignItems="center">
          <PieContent
            salesLabels={salesLabels}
            salesColors={salesColors}
            salesData={salesData}
          />
        </Stack>

        <Legend
          salesData={salesData}
          salesLabels={salesLabels}
          salesColors={salesColors}
          salesPerColors={salesPerColors}
          salesPercent={salesPercent}
        />
      </Stack>
    </Box>
  );
};

export default SrvcSalesChart;
