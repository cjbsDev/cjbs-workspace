import { formatNumberWithCommas } from "cjbsDSTM";
import React from "react";
import { Chip, IconButton, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";
import CancelBtn from "./CancelBtn";

export const getColumns = () => [
  {
    name: "재고ID",
    width: "80px",
    center: true,
    selector: (row: { stockId: number }) => formatNumberWithCommas(row.stockId),
  },
  {
    name: "종류",
    selector: (row: { stockCtgrVal: string }) =>
      row.stockCtgrVal !== null ? row.stockCtgrVal : "-",
    center: true,
    width: "100px",
  },
  {
    name: "구분",
    selector: (row: { inOut: string }) =>
      row.inOut !== null ? row.inOut : "-",
    center: true,
    width: "80px",
    cell: (row: { inOut: string }) => {
      return (
        <Chip
          label={row.inOut}
          size="small"
          color={row.inOut === "입고" ? "success" : "warning"}
        />
      );
    },
  },
  {
    name: "품명",
    selector: (row: { stockNm: string }) =>
      row.stockNm !== null ? row.stockNm : "-",
    center: true,
    allowOverflow: true,
  },
  {
    name: "제조사",
    selector: (row: { mkrNm: string }) =>
      row.mkrNm !== null ? row.mkrNm : "-",
    center: true,
    allowOverflow: true,
  },
  {
    name: "규격",
    selector: (row: { stnd: string }) => (row.stnd !== null ? row.stnd : "-"),
    center: true,
    allowOverflow: true,
  },
  {
    name: "단위",
    selector: (row: { unitVal: string }) =>
      row.unitVal !== null ? row.unitVal : "-",
    center: true,
    width: "80px",
  },
  {
    name: "Cat.No",
    selector: (row: { catNo: string }) =>
      row.catNo !== null ? row.catNo : "-",
    center: true,
    allowOverflow: true,
  },
  {
    name: "입/출고 수량",
    selector: (row: { stockInOutCnt: number }) =>
      formatNumberWithCommas(row.stockInOutCnt),
    center: true,
  },
  {
    name: "잔여 수량",
    selector: (row: { stockCnt: number }) =>
      formatNumberWithCommas(row.stockCnt),
    center: true,
  },
  {
    name: "처리일",
    selector: (row: { inOutDttm: string }) =>
      row.inOutDttm !== null ? row.inOutDttm : "-",
    width: "120px",
    center: true,
  },
  {
    name: "관리자",
    selector: (row: { mngrNm: string }) =>
      row.mngrNm !== null ? row.mngrNm : "-",
    width: "100px",
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
  {
    width: "80px",
    center: true,
    button: true,
    cell: (row: {
      isCancelButtonStatus: string;
      inOut: string;
      stockInOutUkey: string;
    }) => {
      const { isCancelButtonStatus, inOut, stockInOutUkey } = row;
      return (
        <>
          <CancelBtn
            inOut={inOut}
            isCancelButtonStatus={isCancelButtonStatus}
            stockInOutUkey={stockInOutUkey}
          />
        </>
      );
    },
  },
];
