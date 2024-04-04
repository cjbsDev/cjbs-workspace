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
import { blue, red, grey, green } from "cjbsDSTM/themes/color";
import { cjbsTheme } from "cjbsDSTM";
import Dayjs from "dayjs";

export const getColumns = (hideDirector: boolean, totalElements: any) => [
  {
    name: "고객 번호",
    center: true,
    cell: (row: { ebcUid: number; agncUkey: string }) => (
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        // useFlexGap
        // flexWrap="wrap"
      >
        <Box data-tag="allowRowEvents">{row.ebcUid} </Box>
        {row.agncUkey == null && (
          <MyIcon
            data-tag="allowRowEvents"
            icon="exclamation-triangle-fill"
            size={20}
            color="#FFAB33"
          />
        )}
      </Stack>
    ),
    width: "120px",
  },

  {
    name: "아이디",
    selector: (row: { ebcEmail: string }) => row.ebcEmail,
    // width: "200px",
  },
  {
    name: "이름",
    selector: (row: { custNm: string }) => row.custNm,
    // width: "150px",
  },

  {
    name: "거래처(PI)",

    cell: (row: { instNm: any; agncNm: any }) => (
      <>
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          useFlexGap
          flexWrap="wrap"
          data-tag="allowRowEvents"
        >
          <Box data-tag="allowRowEvents">{row.agncNm}</Box>
          {row.instNm && (
            <Box data-tag="allowRowEvents">({row.instNm})</Box>
          )}
        </Stack>
      </>
    ),
    // minWidth: "300px",
  },

  {
    name: "마지막 수정",
    width: "150px",
    right: true,
    selector: (row: { modifiedAt: any }) =>
      row.modifiedAt && Dayjs(row.modifiedAt).format("YYYY-MM-DD"),
  },

  {
    name: "메모",
    width: "80px",
    center: true,
    cell: (row: { memo: string }) => {
      return (
        row.memo !== null &&
        row.memo !== "" && (
          <Tooltip title={row.memo} arrow>
            <IconButton size="small">
              <MyIcon icon="memo" size={24} />
            </IconButton>
          </Tooltip>
        )
      );
    },
  },
];
