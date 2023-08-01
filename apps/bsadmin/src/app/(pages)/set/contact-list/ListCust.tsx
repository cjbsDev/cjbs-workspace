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
import {
  Box,
  Stack,
  Grid,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/myIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../hooks/useList";
// import useSWR from "swr";
// import fetcher from "../../../../func/fetcher";
// import axios from "axios";

const ListCust = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("user", page, perPage);
  const [loading, setLoading] = useState<boolean>(false);
  // const { data, isLoading, mutate } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/cust/list?page=${page}&size=${perPage}`,
  //   fetcher,
  //   {
  //     suspense: true,
  //   }
  // );
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // const filteredData = data.data.custList;

  const filteredData = data.data.custList.filter(
    (item: any) =>
      (item.nm && item.nm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(filterText.toLowerCase()))
  );

  const totalElements = data.data.pageInfo.totalElements;
  const handleRowSelected = (rows: any) => {
    //console.log("rows", rows);
    setSelectedRowCnt(rows.selectedCount);
    //setSelectedRows(rows.map((row) => row.id));
  };

  // console.log("filteredData totalElements", data.data.pageInfo.totalElements);
  //console.log("filteredData", filteredData);

  //ukey
  // 아이디, 이름, 영문 이니셜, 연락처, 부서, 권한, 가입일, 최근 접속일, 상태
  // email, nm, nmEnInit, tel, departVal, authVal, signupAt, lastLoginAt, statusVal
  const columns = useMemo(
    () => [
      {
        name: "아이디",
        selector: (row: { email: string }) => row.email,
        width: "200px",
      },
      {
        name: "이름",
        selector: (row: { nm: string }) => row.nm,
        width: "150px",
      },
      {
        name: "영문 이니셜",
        selector: (row: { nmEnInit: string }) => row.nmEnInit,
        width: "200px",
      },
      {
        name: "연락처",
        selector: (row: { tel: string }) => row.tel,
        width: "150px",
      },
      {
        name: "부서",
        selector: (row: { departVal: string }) => row.departVal,
        width: "150px",
      },
      {
        name: "권한",
        selector: (row: { authVal: string }) => row.authVal,
        width: "150px",
      },
      {
        name: "가입일",
        width: "150px",
        selector: (row: { signupAt: any }) =>
          row.signupAt && Dayjs(row.signupAt).format("YYYY-MM-DD"),
      },
      {
        name: "가입일",
        width: "150px",
        selector: (row: { lastLoginAt: any }) =>
          row.lastLoginAt && Dayjs(row.lastLoginAt).format("YYYY-MM-DD"),
      },
      {
        name: "상태",
        selector: (row: { statusVal: string }) => row.statusVal,
        width: "150px",
      },
    ],
    []
  );

  const goDetailPage = (row: { ukey: string }) => {
    const path = row.ukey;
    router.push("/set/contact-list/" + path);
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
              totalCount={totalElements}
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

  const handlePageChange = (page: number) => {
    // console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    // console.log("Row change.....", newPerPage, page);
    setPage(page);
    setPerPage(newPerPage);
  };

  return (
    <DataTableBase
      title={<Title1 titleName="담당자 관리" />}
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
      paginationTotalRows={totalElements}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
};

export default ListCust;
