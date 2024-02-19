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
    name: "Lib 담당자",
    center: true,
    selector: (row) => row.libMngrNm,
  },
  {
    name: "PCR type",
    center: true,
    selector: (row) => row.libPcrType,
  },
  {
    name: "input amt. (ng)",
    width: "150px",
    right: true,
    selector: (row) => row.libInputAmt,
  },
  {
    name: "Dilution Ratio",
    width: "150px",
    right: true,
    selector: (row) => row.libDltnRatio,
  },
  {
    name: "Index 1 (i7)",
    right: true,
    selector: (row) => row.libIndexOne,
  },
  {
    name: "Index 2 (i5)",
    width: "150px",
    right: true,
    selector: (row) => row.libIndexTwo,
  },
  {
    name: "picogreen Conc.(ng/ul)",
    width: "150px",
    right: true,
    selector: (row) => row.libPcgrConc,
  },
  {
    name: "pooling vol. (ul)",
    width: "170px",
    right: true,
    selector: (row) => row.libPlinVol,
  },
  {
    name: "BASize(bp)",
    width: "150px",
    right: true,
    selector: (row) => row.libBaSize,
  },
  {
    name: "Tapestation Size(bp)",
    right: true,
    selector: (row) => row.libTapst,
  },
  {
    name: "Lib. QC Result",
    center: true,
    selector: (row) => row.libResult,
  },
  {
    name: "Lib comments",
    center: true,
    selector: (row) => row.libComment,
  },
];
