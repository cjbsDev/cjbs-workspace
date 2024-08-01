import { formatNumberWithCommas, formatPhoneNumber } from "cjbsDSTM";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";
import Ellipsis from "../../../../components/Ellipsis";

export const getColumns = (goModifyPage: (esPrMngUkey: string) => void) => [
  {
    name: "번호",
    width: "80px",
    // compact: true,
    center: true,
    selector: (row) => formatNumberWithCommas(row.otsId),
  },
  {
    name: "구분",
    // width: "100px",
    // center: true,
    allowOverflow: true,
    selector: (row: { seqTypeVal: string }) =>
      row.seqTypeVal !== null ? row.seqTypeVal : "-",
  },
  {
    name: "날짜",
    // width: "120px",
    selector: (row: { otsDttm: string }) =>
      row.otsDttm !== null ? row.otsDttm : "-",
    center: true,
    allowOverflow: true,
  },
  {
    name: "업체",
    selector: (row: { agncVal: string }) =>
      row.agncVal !== null ? row.agncVal : "-",
    // center: true,
    allowOverflow: true,
    grow: 2,
  },
  {
    name: "접수번호",
    selector: (row: { rcptNum: string }) =>
      row.rcptNum !== null ? row.rcptNum : "-",
    // width: "150px",
    right: true,
    allowOverflow: true,
    // grow: 2,
  },
  {
    name: "오더정보",
    minWidth: "200px",
    selector: (row: { orderInfo: string }) =>
      row.orderInfo !== null ? row.orderInfo : "-",
    cell: (row) => {
      const { orderInfo } = row;
      return <Ellipsis text={orderInfo} line={1} />;
    },
    // center: true,
  },
  {
    name: "샘플정보",
    selector: (row: { sampleInfo: string }) =>
      row.sampleInfo !== null ? row.sampleInfo : "-",
    allowOverflow: true,
    minWidth: "150px",
    // center: true,
  },
  {
    name: "샘플종류",
    selector: (row: { sampleTypeVal: string }) =>
      row.sampleTypeVal !== null ? row.sampleTypeVal : "-",
    allowOverflow: true,
    // center: true,
  },
  {
    name: "샘플수(rxn/mer)",
    selector: (row: { sampleCnt: number }) =>
      formatNumberWithCommas(row.sampleCnt),
    width: "150px",
    right: true,
  },
  {
    name: "서비스종류",
    selector: (row: { srvcTypeVal: string }) =>
      row.srvcTypeVal !== null ? row.srvcTypeVal : "-",
    minWidth: "150px",
    // center: true,
    allowOverflow: true,
  },
  {
    name: "분석종류",
    selector: (row: { anlsTypeVal: string }) =>
      row.anlsTypeVal !== null ? row.anlsTypeVal : "-",
    allowOverflow: true,
    wrap: true,
    minWidth: "150px",
    // center: true,
    // grow: 3,
  },
  {
    name: "플랫폼",
    selector: (row: { pltfVal: string }) =>
      row.pltfVal !== null ? row.pltfVal : "-",
    // center: true,
    minWidth: "150px",
    allowOverflow: true,
    wrap: true,
    // grow: 3,
  },
  {
    name: "견적금액",
    selector: (row: { qttnPrice: number }) =>
      formatNumberWithCommas(row.qttnPrice),
    allowOverflow: true,
    right: true,
  },
  {
    name: "최종금액",
    selector: (row: { lastPrice: number }) =>
      formatNumberWithCommas(row.lastPrice),
    allowOverflow: true,
    right: true,
  },
  {
    name: "발주자",
    selector: (row: { clrNm: string }) =>
      row.clrNm !== null ? row.clrNm : "-",
    // width: "150px",
    center: true,
  },
  {
    name: "결과접수일",
    selector: (row: { resultRcpnDttm: string }) =>
      row.resultRcpnDttm !== null ? row.resultRcpnDttm : "-",
    // width: "120px",
    allowOverflow: true,
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
