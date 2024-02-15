import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";
import Link from "next/link";
import { cjbsTheme } from "cjbsDSTM";
import { GET } from "api";
import axios from "axios";
import FileSaver from "file-saver";

const formatValue = (value) => (value === null ? "-" : value);

export const Columns = () => [
  {
    name: "No",
    width: "80px",
    // sortable: true,
    center: true,
    selector: (row, index) => index + 1,
  },
  {
    name: "파일명",
    width: "200px",
    // sortable: true,
    selector: (row) => row.fileOriginNm,
  },
  {
    name: "샘플개수",
    right: true,
    selector: (row) => formatValue(row.sampleCnt),
  },
  {
    name: "업로더",
    width: "100px",
    center: true,
    selector: (row) => row.userNm,
  },
  {
    name: "메모",
    width: "300px",
    selector: (row) => row.fileMemo,
  },
  {
    name: "업로드 일자",
    width: "120px",
    right: true,
    selector: (row) => (row.createdDttm === null ? "-" : row.createdDttm),
  },
  {
    name: "샘플번호",
    width: "100px",
    right: true,
    selector: (row) => row.sampleId,
  },
  {
    name: "오더번호",
    width: "100px",
    right: true,
    selector: (row) => row.orderId,
  },
  {
    name: "Prep 담당자",
    center: true,
    selector: (row) => row.prepMngrNm,
  },
  {
    name: "사용 kit",
    width: "200px",
    selector: (row) => row.prepUsedKit,
  },
  {
    name: "UV conc.(ng/ul)",
    width: "150px",
    right: true,
    selector: (row) => row.prepUvConc,
  },
  {
    name: "Qubit conc.(ng/ul)",
    width: "150px",
    right: true,
    selector: (row) => row.prepQubitConc,
  },
  {
    name: "volume(ul)",
    right: true,
    selector: (row) => row.prepVm,
  },
  {
    name: "A260/A280 ratio",
    width: "150px",
    right: true,
    selector: (row) => row.prepARatio,
  },
  {
    name: "total amount.(ug)",
    width: "150px",
    right: true,
    selector: (row) => row.prepTotalAmount,
  },
  {
    name: "humic처리여부(O, X)",
    width: "170px",
    center: true,
    selector: (row) => row.prepHmc,
  },
  {
    name: "humic후 농도(ng/ul)",
    width: "150px",
    center: true,
    selector: (row) => row.prepHmcDnst,
  },
  {
    name: "QC result",
    center: true,
    selector: (row) => row.prepResult,
  },
];
