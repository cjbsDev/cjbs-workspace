import { OutlinedButton } from "cjbsDSTM";
import React from "react";

export const getColumns = (goDetailPage: (uniqueCode: string) => void) => [
  {
    name: "코드 ID",
    width: "120px",
    selector: (row: { uniqueCode: string }) => row.uniqueCode,
  },
  {
    name: "코드명(국문)",
    selector: (row: { codeNm: string }) => row.codeNm,
  },
  {
    name: "코드명(영문)",
    selector: (row: { codeValue: string }) => row.codeValue,
  },

  {
    name: "상태 코드",
    width: "100px",
    button: true,
    center: true,
    cell: (row: { isRls: string; uniqueCode: string }) => {
      const { isRls, uniqueCode } = row;
      return (
        isRls == "Y" && (
          <OutlinedButton
            buttonName="관리"
            size="small"
            onClick={() => goDetailPage(uniqueCode)}
          />
        )
      );
    },
  },
];
