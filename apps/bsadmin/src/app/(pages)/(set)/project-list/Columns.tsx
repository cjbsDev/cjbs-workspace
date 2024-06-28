import { OutlinedButton } from "cjbsDSTM";
import React from "react";

export const getColumns = (goDetailPage: (prjtUkey: string) => void) => [
  {
    name: "코드",
    selector: (row: { douzone: string }) => row.douzone,
    width: "150px",
  },
  {
    name: "과제명",
    selector: (row: { prjtNm: string }) => row.prjtNm,
  },
  {
    name: "과제 담당자",
    center: "center",
    width: "100px",
    selector: (row: { prjtMngrNm: string }) => row.prjtMngrNm,
  },
  {
    name: "수행부서",
    center: "center",
    width: "300px",
    selector: (row: { departCodeMcVal: string }) => row.departCodeMcVal,
  },
  {
    name: "사용중인 세부연구",
    width: "150px",
    right: true,
    selector: (row: { prjtDetailCnt: string }) => row.prjtDetailCnt,
  },
  {
    name: "관리",
    width: "80px",
    center: true,
    button: true,
    cell: (row: { prjtUkey: string }) => {
      return (
        <OutlinedButton
          buttonName="관리"
          size="small"
          onClick={() => goDetailPage(row.prjtUkey)}
        />
      );
    },
  },
];
