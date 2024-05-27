import React from "react";
import { cjbsTheme, formatNumberWithCommas } from "cjbsDSTM";
import {
  Stack,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from "@mui/material";

interface TableSumFooterProps {
  closingStockTotalAmt: number;
  openingStockTotalAmt: number;
  stockInTotalAmt: number;
  stockOutTotalAmt: number;
  closingStockTotalCnt: number;
  stockInTotalCnt: number;
  stockOutTotalCnt: number;
  openingStockTotalCnt: number;
}

const TableSumFooter = ({
  closingStockTotalCnt,
  closingStockTotalAmt,
  stockInTotalCnt,
  stockInTotalAmt,
  stockOutTotalCnt,
  stockOutTotalAmt,
  openingStockTotalCnt,
  openingStockTotalAmt,
}: TableSumFooterProps) => {
  return (
    <TableFooter sx={{ backgroundColor: cjbsTheme.palette.grey["100"] }}>
      <TableRow>
        <TableCell
          colSpan={3}
          align="center"
          sx={{ backgroundColor: cjbsTheme.palette.grey["300"] }}
        >
          <Typography variant="body1">합계</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>
            {formatNumberWithCommas(openingStockTotalCnt)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>
            <Stack
              direction="row"
              justifyContent="right"
              alignItems="center"
              spacing={0.2}
            >
              <Typography>
                {formatNumberWithCommas(openingStockTotalAmt)}
              </Typography>
              <Typography>원</Typography>
            </Stack>
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{formatNumberWithCommas(stockInTotalCnt)}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{formatNumberWithCommas(stockInTotalAmt)}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{formatNumberWithCommas(stockOutTotalCnt)}</Typography>
        </TableCell>
        <TableCell align="right">
          <Stack
            direction="row"
            justifyContent="right"
            alignItems="center"
            spacing={0.2}
          >
            <Typography>{formatNumberWithCommas(stockOutTotalAmt)}</Typography>
            <Typography>원</Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography>
            {formatNumberWithCommas(closingStockTotalCnt)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Stack
            direction="row"
            justifyContent="right"
            alignItems="center"
            spacing={0.2}
          >
            <Typography>
              {formatNumberWithCommas(closingStockTotalAmt)}
            </Typography>
            <Typography>원</Typography>
          </Stack>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default TableSumFooter;
