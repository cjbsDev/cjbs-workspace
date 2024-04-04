import React from "react";
import { Stack, Tooltip, IconButton, Box } from "@mui/material";
import MyIcon from "icon/MyIcon";
import {
  formatBusinessRegNo,
  formatNumberWithCommas,
} from "cjbsDSTM/commonFunc";

export const getColumns = (hideDirector: boolean, totalElements: any) => [
  {
    name: "No",
    selector: (row: { instId: string }) => row.instId + 900,
    center: true,
    allowOverflow: true,
    width: "60px",
  },
  {
    name: "위치",
    center: true,
    selector: (row: { lctnTypeVal: string }) => row.lctnTypeVal,
    width: "80px",
  },
  {
    name: "기관명",
    allowOverflow: true,
    selector: (row: { instNm: string }) => row.instNm,
  },
  {
    name: "사업자 등록번호",
    // width: "150px",
    center: true,
    selector: (row: { brno: string }) => formatBusinessRegNo(row.brno),
  },
  {
    name: "대표자",
    center: true,
    selector: (row: { rprsNm: string }) => row.rprsNm,
  },
  {
    name: "지역(나라)",
    minWidth: "150px",
    allowOverflow: true,
    cell: (row: { region1Val: any; region2Val: any }) => (
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        // useFlexGap
        // flexWrap="wrap"
      >
        <Box data-tag="allowRowEvents">
          {row.region1Val ?? ""} {row.region2Val ?? ""}{" "}
        </Box>
      </Stack>
    ),
  },

  {
    name: "분류",
    center: true,
    selector: (row: { instTypeVal: string }) => row.instTypeVal,
    width: "80px",
  },
  {
    name: "특성",
    center: true,
    allowOverflow: true,
    selector: (row: { ftr: string }) => row.ftr,
  },
  {
    name: "상태",
    width: "80px",
    center: true,
    selector: (row: { statusCodeVal: string }) => row.statusCodeVal,
  },
];
