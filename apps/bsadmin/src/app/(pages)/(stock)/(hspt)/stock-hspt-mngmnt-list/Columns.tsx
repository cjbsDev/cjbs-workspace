import { formatPhoneNumber, OutlinedButton } from "cjbsDSTM";
import React from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";

export const getColumns = (goModifyPage: (esPrMngUkey: string) => void) => [
  {
    name: "병원 코드",
    width: "100px",
    center: true,
    selector: (row: { stockHsptUkey: string }) =>
      row.stockHsptUkey !== null ? row.stockHsptUkey : "-",
  },
  {
    name: "병원 이름",
    selector: (row: { hsptNm: string }) =>
      row.hsptNm !== null ? row.hsptNm : "-",
    center: true,
  },
  {
    name: "주소",
    selector: (row: { addr: string }) => (row.addr !== null ? row.addr : "-"),
    // center: true,
    cell: (row) => {
      const { addr, addrDetail, zip } = row;
      return (
        <Stack>
          <Typography data-tag="allowRowEvents" variant="body2">
            {zip}
          </Typography>
          <Typography data-tag="allowRowEvents" variant="body2">
            {addr} {addrDetail}
          </Typography>
        </Stack>
      );
    },
  },
  {
    name: "전화번호",
    selector: (row: { tel: string }) =>
      row.tel !== null ? formatPhoneNumber(row.tel) : "-",
    width: "150px",
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
