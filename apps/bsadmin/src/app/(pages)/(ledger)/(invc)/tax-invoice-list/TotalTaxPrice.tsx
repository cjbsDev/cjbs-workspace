import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { Box, Stack, Typography } from "@mui/material";
import { cjbsTheme, formatNumberWithCommas } from "cjbsDSTM";

const TotalTaxPrice = () => {
  const { data } = useSWR("/invc/total/price", fetcher, {
    suspense: true,
  });

  const totalReqPrice = data.totalReqPrice;
  const totalIssuPrice = data.totalIssuPrice;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        backgroundColor: cjbsTheme.palette.grey["100"],
        p: 1,
        mb: 1,
        borderRadius: 2,
      }}
    >
      <Box component="dl" sx={{ display: "flex" }}>
        <Box component="dt" sx={{ mr: 1, fontWeight: 600 }}>
          총 요청 금액:
        </Box>
        <Box component="dd">{formatNumberWithCommas(totalReqPrice)}</Box>
      </Box>

      <Box component="dl" sx={{ display: "flex" }}>
        <Box component="dt" sx={{ mr: 1, fontWeight: 600 }}>
          총 발행 금액:
        </Box>
        <Box component="dd">{formatNumberWithCommas(totalIssuPrice)}</Box>
      </Box>
    </Stack>
  );
};

export default TotalTaxPrice;
