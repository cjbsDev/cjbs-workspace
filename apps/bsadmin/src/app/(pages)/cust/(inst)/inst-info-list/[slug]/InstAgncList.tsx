import React, { useMemo, useState } from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/myIcon";
import useSWR from "swr";
import { DataTableBase, LeaderCip, XsmallButton } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useSetRecoilState } from "recoil";
import dynamic from "next/dynamic";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface AgncInfoDataProps {
  instUkey: string;
}

const InstAgncList: React.FC<AgncInfoDataProps> = ({ instUkey }) => {
  let getInstAgncUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/inst/agncList/${instUkey}`;
  const { data } = useSWR(getInstAgncUrl, fetcher, {
    suspense: true,
  });

  const filteredData = data.data;

  const columns = useMemo(
    () => [
      {
        name: "거래처 번호",
        selector: (row: { agncId: number }) => row.agncId,
        width: "150px",
      },
      {
        name: "거래처(PI)",
        selector: (row: { agncNm: string }) => row.agncNm,
      },

      {
        name: "리더",
        cell: (row: { custNm: any; ebcEmail: any }) => (
          <Stack direction="row" spacing={0.5}>
            <Box data-tag="allowRowEvents">{row.custNm ?? "-"} </Box>
            <Box data-tag="allowRowEvents">
              {row.ebcEmail ? "(" + row.ebcEmail + ")" : ""}
            </Box>
          </Stack>
        ),
        minWidth: "150px",
      },

      {
        name: "소속 연구원",
        selector: (row: { memberCount: number }) => row.memberCount,
        width: "100px",
      },
      {
        name: "영업 담당자",
        selector: (row: { bsnsMngrNm: string }) => row.bsnsMngrNm,
      },
    ],
    []
  );

  return (
    <>
      <DataTableBase
        title={
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">
              소속 거래처
              {filteredData && " (총 " + filteredData.length + "곳)"}
            </Typography>
          </Stack>
        }
        data={filteredData}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        pagination={false}
        selectableRows={false}
      />
    </>
  );
};

export default InstAgncList;
