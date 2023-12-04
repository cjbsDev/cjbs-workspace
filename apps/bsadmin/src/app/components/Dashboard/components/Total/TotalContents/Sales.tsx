import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import MyIcon from "icon/MyIcon";

interface SalesProps {
  totalSales: number;
  changeSales: number;
  isIcs: string | null;
}

const Sales = (props: SalesProps) => {
  const { totalSales, isIcs, changeSales } = props;
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h1">
          &#8361;{formatNumberWithCommas(totalSales)}
        </Typography>
      </Box>
      <Box>
        <Stack direction="row" spacing={2}>
          <Typography variant="body2" sx={{ color: "#868E95" }}>
            Last Month
          </Typography>

          <Stack
            direction="row"
            spacing={0.25}
            justifyContent="center"
            alignItems="center"
          >
            <MyIcon
              icon={
                isIcs === "Y"
                  ? "caret-up"
                  : isIcs === "N"
                    ? "caret-down"
                    : "minus"
              }
              size={20}
              color={
                isIcs === "Y"
                  ? "#FF5050"
                  : isIcs === "N"
                    ? "#2E9BFF"
                    : "#666666"
              }
            />
            <Typography
              variant="body2"
              sx={{
                color:
                  isIcs === "Y"
                    ? "#FF5050"
                    : isIcs === "N"
                      ? "#2E9BFF"
                      : "#666666",
                fontWeight: 700,
              }}
            >
              {changeSales}&#37;
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Sales;
