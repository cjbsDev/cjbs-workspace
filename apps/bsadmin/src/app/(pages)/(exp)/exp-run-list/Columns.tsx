import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import MyIcon from "icon/MyIcon";

export const getColumns = () => [
  {
    name: "No",
    width: "80px",
    sortable: true,
    // center: true,
    selector: (row, index) => row.runId,
  },
  {
    name: "RUN 타입",
    minWidth: "200px",
    wrap: true,
    sortable: true,
    selector: (row) => row.runTypeVal,
  },
  {
    name: "진행업체",
    minWidth: "160px",
    wrap: true,
    sortable: true,
    selector: (row) => row.seqAgncVal,
  },
  {
    name: "장비",
    // minWidth: "100px",
    wrap: true,
    selector: (row) => row.machineVal,
  },
  {
    name: "Kit",
    minWidth: "260px",
    wrap: true,
    grow: 3,
    selector: (row) => (row.kitVal === null ? "-" : row.kitVal),
  },
  {
    name: "RUN 날짜",
    width: "120px",
    right: true,
    selector: (row) => row.runDttm,
  },
  {
    name: "RUN 샘플",
    width: "100px",
    right: true,
    selector: (row) => row.runSamplesMpngCnt,
  },
  {
    name: "BI 분석 요청",
    width: "120px",
    center: true,
    selector: (row) => row.isBiRqst,
  },
  {
    name: "요청일",
    width: "120px",
    right: true,
    selector: (row) => (row.biRqstDttm === null ? "-" : row.biRqstDttm),
  },
  {
    name: "메모",
    center: true,
    width: "80px",
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
