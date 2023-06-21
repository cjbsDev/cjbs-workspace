import React from "react";
import axios from "axios";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/myIcon";
import useSWR from "swr";
import { DataTableBase, LeaderCip, OutlinedButton, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MemberDataTable = () => {
  let tempUrl =
    "http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/list?page.page=0&page.size=50";
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  const filteredData = data.data.custList;

  const columns = [
    {
      selector: (row: { agncId: number }) => row.agncId,
    },
    {
      name: "리더",
      cell: (row: { agncNm: any; instNm: any; isSpecialMng: string }) => (
        <>
          <LeaderCip />
        </>
      ),
    },
    {
      name: "아이디",
      cell: (row: { leaderNm: any; leaderEmail: any }) => (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.leaderNm ?? "-"} </Box>
            <Box>{row.leaderEmail ? "(" + row.leaderEmail + ")" : ""}</Box>
          </Stack>
        </>
      ),
      minWidth: "150px",
    },
    {
      name: "이름",
      selector: (row: { agncId: number }) => row.agncId,
    },
    {
      name: "상태",
      selector: (row: { agncId: number }) => row.agncId,
    },
  ];

  return (
    <DataTableBase
      title={
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1">맴버( 총 15명 )</Typography>
          <OutlinedButton
            buttonName="멤버관리"
            size="small"
            color="secondary"
            // onClick={handleOpenModal}
          />
        </Stack>
      }
      data={filteredData}
      columns={columns}
      // onRowClicked={goDetailPage}
      // onSelectedRowsChange={handleRowSelected}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      // subHeader
      pagination={false}
      // subHeaderComponent={subHeaderComponentMemo}
      // paginationResetDefaultPage={resetPaginationToggle}
      selectableRows={false}
    />
  );
};

export default MemberDataTable;
