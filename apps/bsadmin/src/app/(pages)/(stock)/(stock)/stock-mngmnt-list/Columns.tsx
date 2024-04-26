import {
  ContainedButton,
  formatNumberWithCommas,
  formatPhoneNumber,
} from "cjbsDSTM";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";
import StockIn from "./components/StockIn";
import StockOut from "./components/StockOut";

export const getColumns = (getStockCategoryVal: string) => [
  {
    name: "재고ID",
    center: true,
    selector: (row) => formatNumberWithCommas(row.stockId),
  },
  {
    name: "보조금",
    // width: "100px",
    center: true,
    selector: (row: { isAstnPrice: string }) => row.isAstnPrice,
  },
  {
    name: "GutInside",
    // width: "100px",
    center: true,
    selector: (row: { isGutInside: string }) => row.isGutInside,
  },
  {
    name: "품명",
    // width: "120px",
    selector: (row: { stockNm: string }) =>
      row.stockNm !== null ? row.stockNm : "-",
    center: true,
    // wrap: true,
    allowOverflow: true,
    // grow: 10,
    // cell: (row: { stockNm: string }) => row.stockNm,
  },
  {
    name: "제조사",
    selector: (row: { mkrNm: string }) =>
      row.mkrNm !== null ? row.mkrNm : "-",
    center: true,
  },
  // {
  //   name: "접수번호",
  //   selector: (row: { rcptNum: string }) =>
  //     row.rcptNum !== null ? row.rcptNum : "-",
  //   width: "150px",
  //   center: true,
  // },
  // {
  //   name: "오더정보",
  //   selector: (row: { orderInfo: string }) =>
  //     row.orderInfo !== null ? row.orderInfo : "-",
  //   // width: "150px",
  //   center: true,
  // },
  // {
  //   name: "샘플정보",
  //   selector: (row: { sampleInfo: string }) =>
  //     row.sampleInfo !== null ? row.sampleInfo : "-",
  //   width: "150px",
  //   center: true,
  // },
  // {
  //   name: "샘플종류",
  //   selector: (row: { sampleTypeVal: string }) =>
  //     row.sampleTypeVal !== null ? row.sampleTypeVal : "-",
  //   // width: "150px",
  //   center: true,
  // },
  // {
  //   name: "샘플수(rxn/mer)",
  //   selector: (row: { sampleCnt: number }) =>
  //     formatNumberWithCommas(row.sampleCnt),
  //   width: "150px",
  //   center: true,
  // },
  {
    name: "규격",
    selector: (row: { stnd: string }) => (row.stnd !== null ? row.stnd : "-"),
    // width: "150px",
    center: true,
  },
  {
    name: "단위",
    selector: (row: { unitVal: string }) =>
      row.unitVal !== null ? row.unitVal : "-",
    // width: "150px",
    center: true,
  },
  {
    name: "Cat.No",
    selector: (row: { catNo: string }) =>
      row.catNo !== null ? row.catNo : "-",
    allowOverflow: true,
    center: true,
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
  },
  {
    name: "출고",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: (row) => <StockOut rowData={row} />,
    center: true,
    omit: getStockCategoryVal === "BS_3005002" ? true : false,
  },
  {
    name: "재고위치",
    selector: (row: { strgPlaceVal: string }) =>
      row.strgPlaceVal !== null ? row.strgPlaceVal : "-",
    center: true,
    // wrap: true,
    allowOverflow: true,
    // grow: 10,
  },
  {
    name: "서비스",
    selector: (row: { srvcVal: string }) =>
      row.srvcVal !== null ? row.srvcVal : "-",
    allowOverflow: true,
    center: true,
  },
  {
    name: "등록일자",
    selector: (row: { createdAt: string }) =>
      row.createdAt !== null ? row.createdAt : "-",
    width: "120px",
    center: true,
  },
  {
    name: "담당자",
    selector: (row: { mngrNm: string }) =>
      row.mngrNm !== null ? row.mngrNm : "-",
    // width: "150px",
    center: true,
  },
  {
    name: "메모",
    width: "80px",
    center: true,
    cell: (row: { memo: string }) => {
      const { memo } = row;
      return (
        memo !== null &&
        memo !== "" && (
          <Tooltip title={memo} arrow>
            <IconButton size="small">
              <MyIcon icon="memo" size={24} />
            </IconButton>
          </Tooltip>
        )
      );
    },
  },
];
