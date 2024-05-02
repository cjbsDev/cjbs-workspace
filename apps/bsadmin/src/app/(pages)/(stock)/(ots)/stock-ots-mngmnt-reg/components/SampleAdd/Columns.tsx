import { formatNumberWithCommas, formatPhoneNumber } from "cjbsDSTM";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";

export const getColumns = () => [
  {
    name: "샘플 번호",
    center: true,
    allowOverflow: true,
    // width: "80px",
    // sortable: true,
    selector: (row) => row.sampleId,
  },
  {
    name: "샘플명",
    center: true,
    allowOverflow: true,
    selector: (row) => row.sampleNm,
  },
  {
    name: "샘플종류",
    center: true,
    allowOverflow: true,
    // width: "80px",
    // sortable: true,
    selector: (row) => row.sampleTypeVal,
  },
  {
    name: "Source",
    allowOverflow: true,
    center: true,
    selector: (row) => row.source,
  },
  {
    name: "Depth(GB)",
    center: true,
    selector: (row) => row.depthVal,
  },
  {
    name: "Taxon",
    center: true,
    allowOverflow: true,
    selector: (row) => row.taxonVal,
  },
  {
    name: "오더 번호",
    center: true,
    selector: (row) => row.orderId,
  },
  {
    name: "서비스 타입",
    center: true,
    selector: (row) => row.srvcTypeVal,
  },
];
