import React, { useEffect, useRef, useState } from "react";
import { Stack, Typography, Chip, Box, IconButton } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import { cjbsTheme } from "cjbsDSTM";
import Ellipsis from "./Ellipsis";
import ReportModifyBtn from "./ReportModify/reportModifyBtn";
import MemoModifyBtn from "./MemoModify/memoModifyBtn";

export const getColumns = () => [
  {
    name: "No",
    width: "90px",
    center: true,
    // sortable: true,
    // sortField: "orderId",
    selector: (row: { invcId: number }) => row.invcId,
  },
  {
    name: "상태",
    width: "80px",
    center: true,
    // sortable: true,
    // sortField: "orderId",
    selector: (row: { invcStatusVal: string }) => row.invcStatusVal,
    cell: (row: { invcStatusVal: string }) => {
      const { invcStatusVal } = row;
      return (
        <Chip
          label={invcStatusVal}
          size="small"
          color={invcStatusVal === "요청" ? "primary" : "success"}
        />
      );
    },
  },
  {
    name: "거래처",
    width: "220px",
    // style: { paddingRight: "50px" },
    cell: (row: { isSpecialMng: string; instNm: string; agncNm: string }) => {
      const { isSpecialMng, instNm, agncNm } = row;
      return (
        <Stack data-tag="allowRowEvents">
          <Box data-tag="allowRowEvents">
            <Stack direction="row" spacing={"2px"} alignItems="center">
              <Typography data-tag="allowRowEvents" variant="body2">
                {agncNm}
              </Typography>
              {isSpecialMng === "Y" && (
                <MyIcon
                  icon="vip-fill"
                  width={15}
                  data-tag="allowRowEvents"
                  color="#FFAB33"
                />
              )}
            </Stack>
          </Box>
          {instNm !== null && (
            <Typography
              data-tag="allowRowEvents"
              variant="body2"
              sx={{
                width: 220,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              ({instNm})
            </Typography>
          )}
        </Stack>
      );
    },
  },
  {
    name: "거래처 코드",
    right: true,
    width: "100px",
    selector: (row: { agncId: number }) => row.agncId,
  },
  {
    name: "영업담당",
    center: true,
    width: "120px",
    selector: (row: { bsnsMngrNm: null | string }) =>
      row.bsnsMngrNm === null ? "-" : row.bsnsMngrNm,
  },
  {
    name: "결제구분",
    center: true,
    width: "90px",
    allowOverflow: false,
    selector: (row: { pymtVal: string }) => row.pymtVal,
  },

  {
    name: "수량",
    width: "80px",
    right: true,
    selector: (row: { sampleSize: number }) =>
      row.sampleSize === 0 ? "-" : row.sampleSize,
  },
  {
    name: "총 공급가액",
    // width: "120px",
    right: true,
    selector: (row: { totalSupplyPrice: number }) =>
      formatNumberWithCommas(row.totalSupplyPrice),
  },
  {
    name: "부가세",
    right: true,
    selector: (row: { vat: number }) => formatNumberWithCommas(row.vat),
  },
  {
    name: "합계금액",
    // width: "200px",
    right: true,
    // selector: (row: { totalPrice: number }) =>
    //   formatNumberWithCommas(row.totalPrice),
    cell: (row: { totalPrice: number }) => {
      return (
        <Typography
          variant="body2"
          sx={{
            color: row.totalPrice < 0 ? cjbsTheme.palette.warning.main : null,
          }}
        >
          {formatNumberWithCommas(row.totalPrice)}
        </Typography>
      );
    },
  },
  {
    name: "요청일",
    right: true,
    width: "110px",
    // sortable: true,
    // sortField: "createDttm",
    selector: (row: { createDttm: null | string }) =>
      row.createDttm === null ? "-" : row.createDttm,
  },
  {
    name: "발행일",
    right: true,
    width: "110px",
    // sortable: true,
    // sortField: "rcptDttm",
    selector: (row: { issuDttm: null | string; invcStatusVal: string }) =>
      row.invcStatusVal === "발행" && row.issuDttm !== null
        ? row.issuDttm
        : "-",
  },
  {
    name: "메모",
    width: "160px",
    cell: (row: { memo: string; invcUkey: string }) => {
      const { memo, invcUkey } = row;
      return (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Ellipsis text={memo} />
          <MemoModifyBtn memo={memo} invcUkey={invcUkey} />
          {/*<IconButton onClick={() => console.log("Click! Memo")}>*/}
          {/*  <MyIcon icon="pencil-alt" size={18} />*/}
          {/*</IconButton>*/}
        </Stack>
      );
    },
    ignoreRowClick: true,
    // allowOverflow: true,
    // button: true,
  },
  {
    name: "보고서",
    minWidth: "160px",
    selector: (row: { report: null | string }) =>
      row.report === null ? "-" : row.report,
    cell: (row: { report: string; invcUkey: string }) => {
      const { report, invcUkey } = row;
      return (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Ellipsis text={report} />
            <ReportModifyBtn report={report} invcUkey={invcUkey} />
          </Stack>
        </>
      );
    },
    ignoreRowClick: true,
    // allowOverflow: true,
    // button: true,
  },
];
