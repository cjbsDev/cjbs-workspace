import React from "react";
import {
  Stack,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import LinesEllipsis from "react-lines-ellipsis";
import { blue, red, grey, green } from "cjbsDSTM/themes/color";
import { cjbsTheme } from "cjbsDSTM";

export const getColumns = (totalElements: number) => [
  {
    name: "No",
    width: "60px",
    center: true,
    // sortable: true,
    // sortField: "orderId",
    selector: (row: { invcId: number }) => row.invcId,
  },
  {
    name: "상태",
    width: "60px",
    center: true,
    // sortable: true,
    // sortField: "orderId",
    selector: (row: { invcStatusCcVal: string }) => row.invcStatusCcVal,
  },
  {
    name: "거래처",
    // width: "220px",
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
        </Stack>
      );
    },
  },
  {
    name: "거래처 코드",
    right: true,
    width: "100px",
    selector: (row: { bsnsMngrNm: null | string }) =>
      row.bsnsMngrNm === null ? "-" : row.bsnsMngrNm,
  },
  {
    name: "영업담당",
    center: true,
    width: "90px",
    selector: (row: { bsnsMngrNm: null | string }) =>
      row.bsnsMngrNm === null ? "-" : row.bsnsMngrNm,
  },
  {
    name: "결제구분",
    center: true,
    width: "90px",
    allowOverflow: false,
    selector: (row: { pymtCcVal: string }) => row.pymtCcVal,
  },

  {
    name: "수량",
    width: "80px",
    right: true,
    selector: (row: { qnty: number }) => row.qnty,
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
    selector: (row: { issuDttm: null | string }) =>
      row.issuDttm === null ? "-" : row.issuDttm,
  },
  {
    name: "메모",
    width: "160px",
    // center: true,
    cell: (row: { memo: string }) => {
      const { memo } = row;
      return (
        memo !== null &&
        memo !== "" && (
          <LinesEllipsis
            data-tag="allowRowEvents"
            text={memo}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
          // <Tooltip title={memo} arrow>
          //   <IconButton size="small">
          //     <MyIcon icon="memo" size={24} />
          //   </IconButton>
          // </Tooltip>
        )
      );
    },
  },
  {
    name: "보고서",
    width: "160px",
    selector: (row: { report: null | string }) =>
      row.report === null ? "-" : row.report,
    cell: (row: { report: string }) => {
      const { report } = row;
      return (
        report !== null &&
        report !== "" && (
          <LinesEllipsis
            data-tag="allowRowEvents"
            text={report}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
            onReflow={(rleState) =>
              console.log("보고서 clamped ==>>", rleState.clamped)
            }
          />
          // <Tooltip title={memo} arrow>
          //   <IconButton size="small">
          //     <MyIcon icon="memo" size={24} />
          //   </IconButton>
          // </Tooltip>
        )
      );
    },
  },
];
