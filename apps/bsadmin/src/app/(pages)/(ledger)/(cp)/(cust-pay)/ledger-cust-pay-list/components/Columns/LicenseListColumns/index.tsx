import React, { useEffect, useRef, useState } from "react";
import { Stack, Typography, Chip, Box } from "@mui/material";
import DisplayMoney from "../../../../../../../../components/DisplayMoney";

export const getColumns = () => [
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">분석내역서</Typography>
      </Stack>
    ),
    width: "100px",
    center: true,
    // sortable: true,
    selector: (row: any) => row.anlsItstId,
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">거래처(PI)</Typography>
      </Stack>
    ),
    // sortable: true,
    // selector: (row : {agncNm: string; instNm: string}) => row.agncNm,
    cell: (row: any) => {
      const { instNm, agncNm } = row;
      return (
        <Stack data-tag="allowRowEvents">
          <Box data-tag="allowRowEvents">
            <Stack direction="row" spacing={"2px"} alignItems="center">
              <Typography data-tag="allowRowEvents" variant="body2">
                {agncNm}
              </Typography>
            </Stack>
          </Box>
          <Typography data-tag="allowRowEvents" variant="body2">
            ({instNm})
          </Typography>
        </Stack>
      );
    },
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">연구 책임자</Typography>
      </Stack>
    ),
    // width: "130px",
    center: true,
    // sortable: true,
    selector: (row: any) => row.rhpiNm,
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">영업 담당자</Typography>
      </Stack>
    ),
    width: "130px",
    center: true,
    // sortable: true,
    selector: (row: any) => row.bsnsMngrNm,
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">공급가액</Typography>
      </Stack>
    ),
    width: "150px",
    right: true,
    // sortable: true,
    // selector: (row: any) =>
    //   row.totalSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cell: (row) => {
      return <DisplayMoney price={row.totalSupplyPrice} />;
    },
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">사용 기간</Typography>
      </Stack>
    ),
    width: "200px",
    center: true,
    // sortable: true,
    selector: (row: any) => row.startDate + " ~ " + row.endDate,
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">회차</Typography>
      </Stack>
    ),
    width: "80px",
    center: true,
    // sortable: true,
    selector: (row: any) => row.currentTurn + " / " + row.totalTurn,
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">사용금액</Typography>
      </Stack>
    ),
    width: "150px",
    right: true,
    // sortable: true,
    selector: (row: any) =>
      row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cell: (row) => {
      return <DisplayMoney price={row.price} />;
    },
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">플랫폼</Typography>
      </Stack>
    ),
    // sortable: true,
    // selector: (row: any) => row.currentTurn+" / "+row.pltfVal,
    selector: (row: any) => "MTP / " + row.pltfVal,
  },
];
