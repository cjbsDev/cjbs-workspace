import { OutlinedButton } from "cjbsDSTM";
import React from "react";

export const getColumns = (goDetailPage: (prjcUkey: string) => void) => [
  {
    name: "코드",
    selector: (row: { prjcUkey: string }) => row.prjcUkey,
    width: "100px",
  },
  {
    name: "과제명",
    selector: (row: { prjcNm: string }) => row.prjcNm,
  },
  {
    name: "과제 담당자",
    center: "center",
    width: "100px",
    selector: (row: { prjcMngrNm: string }) => row.prjcMngrNm,
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
    selector: (row: { prjcDetailCnt: string }) => row.prjcDetailCnt,
  },
  {
    name: "관리",
    width: "80px",
    center: true,
    button: true,
    cell: (row: { prjcUkey: string }) => {
      return (
        <OutlinedButton
          buttonName="관리"
          size="small"
          onClick={() => goDetailPage(row.prjcUkey)}
        />
      );
    },
  },
];
