"use client";

import React, { useEffect, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  ExcelDownloadButton,
  LeaderCip,
} from "cjbsDSTM";
import { Box, Stack, Grid, Tooltip, IconButton } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/myIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../../hooks/useList";
import useSWR from "swr";
import fetcher from "../../../../func/fetcher";
import axios from "axios";

const ListCust = () => {
  // ListAPI Call
  // const { data } = useList("cust");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/cust/list?page=${page}&size=${perPage}`,
    fetcher,
    {
      suspense: true,
    }
  );
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredData = data.data.custList;
  const handleRowSelected = (rows: any) => {
    //console.log("rows", rows);
    setSelectedRowCnt(rows.selectedCount);
    //setSelectedRows(rows.map((row) => row.id));
  };

  console.log(filteredData);

  // useEffect(() => {}, []);

  // 고객 번호, 이름, 거래처(PI), 가입일, 마지막 수정일, 상태, 메모
  const columns = useMemo(
    () => [
      {
        name: "고객 번호",
        selector: (row: { ebcUid: number }) => row.ebcUid,
        width: "100px",
      },
      {
        name: "이름",
        cell: (row: { custNm: any; ebcEmail: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
              data-tag="allowRowEvents"
            >
              <Box data-tag="allowRowEvents">{row.custNm}</Box>
              {/* <Box data-tag="allowRowEvents"><LeaderCip /></Box> */}
              <Box data-tag="allowRowEvents">{row.ebcEmail}</Box>
            </Stack>
          </>
        ),
        minWidth: "150px",
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
        minWidth: "300px",
      },

      {
        name: "가입일",
        selector: (row: { ebcJoinedAt: any }) =>
          row.ebcJoinedAt && Dayjs(row.ebcJoinedAt).format("YYYY-MM-DD"),
      },
      {
        name: "마지막 수정",
        selector: (row: { modifiedAt: any }) =>
          row.modifiedAt && Dayjs(row.modifiedAt).format("YYYY-MM-DD"),
      },

      {
        name: "선결제 금액",
        selector: (row: { pymnPrice: number }) =>
          row.pymnPrice ? row.pymnPrice + " 원" : "금액",
      },
      {
        name: "메모",
        cell: (row: { memo: string }) => {
          //console.log(row.memo);
          return (
            row.memo !== null && (
              <Tooltip title={row.memo} arrow>
                <IconButton size="small">
                  <MyIcon icon="memo" size={24} />
                </IconButton>
              </Tooltip>
            )
          );
        },
        width: "80px",
      },
    ],
    []
  );

  const goDetailPage = (row: { custUkey: string }) => {
    const path = row.custUkey;
    router.push("/cust/cust-list/" + path);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2}>
            <DataCountResultInfo
              totalCount={data.data.pageInfo.totalElements}
              selectedCount={selectedRowCnt}
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <ExcelDownloadButton downloadUrl="http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/download" />
            <DataTableFilter
              onFilter={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, selectedRowCnt]);

  const handlePageChange = (page) => {
    // fetchUsers(page);
    console.log("Page", page);
    setPage(page);
    // mutate(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setLoading(true);
    console.log("Row change.....", newPerPage, page);

    // const response = await axios.get(
    //   `${process.env.NEXT_PUBLIC_API_URL}/cust/list?page=${page}&size=${perPage}`
    // );

    // filteredData = response.data.data;
    // setData(response.data.data);
    // setPerPage(newPerPage);
    // setLoading(false);
  };

  return (
    <DataTableBase
      title={<Title1 titleName="고객 관리" />}
      data={filteredData}
      columns={columns}
      onRowClicked={goDetailPage}
      onSelectedRowsChange={handleRowSelected}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
      pagination
      paginationServer
      paginationTotalRows={102}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
};

export default ListCust;
