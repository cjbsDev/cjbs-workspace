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
import { PUT } from "api";
import { toast } from "react-toastify";

export default function ListContact() {
  //const tableRef = React.useRef<any>(null);
  const table = useRef(null);

  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("user", page, perPage);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<any[]>([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);

  const filteredData = data.data.userList.filter(
    (item: any) =>
      (item.nm && item.nm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(filterText.toLowerCase()))
  );

  const totalElements = data.data.pageInfo.totalElements;
  const handleRowSelected = (rows: any) => {
    setSelectedOption(rows.selectedRows);
    setSelectedRowCnt(rows.selectedCount);
  };

  /*
  const handleUncheckAll = () => {
    if (tableRef.current) {
      tableRef.current.toggleAllRowsSelected(false);
    }
  };
  */

  const topValue = "user";
  const { data: userAuthorityData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=${topValue}&midValue=authority`,
    fetcher,
    {
      suspense: true,
    }
  );

  const { data: userStatusData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=${topValue}&midValue=status`,
    fetcher,
    {
      suspense: true,
    }
  );

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
        //width: "150px",
      },
      {
        name: "부서",
        selector: (row: { departVal: string }) => row.departVal,
      },
      {
        name: "권한",
        selector: (row: { authVal: string }) => row.authVal,
      },
      {
        name: "가입일",
        selector: (row: { signupAt: any }) =>
          row.signupAt && Dayjs(row.signupAt).format("YYYY-MM-DD"),
      },
      {
        name: "최근 접속일",
        selector: (row: { lastLoginAt: any }) =>
          row.lastLoginAt && Dayjs(row.lastLoginAt).format("YYYY-MM-DD"),
      },
      {
        name: "상태",
        selector: (row: { statusVal: string }) => row.statusVal,
      },
    ],
    []
  );

  const goDetailPage = (row: { ukey: string }) => {
    const path = row.ukey;
    router.push("/contact-list/" + path);
  };

  const setUserStatus = async () => {
    console.log("상태 일괄 변경");

    let selectedUserStatus = getValues("userStatus");
    // console.log("선택 userStatus", selectedUserStatus);
    // console.log("선택 ROW", selectedOption);
    // console.log("선택 ROW CNT", selectedRowCnt);

    // validation
    if (selectedRowCnt == 0) {
      toast("선택된 값이 없습니다.");
      return;
    }
    if (!selectedUserStatus) {
      toast("변경할 상태를 선택해주세요.");
      return;
    }
    //handleUncheckAll();
    const ukeyList = selectedOption?.map((item) => item.ukey) || [];
    const saveObj = {
      userStatusCc: selectedUserStatus,
      userUkeyList: ukeyList,
    };
    console.log("saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/status`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        handleClearRows();
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  const setUserAuth = async () => {
    console.log("권한 일괄 변경");
    const selectedUserAuth = getValues("userAuth");

    // validation
    if (selectedRowCnt == 0) {
      toast("선택된 값이 없습니다.");
      return;
    }
    if (!selectedUserAuth) {
      toast("변경할 권한을 선택해주세요.");
      return;
    }
    //handleUncheckAll();
    const ukeyList = selectedOption?.map((item) => item.ukey) || [];
    const saveObj = {
      userAuthCc: selectedUserAuth,
      userUkeyList: ukeyList,
    };
    console.log("saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/auth`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        handleClearRows();
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("실행 권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
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
                    {userAuthorityData.data && (
                      <SelectBox
                        inputName="userAuth"
                        options={userAuthorityData.data}
                        defaultMsg="회원 권한 변경"
                      />
                    )}
                    <ContainedButton
                      buttonName="변경"
                      size="small"
                      onClick={setUserAuth}
                    />
                  </Stack>
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
      clearSelectedRows={toggledClearRows}
      //ref={tableRef}
    />
  );
}
