import { formatPhoneNumber } from "cjbsDSTM";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";

export const getColumns = (goModifyPage: (esPrMngUkey: string) => void) => [
  {
    name: "주문처",
    // width: "100px",
    // center: true,
    allowOverflow: true,
    selector: (row: { stockAgncNm: string }) =>
      row.stockAgncNm !== null ? row.stockAgncNm : "-",
  },
  {
    name: "주문처 이메일",
    selector: (row: { email: string }) =>
      row.email !== null ? row.email : "-",
    // center: true,
    allowOverflow: true,
  },
  {
    name: "담당자",
    selector: (row: { mngrNm: string }) =>
      row.mngrNm !== null ? row.mngrNm : "-",
    // center: true,
    allowOverflow: true,
  },
  {
    name: "거래부서",
    selector: (row: { departMngrVal: string }) =>
      row.departMngrVal !== null ? row.departMngrVal : "-",
    // width: "150px",
    // center: true,
    allowOverflow: true,
  },
  {
    name: "전화번호",
    selector: (row: { mngrTel: string }) =>
      row.mngrTel !== null ? formatPhoneNumber(row.mngrTel) : "-",
    width: "150px",
    right: true,
    allowOverflow: true,
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
