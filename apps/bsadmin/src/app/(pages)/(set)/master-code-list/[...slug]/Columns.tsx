import { OutlinedButton } from "cjbsDSTM";
import React from "react";
import { Box, Typography } from "@mui/material";

// const handleButtonClick = (row) => {
//   // eslint-disable-next-line no-console
//   console.log("clicked", row);
// };

export const getColumns = () => [
  // {
  //   center: true,
  //   name: "No",
  //   width: "80px",
  //   ignoreRowClick: true,
  //   selector: (row, index) => index + 1,
  // },
  {
    name: "상세코드 ID",
    ignoreRowClick: true,
    selector: (row: { douzoneCode: string }) => row.douzoneCode,
    // cell: (row: { codeNm: string }) => {
    //   return <Typography variant="body2">{row.codeNm}</Typography>;
    // },
  },
  {
    name: "상세코드명(국문)",
    ignoreRowClick: true,
    selector: (row: { codeNm: string }) => row.codeNm,
    // cell: (row: { codeValue: string }) => {
    //   return <Typography variant="body2">{row.codeValue}</Typography>;
    // },
  },
  {
    name: "상세코드명(영문)",
    ignoreRowClick: true,
    selector: (row: { codeValue: string }) => row.codeValue,
  },
  {
    name: "주문서 노출",
    ignoreRowClick: true,
    omit: true,
    selector: (row: { isExpsOrsh: string }) => row.isExpsOrsh,
  },
  {
    name: "사용여부",
    ignoreRowClick: true,
    omit: true,
    selector: (row: { isRls: string }) => row.isRls,
  },
  {
    name: "수정",
    width: "100px",
    button: true,
    center: true,
    ignoreRowClick: true,
    allowOverflow: true,
    cell: (row) => {
      // const { isRls, uniqueCode } = row;
      return (
        <OutlinedButton
          data-tag="allowRowEvents"
          buttonName="수정"
          size="small"
          // onClick={() => handleButtonClick(row)}
        />
      );
    },
  },
];
