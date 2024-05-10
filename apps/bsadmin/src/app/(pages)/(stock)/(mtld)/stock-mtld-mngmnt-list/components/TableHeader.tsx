import React from "react";
import { TableHead, TableRow } from "@mui/material";
import { TH2 } from "cjbsDSTM";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TH2 width={80} align="center">
          재고 ID
        </TH2>
        <TH2>품명</TH2>
        <TH2 align="right">단가</TH2>
        <TH2 align="right">기초재고 수량</TH2>
        <TH2 align="right">기초재고 금액</TH2>
        <TH2 align="right">입고 수량</TH2>
        <TH2 align="right">입고 금액</TH2>
        <TH2 align="right">출고 수량</TH2>
        <TH2 align="right">출고 금액</TH2>
        <TH2 align="right">기말재고 수량</TH2>
        <TH2 align="right">기말재고 금액</TH2>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
