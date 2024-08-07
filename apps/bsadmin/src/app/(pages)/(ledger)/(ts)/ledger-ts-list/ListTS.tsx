"use client";

import React, { useEffect, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ContainedButton,
  Title1,
  FileDownloadBtn,
} from "cjbsDSTM";

import { Box, Stack, Grid, Tooltip, IconButton, Link } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../../hooks/useList";
import { toast } from "react-toastify";
import NoDataView from "../../../../components/NoDataView";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "api";
import KeywordSearch from "../../../../components/KeywordSearch";
import useCalculatedHeight from "../../../../hooks/useCalculatedHeight";

const ListCust = () => {
  // const [page, setPage] = useState<number>(0);
  // const [perPage, setPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  // ListAPI Call
  // const { data } = useList("tdst", page, perPage);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const height = useCalculatedHeight(268);
  const searchParams = useSearchParams();
  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/tdst/list${result}&page=${page}&size=${size}`
      : `/tdst/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("고객주문서 LIST DATA", data);
  const totalElements = data.pageInfo.totalElements;
  const filteredData = data.tdstList;

  const handleRowSelected = (rows: any) => {
    //console.log("rows", rows);
    setSelectedRowCnt(rows.selectedCount);
    //setSelectedRows(rows.map((row) => row.id));
  };
  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  // 번호, 유형, 거래처, 거래금액, 작성일, 영업담당, 작성자, 발송, 발송일시
  const columns = useMemo(
    () => [
      {
        name: "번호",
        center: true,
        cell: (row: { tdstId: number; tdstNo: string }) => (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            // useFlexGap
            // flexWrap="wrap"
          >
            <Box data-tag="allowRowEvents">{row.tdstNo} </Box>
            {row.tdstNo == null &&
              // <MyIcon
              //   data-tag="allowRowEvents"
              //   icon="exclamation-triangle-fill"
              //   size={20}
              //   color="#FFAB33"
              // />
              "-"}
          </Stack>
        ),
        width: "200px",
      },
      {
        name: "유형",
        selector: (row: { tdstTypeVal: string }) => row.tdstTypeVal,
        width: "100px",
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
        name: "거래금액",
        selector: (row: { tdPrice: string }) => row.tdPrice,
        width: "200px",
        right: true,
        cell: (row) => formatNumber(row.tdPrice),
      },
      {
        name: "작성일",
        width: "120px",
        center: true,
        selector: (row: { wdtDate: any }) =>
          row.wdtDate && Dayjs(row.wdtDate).format("YYYY-MM-DD"),
      },
      {
        name: "영업담당",
        center: true,
        selector: (row: { bsnsMngrNm: string }) => row.bsnsMngrNm,
        width: "130px",
      },
      {
        name: "작성자",
        selector: (row: { wdtNm: string }) => row.wdtNm,
        width: "130px",
      },
      {
        name: "발송",
        selector: (row: { sendStatusVal: string }) => row.sendStatusVal,
        width: "130px",
      },
      {
        name: "발송일자",
        width: "120px",
        center: true,
        selector: (row: { sendDttm: any }) =>
          row.sendDttm ? Dayjs(row.sendDttm).format("YYYY-MM-DD") : "-",
      },
    ],
    [],
  );

  const goDetailPage = (row: { tdstUkey: string }) => {
    const path = row.tdstUkey;
    console.log("path", path);
    if (!row.tdstUkey) {
      toast("잘못된 접근입니다.");
    } else {
      router.push("/ledger-ts-list/" + path);
    }
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
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5}>
            <DataCountResultInfo totalCount={totalElements} />
            <Link href="/ledger-ts-add">
              <ContainedButton buttonName="거래명세서 등록" size="small" />
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            <FileDownloadBtn
              exportUrl={`/tdst/list/download${result}`}
              iconName="xls3"
            />
            <KeywordSearch />
          </Stack>
        </Grid>
        {/*<Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>*/}
        {/*  <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>*/}
        {/*    <DataTableFilter*/}
        {/*      onFilter={(e: {*/}
        {/*        target: { value: React.SetStateAction<string> };*/}
        {/*      }) => setFilterText(e.target.value)}*/}
        {/*      onClear={handleClear}*/}
        {/*      filterText={filterText}*/}
        {/*    />*/}
        {/*  </Stack>*/}
        {/*</Grid>*/}
      </Grid>
    );
  }, [filterText, resetPaginationToggle, totalElements]);

  const handlePageChange = (page: number) => {
    // console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    // console.log("Row change.....", newPerPage, page);
    setPage(page);
    // setPerPage(newPerPage);
    setSize(newPerPage);
  };

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="거래명세서 관리" />}
        data={filteredData}
        columns={columns}
        onRowClicked={goDetailPage}
        onSelectedRowsChange={handleRowSelected}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        paginationResetDefaultPage={resetPaginationToggle}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
        paginationPerPage={100}
        paginationRowsPerPageOptions={[50, 100, 200, 300, 400]}
      />
    </Box>
  );
};

export default ListCust;
