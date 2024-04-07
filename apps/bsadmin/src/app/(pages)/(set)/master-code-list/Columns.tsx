import { OutlinedButton } from "cjbsDSTM";
import React from "react";
import { Box, Typography } from "@mui/material";

export const getColumns = () => [
  {
    name: "코드 ID",
    width: "120px",
    ignoreRowClick: true,
    // selector: (row: { uniqueCode: string }) => row.uniqueCode,
    cell: (row: { uniqueCode: string }) => {
      return <Typography variant="body2">{row.uniqueCode}</Typography>;
    },
  },
  {
    name: "코드명(국문)",
    ignoreRowClick: true,
    // selector: (row: { codeNm: string }) => row.codeNm,
    cell: (row: { codeNm: string }) => {
      return <Typography variant="body2">{row.codeNm}</Typography>;
    },
  },
  {
    name: "코드명(영문)",
    ignoreRowClick: true,
    // selector: (row: { codeValue: string }) => row.codeValue,
    cell: (row: { codeValue: string }) => {
      return <Typography variant="body2">{row.codeValue}</Typography>;
    },
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
            data-tag="allowRowEvents"
            buttonName="관리"
            size="small"
          />
        )
      );
    },
  },
];
