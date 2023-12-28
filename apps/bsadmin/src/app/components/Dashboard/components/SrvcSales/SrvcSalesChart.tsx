import React, { useRef, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import Legend from "./Legend";
import PieContent from "./Pie";
import useDashboardParams from "../../hooks/useDashboardParams";

const SrvcSalesChart = () => {
  const anchorRef = useRef(null);

  // useEffect(() => {
  //   if (anchorRef.current) {
  //     console.log("WIDTH", anchorRef.current?.offsetWidth); // 컴포넌트의 width
  //     console.log("HEIGHT", anchorRef.current?.offsetHeight); // 컴포넌트의 height
  //   }
  // }, []);

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
      <Stack alignItems="center" sx={{ height: 300 }}>
        <PieContent
          salesLabels={salesLabels}
          salesColors={salesColors}
          salesData={salesData}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2.5 }}>
        <Typography variant="body2">단위: 만원</Typography>
      </Stack>
      <Legend
        salesData={salesData}
        salesLabels={salesLabels}
        salesColors={salesColors}
        salesPerColors={salesPerColors}
        salesPercent={salesPercent}
      />
    </Box>
  );
};

export default SrvcSalesChart;
