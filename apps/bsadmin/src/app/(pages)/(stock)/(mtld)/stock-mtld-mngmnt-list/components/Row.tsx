import React from "react";
import { formatNumberWithCommas, TD2 } from "cjbsDSTM";
import { Stack, Typography } from "@mui/material";

interface RowProps {
  stockId: number;
  stockNm: string;
  unpr: any;
  openingStockCnt: any;
  openingStockAmt: any;
  stockInCnt: any;
  stockInAmt: any;
  stockOutCnt: any;
  stockOutAmt: any;
  closingStockCnt: any;
  closingStockAmt: any;
}

const Row = ({
  stockId,
  stockNm,
  unpr,
  openingStockCnt,
  openingStockAmt,
  stockInCnt,
  stockInAmt,
  stockOutCnt,
  stockOutAmt,
  closingStockCnt,
  closingStockAmt,
}: RowProps) => {
  return (
    <>
      <TD2 align="center">{stockId}</TD2>
      <TD2>{stockNm}</TD2>
      <TD2 align="right">
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          spacing={0.2}
        >
          <Typography variant="body2">
            {formatNumberWithCommas(unpr)}
          </Typography>
          <Typography variant="body2">원</Typography>
        </Stack>
      </TD2>
      <TD2 align="right">{formatNumberWithCommas(openingStockCnt)}</TD2>
      <TD2 align="right">
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          spacing={0.2}
        >
          <Typography variant="body2">
            {formatNumberWithCommas(openingStockAmt)}
          </Typography>
          <Typography variant="body2">원</Typography>
        </Stack>
      </TD2>
      <TD2 align="right">{formatNumberWithCommas(stockInCnt)}</TD2>
      <TD2 align="right">{formatNumberWithCommas(stockInAmt)}</TD2>
      <TD2 align="right">{formatNumberWithCommas(stockOutCnt)}</TD2>
      <TD2 align="right">
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          spacing={0.2}
        >
          <Typography variant="body2">
            {formatNumberWithCommas(stockOutAmt)}
          </Typography>
          <Typography variant="body2">원</Typography>
        </Stack>
      </TD2>
      <TD2 align="right">{formatNumberWithCommas(closingStockCnt)}</TD2>
      <TD2 align="right">
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          spacing={0.2}
        >
          <Typography variant="body2">
            {formatNumberWithCommas(closingStockAmt)}
          </Typography>
          <Typography variant="body2">원</Typography>
        </Stack>
      </TD2>
    </>
  );
};

export default Row;
