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

  console.log("filteredData", filteredData);

  // useEffect(() => {}, []);

  // 고객 번호, 이름, 거래처(PI), 가입일, 마지막 수정일, 상태, 메모
  const columns = useMemo(
    () => [
      /*
      {
        name: "고객 번호",
        selector: (row: { ebcUid: number }) => row.ebcUid,
        width: "100px",
      },
      */

      {
        name: "고객 번호",
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
        width: "200px",
      },

      {
        name: "아이디",
        selector: (row: { ebcEmail: string }) => row.ebcEmail,
        width: "200px",
      },
      {
        name: "이름",
        selector: (row: { custNm: string }) => row.custNm,
        width: "150px",
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
        name: "마지막 수정",
        width: "150px",
        selector: (row: { modifiedAt: any }) =>
          row.modifiedAt && Dayjs(row.modifiedAt).format("YYYY-MM-DD"),
      },

      {
        name: "메모",
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
              //selectedCount={selectedRowCnt}
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <ExcelDownloadButton downloadUrl="" />
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
