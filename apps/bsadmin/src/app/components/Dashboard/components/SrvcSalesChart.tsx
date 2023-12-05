import React from "react";
import { Box } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import Legend from "./SrvcSales/Legend";
import PieContent from "./SrvcSales/Pie";

const SrvcSalesChart = () => {
  const { data: srvcSalesData } = useSWR(
    `/dashboard/sls/srvc?year=2023&month=11`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log("PieChart", srvcSalesData);

  const salesLabels = srvcSalesData.labels;
  const salesData = srvcSalesData.slsForAnlsResList.map((item) => item.sales);
  const salesPercent = srvcSalesData.slsForAnlsResList.map(
    (item) => item.percent,
  );
  const salesColors = srvcSalesData.colors;
  const salesPerColors = srvcSalesData.perColors;

  return (
    <Box sx={{ my: 5.7 }}>
      <Box sx={{ height: 150, mt: 3.75, px: 1.25, position: "relative" }}>
        <PieContent
          salesLabels={salesLabels}
          salesColors={salesColors}
          salesData={salesData}
        />
        <Legend
          salesData={salesData}
          salesLabels={salesLabels}
          salesColors={salesColors}
          salesPerColors={salesPerColors}
          salesPercent={salesPercent}
        />
      </Box>
    </Box>
  );
};

export default SrvcSalesChart;
