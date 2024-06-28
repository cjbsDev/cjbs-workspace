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
    name: "No.",
    width: "100px",
    center: true,
    // sortable: true,
    selector: (row) => row.invcId,
  },
  {
    name: "거래처 번호",
    width: "110px",
    center: true,
    // sortable: true,
    selector: (row) => row.agncId,
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">거래처(PI)</Typography>
      </Stack>
    ),
    // width: "300px",
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
    width: "150px",
    // sortable: true,
    selector: (row: any) => row.rhpiNm,
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">영업 담당자</Typography>
      </Stack>
    ),
    width: "150px",
    // sortable: true,
    selector: (row: any) => row.bsnsMngrNm,
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">발행일자</Typography>
      </Stack>
    ),
    width: "110px",
    // sortable: true,
    selector: (row: any) => row.issueDttm,
  },
  {
    name: "결제 상태",
    center: true,
    cell: (row: { pymtInfoVal: string }) => {
      const { pymtInfoVal } = row;
      return (
        <Chip
          data-tag="allowRowEvents"
          label={pymtInfoVal}
          size="small"
          sx={{
            backgroundColor:
              pymtInfoVal === "카드"
                ? blue["50"]
                : pymtInfoVal === "계산서"
                  ? green["50"]
                  : pymtInfoVal === "이관"
                    ? red["50"]
                    : grey["100"],
            color:
              pymtInfoVal === "카드"
                ? cjbsTheme.palette.primary.main
                : pymtInfoVal === "계산서"
                  ? cjbsTheme.palette.success.main
                  : pymtInfoVal === "이관"
                    ? cjbsTheme.palette.error.main
                    : cjbsTheme.palette.common.black,
          }}
        />
      );
    },
    width: "120px",
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">금액(초기발생)</Typography>
      </Stack>
    ),
    width: "200px",
    right: true,
    // selector: (row: any) =>
    //   row.prePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cell: (row: any) => {
      return <DisplayMoney price={row.prePymtPrice} />;
    },
  },
  {
    name: (
      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="body2">남은 선결제 금액</Typography>
      </Stack>
    ),
    width: "200px",
    right: true,
    // selector: (row: any) =>
    //   row.rmnPrePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cell: (row: any) => {
      return <DisplayMoney price={row.rmnPrePymtPrice} />;
    },
  },
];
