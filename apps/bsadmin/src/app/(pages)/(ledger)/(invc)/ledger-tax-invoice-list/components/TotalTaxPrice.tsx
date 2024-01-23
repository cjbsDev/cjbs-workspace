import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { Box, Stack, Typography } from "@mui/material";
import { cjbsTheme, formatNumberWithCommas } from "cjbsDSTM";

const TotalTaxPrice = () => {
  const { data } = useSWR("/invc/total/price", fetcher, {
    suspense: true,
  });

  const { totalSupplyPrice, totalVat, totalPrice } = data;
  console.log(data);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={3}
      sx={{
        // backgroundColor: cjbsTheme.palette.grey["100"],
        p: 1.5,
        pt: 2,
        mb: 1,
        border: `1px solid ${cjbsTheme.palette.grey["300"]}`,
      }}
    >
      <Box component="dl" sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="dt"
          sx={{
            mr: 1,
            fontWeight: 600,
            // py: 2,
            // borderRight: `1px solid ${cjbsTheme.palette.grey["300"]}`,
          }}
        >
          총 공급금액:
        </Box>
        <Box
          component="dd"
          sx={
            {
              // py: 2,
              // borderRight: `1px solid ${cjbsTheme.palette.grey["300"]}`,
            }
          }
        >
          {formatNumberWithCommas(totalSupplyPrice)}원
        </Box>
      </Box>

      <Box component="dl" sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="dt"
          sx={{
            mr: 1,
            fontWeight: 600,
            // py: 2,
            // borderRight: `1px solid ${cjbsTheme.palette.grey["300"]}`,
          }}
        >
          총 부가세:
        </Box>
        <Box component="dd">{formatNumberWithCommas(totalVat)}원</Box>
      </Box>

      <Box component="dl" sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="dt"
          sx={{
            mr: 1,
            fontWeight: 600,
            // py: 2,
            // borderRight: `1px solid ${cjbsTheme.palette.grey["300"]}`,
          }}
        >
          총 합계금액:
        </Box>
        <Box component="dd">{formatNumberWithCommas(totalPrice)}원</Box>
      </Box>
    </Stack>
  );
};

export default TotalTaxPrice;
