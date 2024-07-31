import { formatNumberWithCommas } from "cjbsDSTM";
import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import StockIn from "./components/StockIn";
import StockOut from "./components/StockOut";
import DisplayMoney from "../../../../components/DisplayMoney";
import Ellipsis from "../../../(ledger)/(invc)/ledger-tax-invoice-list/components/Ellipsis";

export const getColumns = (getStockCategoryVal: string) => [
  {
    name: "재고ID",
    center: true,
    width: "100px",
    selector: (row) => formatNumberWithCommas(row.stockId),
  },
  {
    name: "보조금",
    width: "80px",
    center: true,
    selector: (row: { isAstnPrice: string }) => row.isAstnPrice,
  },
  {
    name: "GutInside",
    width: "100px",
    center: true,
    selector: (row: { isGutInside: string }) => row.isGutInside,
  },
  {
    name: "품명",
    minWidth: "350px",
    // wrap: true,
    selector: (row: { stockNm: string }) =>
      row.stockNm !== "" ? row.stockNm : "-",
    // cell: (row: { stockNm: string }) => {
    //   return (
    //     // <Typography>{row.stockNm}</Typography>
    //     <Ellipsis text={row.stockNm.toString()} line={1} />
    //   );
    // },
  },
  {
    name: "제조사",
    minWidth: "120px",
    selector: (row: { mkrNm: string }) => (row.mkrNm !== "" ? row.mkrNm : "-"),
    // cell: (row: { mkrNm: string }) => {
    //   return <Ellipsis text={row.mkrNm} line={1} />;
    // },
  },
  {
    name: "규격",
    selector: (row: { stnd: string }) => (row.stnd !== "" ? row.stnd : "-"),
    // width: "80px",
    // center: true,
  },
  {
    name: "단위",
    selector: (row: { unitVal: string }) =>
      row.unitVal !== "" ? row.unitVal : "-",
    // width: "80px",
    // center: true,
  },
  {
    name: "Cat.No",
    width: "180px",
    selector: (row: { catNo: string }) => (row.catNo !== "" ? row.catNo : "-"),
    // allowOverflow: true,
    // grow: 2,
  },
  {
    name: "입고",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: (row) => {
      return <StockIn rowData={row} />;
    },
    center: true,
    // width: "60px",
  },
  {
    name: "출고",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: (row) => <StockOut rowData={row} />,
    center: true,
    omit: getStockCategoryVal === "BS_3005002",
    width: "60px",
  },
  {
    name: "단가",
    cell: (row) => <DisplayMoney price={row.unpr} />,
    right: true,
    minWidth: "120px",
  },
  {
    name: "입고량",
    cell: (row) => formatNumberWithCommas(row.stockInCnt),
    right: true,
  },
  {
    name: "출고량",
    cell: (row) => formatNumberWithCommas(row.stockOutCnt),
    right: true,
  },
  {
    name: "재고량",
    cell: (row) => formatNumberWithCommas(row.stockCnt),
    right: true,
  },
  {
    name: "재고위치",
    width: "150px",
    selector: (row: { strgPlaceVal: string }) =>
      row.strgPlaceVal !== "" ? row.strgPlaceVal : "-",
    // center: true,
    allowOverflow: true,
  },
  {
    name: "서비스",
    selector: (row: { srvcVal: string }) =>
      row.srvcVal !== "" ? row.srvcVal : "-",
    allowOverflow: true,
    // center: true,
  },
  {
    name: "등록일자",
    selector: (row: { createdAt: string }) =>
      row.createdAt !== "" ? row.createdAt : "-",
    width: "120px",
    center: true,
  },
  {
    name: "담당자",
    selector: (row: { mngrNm: string }) =>
      row.mngrNm !== "" ? row.mngrNm : "-",
    width: "100px",
    center: true,
  },
  {
    name: "메모",
    minWidth: "160px",
    selector: (row: { memo: string }) => (row.memo !== "" ? row.memo : "-"),
    // cell: (row: { memo: string }) => {
    //   const { memo } = row;
    //   return memo !== null && memo !== "" && <Ellipsis text={memo} line={2} />;
    // },
  },
];
