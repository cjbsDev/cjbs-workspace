import React, { useEffect, useRef, useState } from "react";
import { Stack, Typography, Chip, Box } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import { blue, cjbsTheme, green, grey, red } from "cjbsDSTM";
import Ellipsis from "./Ellipsis";
import { sampleSize } from "lodash";
import DisplayMoney from "../../../../../../../../components/DisplayMoney";

export const getColumns = () => [
  {
    name: "거래처 번호",
    width: "100px",
    center: true,
    // sortable: true,
    selector: (row: any, index: number) => row.agncId,
  },
  {
    // name: (
    //   <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
    //     <Typography variant="body2">거래처(PI)</Typography>
    //   </Stack>
    // ),
    name: "거래처(PI)",
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
    name: "연구 책임자",
    width: "200px",
    // sortable: true,
    selector: (row: any) => row.rhpiNm,
  },
  {
    name: "영업 담당자",
    width: "200px",
    center: true,
    // sortable: true,
    selector: (row: any) => row.bsnsMngrNm,
  },
  {
    name: "결제 총계",
    width: "200px",
    right: true,
    // selector: (row: any) =>
    //   row.totalPymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cell: (row) => {
      return <DisplayMoney price={row.totalPymtPrice} />;
    },
  },
  {
    name: "분석 총계",
    width: "200px",
    right: true,
    // selector: (row: any) =>
    //   row.totalAnlsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cell: (row) => {
      return <DisplayMoney price={row.totalAnlsPrice} />;
    },
  },
  {
    name: "남은금액",
    width: "200px",
    right: true,
    // selector: (row: any) =>
    //   row.rmnPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cell: (row) => {
      return <DisplayMoney price={row.rmnPrice} />;
    },
  },
  {
    name: "결제 상태",
    width: "150px",
    center: true,
    cell: (row: { pymtStatusVal: string }) => {
      const { pymtStatusVal } = row;
      return (
        <Chip
          data-tag="allowRowEvents"
          label={pymtStatusVal}
          size="small"
          sx={{
            backgroundColor:
              pymtStatusVal === "선결제"
                ? blue["50"]
                : pymtStatusVal === "완료"
                  ? green["50"]
                  : pymtStatusVal === "취소"
                    ? red["50"]
                    : grey["100"],
            color:
              pymtStatusVal === "선결제"
                ? cjbsTheme.palette.primary.main
                : pymtStatusVal === "완료"
                  ? cjbsTheme.palette.success.main
                  : pymtStatusVal === "취소"
                    ? cjbsTheme.palette.error.main
                    : cjbsTheme.palette.common.black,
          }}
        />
      );
    },
  },
];
