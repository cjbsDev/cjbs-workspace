import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import MyIcon from "icon/MyIcon";
import { useRecoilValue } from "recoil";
import { dashboardTypeCcAtom } from "../../../recoil/dashboardAtom";

type TypeCcKey = "BS_2100003" | "BS_2100004" | "BS_2100005" | "BS_2100006";

const TIME_PERIODS: Record<TypeCcKey, string> = {
  BS_2100003: "달",
  BS_2100004: "분기",
  BS_2100005: "반기",
  BS_2100006: "해",
};
const COLORS = {
  INCREASE: "#FF5050",
  DECREASE: "#2E9BFF",
  NEUTRAL: "#666666",
};

interface SalesProps {
  totalSales: number;
  changeSales: number;
  isIcs: "Y" | "N" | null;
}

const Sales = ({ totalSales, changeSales, isIcs }: SalesProps) => {
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom) as TypeCcKey;
  const renderTimePeriod = () => TIME_PERIODS[getTypeCc];

  const renderIconAndColor = () => {
    switch (isIcs) {
      case "Y":
        return { icon: "caret-up", color: COLORS.INCREASE };
      case "N":
        return { icon: "caret-down", color: COLORS.DECREASE };
      default:
        return { icon: "minus", color: COLORS.NEUTRAL };
    }
  };

  const { icon, color } = renderIconAndColor();

  return (
    <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ mb: 3.5 }}>
      <Typography variant="h1">
        &#8361;{formatNumberWithCommas(totalSales)}
      </Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: "#868E95" }}>
          지난 {renderTimePeriod()}
        </Typography>

        <Stack
          direction="row"
          spacing={0.25}
          justifyContent="center"
          alignItems="center"
        >
          <MyIcon icon={icon} size={20} color={color} />
          <Typography
            variant="body2"
            sx={{
              color: color,
              fontWeight: 700,
            }}
          >
            {changeSales}&#37;
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Sales;
