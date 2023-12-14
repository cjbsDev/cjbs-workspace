import React, { useMemo } from "react";
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
import useTargetValue from "../../useTargetValue";

const SrvcSalesChart = () => {
  const getYear = useRecoilValue(dashboardYearAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);
  const targetValue = useTargetValue();

  const { data: srvcSalesData } = useSWR(
    `/dashboard/sls/srvc?year=${getYear}&typeCc=${getTypeCc}&target=${targetValue}`,
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
    },
  );

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
