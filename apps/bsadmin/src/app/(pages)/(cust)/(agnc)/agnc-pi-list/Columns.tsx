import React from "react";
import { Stack, Tooltip, IconButton, Box } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";

export const getColumns = (hideDirector: boolean, totalElements: any) => [
  {
    name: "번호",
    selector: (row: { agncId: number }) => row.agncId,
    width: "80px",
    center: true,
  },
  {
    name: "거래처(PI)",
    width: "350px",
    allowOverflow: true,
    cell: (row: { agncNm: any; instNm: any; isSpecialMng: string }) => (
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        // useFlexGap
        // flexWrap="wrap"
      >
        {row.isSpecialMng === "Y" && (
          <MyIcon
            data-tag="allowRowEvents"
            icon="vip-fill"
            size={18}
            color="#FFAB33"
          />
        )}
        <Box data-tag="allowRowEvents">{row.agncNm} </Box>
        <Box data-tag="allowRowEvents">({row.instNm})</Box>
      </Stack>
    ),
  },

  {
    name: "연구책임자 아이디",
    allowOverflow: true,
    selector: (row: { ebcEmail: any }) => row.ebcEmail,
    center: true,
  },
  {
    name: "연구책임자 이름",
    allowOverflow: true,
    center: true,
    selector: (row: { custNm: any }) => row.custNm,
  },

  {
    name: "소속 연구원",
    right: true,
    cell: (row: { memberCount: number }) => (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Box>{row.memberCount} 명</Box>
      </Stack>
    ),
    width: "100px",
  },

  {
    name: "선결제 금액",
    width: "200px",
    right: true,
    selector: (row: { rmnPrePymtPrice: number }) =>
      row.rmnPrePymtPrice
        ? formatNumberWithCommas(row.rmnPrePymtPrice) + " 원"
        : "-",
  },

  {
    name: "영업 담당자",
    center: true,
    width: "120px",
    selector: (row: { bsnsMngrNm: any }) => row.bsnsMngrNm,
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
