import React, { useMemo } from "react";
import axios from "axios";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/myIcon";
import useSWR from "swr";
import {
  DataTableBase,
  LeaderCip,
  OutlinedButton,
  Title1,
  XsmallButton,
} from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useSetRecoilState } from "recoil";

import { memberManagementModalAtom } from "../../../../recoil/atoms/modalAtom";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MemberDataTable = () => {
  const setMemberManagementModalOpen = useSetRecoilState(
    memberManagementModalAtom
  );

  /*
  let tempUrl =
    "http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/list?page.page=0&page.size=50";
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  const filteredData = data.data.custList;
  */
  const filteredData = [
    { custUkey: "1BsCust", custNm: "윤성미", isLeader: false },
    { custUkey: "2BsCust", custNm: "임재규", isLeader: false },
    { custUkey: "3BsCust", custNm: "윤성미2", isLeader: false },
  ];

  const columns = useMemo(
    () => [
      {
        name: "코드",
        selector: (row: { custUkey: string }) => row.custUkey,
      },
      {
        name: "리더",
        cell: (row: { custNm: any }) => (
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
    ],
    []
  );

  const handleModalOpen = () => {
    setMemberManagementModalOpen(true);
  };

  return (
    <DataTableBase
      title={
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1">멤버( 총 15명 )</Typography>
          <XsmallButton
            buttonName="멤버관리"
            color="secondary"
            endIcon={<MyIcon icon="cheveron-right" size={20} />}
            onClick={handleModalOpen}
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
