import React from "react";
import { cjbsTheme, formatNumberWithCommas } from "cjbsDSTM";
import {
  Stack,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from "@mui/material";
import DisplayMoney from "../../../../../components/DisplayMoney";

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
    <TableFooter
      sx={{
        backgroundColor: cjbsTheme.palette.grey["100"],
        position: "sticky",
        bottom: 0,
      }}
    >
      <TableRow>
        <TableCell
          colSpan={3}
          align="center"
          sx={{ backgroundColor: cjbsTheme.palette.grey["300"] }}
        >
          <Typography variant="body1">합계</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2">
            {formatNumberWithCommas(openingStockTotalCnt)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <DisplayMoney price={openingStockTotalAmt} />
          {/*<Stack*/}
          {/*  direction="row"*/}
          {/*  justifyContent="right"*/}
          {/*  alignItems="center"*/}
          {/*  spacing={0.2}*/}
          {/*>*/}
          {/*  <Typography>*/}
          {/*    {formatNumberWithCommas(openingStockTotalAmt)}*/}
          {/*  </Typography>*/}
          {/*  <Typography>원</Typography>*/}
          {/*</Stack>*/}
        </TableCell>
        <TableCell align="right">
          <Typography>{formatNumberWithCommas(stockInTotalCnt)}</Typography>
        </TableCell>
        <TableCell align="right">
          <DisplayMoney price={stockInTotalAmt} />
        </TableCell>
        <TableCell align="right">
          <Typography>{formatNumberWithCommas(stockOutTotalCnt)}</Typography>
        </TableCell>
        <TableCell align="right">
          <DisplayMoney price={stockOutTotalAmt} />
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2">
            {formatNumberWithCommas(closingStockTotalCnt)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <DisplayMoney price={closingStockTotalAmt} />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default TableSumFooter;
