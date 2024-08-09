import React from "react";
import { formatNumberWithCommas, TD2 } from "cjbsDSTM";
import DisplayMoney from "../../../../../components/DisplayMoney";

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
        <DisplayMoney price={unpr} />
      </TD2>
      <TD2 align="right">{formatNumberWithCommas(openingStockCnt)}</TD2>
      <TD2 align="right">
        <DisplayMoney price={openingStockAmt} />
      </TD2>
      <TD2 align="right">{formatNumberWithCommas(stockInCnt)}</TD2>
      <TD2 align="right">
        <DisplayMoney price={stockInAmt} />
      </TD2>
      <TD2 align="right">{formatNumberWithCommas(stockOutCnt)}</TD2>
      <TD2 align="right">
        <DisplayMoney price={stockOutAmt} />
      </TD2>
      <TD2 align="right">{formatNumberWithCommas(closingStockCnt)}</TD2>
      <TD2 align="right">
        <DisplayMoney price={closingStockAmt} />
      </TD2>
    </>
  );
};

export default Row;
