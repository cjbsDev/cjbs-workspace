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
      spacing={1}
      sx={{
        backgroundColor: cjbsTheme.palette.grey["100"],
        p: 1,
        mb: 1,
        borderRadius: 2,
      }}
    >
      <Typography>
        총 요청 금액:{formatNumberWithCommas(totalReqPrice)}
      </Typography>
      <Typography>
        총 발행 금액:{formatNumberWithCommas(totalIssuPrice)}
      </Typography>
    </Stack>
  );
};

export default TotalTaxPrice;
