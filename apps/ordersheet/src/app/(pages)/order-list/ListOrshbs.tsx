"use client";

import React, { useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  LeaderCip,
  ContainedButton,
  SelectBox,
  Form,
  OutlinedButton,
  FileDownloadBtn,
  cjbsTheme,
} from "cjbsDSTM";
import {
  Stack,
  Grid,
  Box,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState, useRef } from "react";
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../hooks/useList";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";

export default function ListOrshbs() {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList(page, perPage);
  console.log(data)
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
        name: "",
        cell: (row: any, index: number) => {
          return index + 1;
        },
        width: "60px",
      },
      {
        name: "주문번호",
        selector: (row: { orshNo: string }) => row.orshNo,
        width: "300px",
      },
      {
        name: "orshUkey",
        selector: (row: { orshUkey: string }) => row.orshUkey,
        width: "0px",
      },
      {
        name: "분석 종류",
        selector: (row: { anlsTypeVal: string }) => row.anlsTypeVal,
        width: "200px",
      },
      {
        name: "분석 종류",
        selector: (row: { anlsTypeAbb: string }) => row.anlsTypeAbb,
        width: "0px",
      },
      {
        name: "서비스 타입",
        selector: (row: { srvcTypeVal: string }) => row.srvcTypeVal,
        width: "150px",
      },
      {
        name: "샘플수량",
        selector: (row: { samplesCnt: string }) => row.samplesCnt,
        width: "150px",
      },
      {
        name: "주문일시",
        selector: (row: { orshDttm: any }) =>
          row.orshDttm && Dayjs(row.orshDttm).format("YYYY-MM-DD hh:mm:ss"),
        width: "300px",
      },
      {
        name: "",
        cell: (row: { isOrderStatus: string }) => {
          return row.isOrderStatus == "N" ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="subtitle2"
                color={cjbsTheme.palette.info.main}
              >
                주문대기
              </Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <OutlinedButton
                buttonName="수정"
                size="small"
                onClick={() => goDetailPage(row)}
              />
            </Stack>
          ) : (
            <Stack direction="row" spacing={0.5} alignItems="center">
              {/*<Box data-tag="allowRowEvents">등록 완료</Box>*/}

              <Typography variant="subtitle2">주문완료</Typography>
            </Stack>
          );
        },
        width: "200px",
      },
    ],
    []
  );

  const goDetailPage = (row: {
    orshUkey: string;
    srvcTypeAbb: string;
    isOrderStatus: string;
    anlsTypeAbb: string;
  }) => {
    const path = row.orshUkey;
    const srvcTypeAbb = row.srvcTypeAbb;
    const isOrderStatus = row.isOrderStatus;
    const anlsTypeAbb = row.anlsTypeAbb;
    router.push("/order-list/" + path + "/" + srvcTypeAbb + "/" + isOrderStatus + "/" + anlsTypeAbb);
  };

  // const goLinkOrderPage = () => {
  //   router.push("/order-reg/");
  // };

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
            <FileDownloadBtn
              exportUrl={`/orsh/list/download`}
              keyword={""}
              iconName="xls3"
            />
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
    <Container disableGutters={true} maxWidth="xl" sx={{ pt: 4 }}>
      <DataTableBase
        title={<Title1 titleName="내 주문내역" />}
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
        selectableRows={false}
      />
    </Container>
  );
}
