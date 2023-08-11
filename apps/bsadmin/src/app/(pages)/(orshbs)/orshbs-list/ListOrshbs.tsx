"use client";

import React, { useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  ExcelDownloadButton,
  LeaderCip,
  ContainedButton,
  SelectBox,
  Form,
  OutlinedButton,
} from "cjbsDSTM";
import { Stack, Grid, Box, Container } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState, useRef } from "react";
import MyIcon from "icon/myIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../hooks/useList";
import { useForm, FormProvider } from "react-hook-form";
import useSWR from "swr";
import fetcher from "../../../func/fetcher";
import axios from "axios";
import { toast } from "react-toastify";

export default function ListOrshbs() {
  //const tableRef = React.useRef<any>(null);
  const table = useRef(null);

  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("orshbs", page, perPage);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<any[]>([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);

  const totalElements = data.data.pageInfo.totalElements;
  const handleRowSelected = (rows: any) => {
    setSelectedOption(rows.selectedRows);
    setSelectedRowCnt(rows.selectedCount);
  };

  const defaultValues = {
    userStatus: "",
    userAuth: "",
  };

  const methods = useForm({
    defaultValues, // Pass the default values when calling useForm
  });

  const {
    getValues,
    formState: { errors, isDirty },
    handleSubmit,
  } = methods;

  const columns = useMemo(
    () => [
      {
        name: "주문번호",
        selector: (row: { orshNo: string }) => row.orshNo,
        width: "200px",
      },
      {
        name: "오더번호",
        selector: (row: { orderId: string }) => row.orderId,
        width: "150px",
      },
      {
        name: "분석 종류",
        selector: (row: { anlsTypeVal: string }) => row.anlsTypeVal,
        width: "200px",
      },
      {
        name: "서비스 타입",
        selector: (row: { srvcTypeVal: string }) => row.srvcTypeVal,
      },
      {
        name: "샘플수량",
        selector: (row: { sampleCount: string }) => row.sampleCount,
      },

      {
        name: "거래처(PI)",
        cell: (row: { agncNm: string; instNm: string }) => (
          <Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box>{row.agncNm} </Box>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box>({row.instNm})</Box>
            </Stack>
          </Stack>
        ),
        width: "300px",
      },
      // 주문번호, 오더번호,  분석 종류,     서비스 타입,     샘플수량,     거래처(기관),       연구책임자(ID),         담당자,         주문상태, 주문일시
      // orshNo, orderId, anlsTypeVal, srvcTypeVal, sampleCount, instNm(agncNm), rhpiNm(rhpiEbcEmail), bsnsMngrVal, isOrderStatus,orshDttm
      {
        name: "연구책임자(ID)",
        cell: (row: { rhpiNm: string; rhpiEbcEmail: string }) => (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Box data-tag="allowRowEvents">{row.rhpiNm} </Box>
            <Box data-tag="allowRowEvents">({row.rhpiEbcEmail})</Box>
          </Stack>
        ),
        width: "300px",
      },
      {
        name: "담당자",
        selector: (row: { authVal: string }) => row.authVal,
      },
      {
        name: "주문상태",
        selector: (row: { authVal: string }) => row.authVal,
      },
      //"isOrderStatus": "주문상태(Y: 등록, N : 요청)"
      {
        name: "주문상태",
        cell: (row: { isOrderStatus: string }) => {
          return row.isOrderStatus == "N" ? (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box data-tag="allowRowEvents">요청</Box>
              <OutlinedButton
                buttonName="관리"
                size="small"
                onClick={() => goLinkOrderPage()}
              />
            </Stack>
          ) : (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box data-tag="allowRowEvents">등록</Box>
            </Stack>
          );
        },
      },

      {
        name: "주문일시",
        selector: (row: { orshDttm: any }) =>
          row.orshDttm && Dayjs(row.orshDttm).format("YYYY-MM-DD"),
      },
    ],
    []
  );

  const goDetailPage = (row: { orshNo: string }) => {
    const path = row.orshNo;
    router.push("/orshbs-list/" + path);
  };

  const goLinkOrderPage = () => {
    router.push("/contact-list/");
  };

  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
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

            <FormProvider {...methods}>
              <Container maxWidth={false} sx={{ width: "100%" }}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* 
                  <Stack direction="row" spacing={1}>
                    {userStatusData.data && (
                      <SelectBox
                        inputName="userStatus"
                        options={userStatusData.data}
                        defaultMsg="회원 상태 변경"
                      />
                    )}
                    <ContainedButton
                      buttonName="변경"
                      size="small"
                      onClick={setUserStatus}
                    />
                  </Stack>
                  */}
                </Box>
              </Container>
            </FormProvider>
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

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  return (
    <DataTableBase
      title={<Title1 titleName="고객 주문서 관리" />}
      data={data.data.orshList}
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
      clearSelectedRows={toggledClearRows}
      //ref={tableRef}
    />
  );
}
