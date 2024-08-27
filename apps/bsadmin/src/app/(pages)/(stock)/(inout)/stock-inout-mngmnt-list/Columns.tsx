import { formatNumberWithCommas } from "cjbsDSTM";
import React from "react";
import { Chip, IconButton, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";
import CancelBtn from "./CancelBtn";

export const getColumns = () => [
  {
    name: "재고ID",
    width: "100px",
    center: true,
    // sortable: true,
    // sortField: "stockId",
    selector: (row: { stockId: number }) => row.stockId,
  },
  {
    name: "종류",
    // sortable: true,
    // sortField: "stockCtgrVal",
    selector: (row: { stockCtgrVal: string }) =>
      row.stockCtgrVal !== null ? row.stockCtgrVal : "-",
    center: true,
    width: "100px",
  },
  {
    name: "구분",
    // sortable: true,
    // sortField: "inOut",
    selector: (row: { inOut: string }) =>
      row.inOut !== null ? row.inOut : "-",
    center: true,
    // width: "80px",
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
    // sortable: true,
    // sortField: "stockNm",
    selector: (row: { stockNm: string }) =>
      row.stockNm !== null ? row.stockNm : "-",
    // center: true,
    wrap: true,
    minWidth: "200px",
  },
  {
    name: "제조사",
    wrap: true,
    minWidth: "200px",
    // sortable: true,
    // sortField: "mkrNm",
    selector: (row: { mkrNm: string }) =>
      row.mkrNm !== null ? row.mkrNm : "-",
    // center: true,
    // allowOverflow: true,
  },
  {
    name: "규격",
    wrap: true,
    minWidth: "100px",
    // sortable: true,
    // sortField: "stnd",
    selector: (row: { stnd: string }) => (row.stnd !== null ? row.stnd : "-"),
    center: true,
  },
  {
    name: "단위",
    // sortable: true,
    // sortField: "unitVal",
    selector: (row: { unitVal: string }) =>
      row.unitVal !== null ? row.unitVal : "-",
    // center: true,
    // width: "80px",
    allowOverflow: true,
  },
  {
    name: "Cat.No",
    // sortable: true,
    // sortField: "catNo",
    selector: (row: { catNo: string }) =>
      row.catNo !== null ? row.catNo : "-",
    // center: true,
    allowOverflow: true,
  },
  {
    name: "입/출고 수량",
    minWidth: "120px",
    // sortable: true,
    // sortField: "stockInOutCnt",
    selector: (row: { stockInOutCnt: number }) =>
      formatNumberWithCommas(row.stockInOutCnt),
    right: true,
  },
  {
    name: "잔여 수량",
    // sortable: true,
    // sortField: "stockCnt",
    selector: (row: { stockCnt: number }) =>
      formatNumberWithCommas(row.stockCnt),
    right: true,
  },
  {
    name: "처리일",
    // sortable: true,
    // sortField: "inOutDttm",
    selector: (row: { inOutDttm: string }) =>
      row.inOutDttm !== null ? row.inOutDttm : "-",
    width: "120px",
    right: true,
  },
  {
    name: "관리자",
    // sortable: true,
    // sortField: "mngrNm",
    selector: (row: { mngrNm: string }) =>
      row.mngrNm !== null ? row.mngrNm : "-",
    // width: "100px",
    center: true,
  },
  {
    name: "처리자",
    // sortable: true,
    // sortField: "creatorNm",
    selector: (row: { creatorNm: string }) =>
      row.creatorNm !== null ? row.creatorNm : "-",
    // width: "100px",
    center: true,
  },
  {
    name: "메모",
    width: "80px",
    center: true,
    // sortable: true,
    // sortField: "memo",
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
