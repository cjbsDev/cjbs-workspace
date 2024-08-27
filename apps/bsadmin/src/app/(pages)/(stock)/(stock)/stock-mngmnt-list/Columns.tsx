import { formatNumberWithCommas } from "cjbsDSTM";
import React from "react";
import StockIn from "./components/StockIn";
import StockOut from "./components/StockOut";
import DisplayMoney from "../../../../components/DisplayMoney";

export const getColumns = (getStockCategoryVal: string) => [
  {
    name: "재고ID",
    center: true,
    width: "100px",
    sortable: true,
    sortField: "stockId",
    selector: (row) => row.stockId,
  },
  {
    name: "보조금",
    width: "100px",
    center: true,
    sortable: true,
    sortField: "isAstnPrice",
    selector: (row: { isAstnPrice: string }) => row.isAstnPrice,
  },
  {
    name: "GutInside",
    width: "120px",
    center: true,
    sortable: true,
    sortField: "isGutInside",
    selector: (row: { isGutInside: string }) => row.isGutInside,
  },
  {
    name: "사용중",
    width: "100px",
    center: true,
    sortable: true,
    sortField: "isUsed",
    selector: (row: { isUsed: string }) => row.isUsed,
  },
  {
    name: "품명",
    minWidth: "350px",
    sortable: true,
    sortField: "stockNm",
    wrap: true,
    selector: (row: { stockNm: string }) =>
      row.stockNm !== "" ? row.stockNm : "-",
  },
  {
    name: "제조사",
    minWidth: "180px",
    wrap: true,
    sortable: true,
    sortField: "mkrNm",
    selector: (row: { mkrNm: string }) => (row.mkrNm !== "" ? row.mkrNm : "-"),
    // cell: (row: { mkrNm: string }) => {
    //   return <Ellipsis text={row.mkrNm} line={1} />;
    // },
  },
  {
    name: "규격",
    selector: (row: { stnd: string }) => (row.stnd !== "" ? row.stnd : "-"),
    width: "120px",
    wrap: true,
    sortable: true,
    sortField: "stnd",
  },
  {
    name: "단위",
    sortable: true,
    sortField: "unitVal",
    selector: (row: { unitVal: string }) =>
      row.unitVal !== "" ? row.unitVal : "-",
    // width: "80px",
    // center: true,
  },
  {
    name: "Cat.No",
    width: "180px",
    sortable: true,
    sortField: "catNo",
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
    // sortable: true,
    // sortField: "",
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
    // sortable: true,
    // sortField: "",
  },
  {
    name: "단가",
    cell: (row) => <DisplayMoney price={row.unpr} />,
    right: true,
    minWidth: "120px",
    sortable: true,
    sortField: "unpr",
  },
  {
    name: "입고량",
    cell: (row) => formatNumberWithCommas(row.stockInCnt),
    right: true,
    // sortable: true,
    // sortField: "stockInCnt",
  },
  {
    name: "출고량",
    cell: (row) => formatNumberWithCommas(row.stockOutCnt),
    right: true,
    // sortable: true,
    // sortField: "stockOutCnt",
  },
  {
    name: "재고량",
    cell: (row) => formatNumberWithCommas(row.stockCnt),
    right: true,
    // sortable: true,
    // sortField: "stockCnt",
  },
  {
    name: "재고위치",
    width: "180px",
    wrap: true,
    selector: (row: { strgPlaceVal: string }) =>
      row.strgPlaceVal !== "" ? row.strgPlaceVal : "-",
    sortable: true,
    sortField: "strgPlaceVal",
  },
  {
    name: "서비스",
    width: "150px",
    wrap: true,
    selector: (row: { srvcVal: string }) =>
      row.srvcVal !== "" ? row.srvcVal : "-",
    sortable: true,
    sortField: "srvcVal",
  },
  {
    name: "등록일자",
    selector: (row: { createdAt: string }) =>
      row.createdAt !== "" ? row.createdAt : "-",
    width: "120px",
    center: true,
    sortable: true,
    sortField: "createdAt",
  },
  {
    name: "담당자",
    selector: (row: { mngrNm: string }) =>
      row.mngrNm !== "" ? row.mngrNm : "-",
    width: "100px",
    center: true,
    sortable: true,
    sortField: "mngrNm",
  },
  {
    name: "메모",
    minWidth: "200px",
    wrap: true,
    sortable: true,
    sortField: "memo",
    selector: (row: { memo: string }) => (row.memo !== "" ? row.memo : "-"),
    // cell: (row: { memo: string }) => {
    //   const { memo } = row;
    //   return memo !== null && memo !== "" && <Ellipsis text={memo} line={2} />;
    // },
  },
];
