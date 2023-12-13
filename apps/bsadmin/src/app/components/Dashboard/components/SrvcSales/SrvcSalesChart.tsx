import React from "react";
import { Box, Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import Legend from "./Legend";
import PieContent from "./Pie";
import { useRecoilValue } from "recoil";
import {
  dashboardTargetAtom,
  dashboardTypeCcAtom,
  dashboardYearAtom,
} from "../../dashboardAtom";

const SrvcSalesChart = () => {
  const getYear = useRecoilValue(dashboardYearAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);
  const getTarget = useRecoilValue(dashboardTargetAtom);

  const { data: srvcSalesData } = useSWR(
    `/dashboard/sls/srvc?year=${getYear}&typeCc=${getTypeCc}&target=${
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

  // console.log("PieChart", srvcSalesData);

  const salesLabels = srvcSalesData.labels;
  const salesData = srvcSalesData.slsForAnlsResList.map((item) => item.sales);
  const salesPercent = srvcSalesData.slsForAnlsResList.map(
    (item) => item.percent,
  );
  const salesColors = srvcSalesData.colors;
  const salesPerColors = srvcSalesData.perColors;

  return (
    <Box>
      <Box sx={{ mt: 3.75, px: 1.25 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack alignItems="center">
            <PieContent
              salesLabels={salesLabels}
              salesColors={salesColors}
              salesData={salesData}
            />
          </Stack>
          <Stack alignItems="center">
            <Legend
              salesData={salesData}
              salesLabels={salesLabels}
              salesColors={salesColors}
              salesPerColors={salesPerColors}
              salesPercent={salesPercent}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SrvcSalesChart;
