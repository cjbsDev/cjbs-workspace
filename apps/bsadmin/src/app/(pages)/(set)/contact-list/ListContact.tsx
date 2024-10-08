"use client";

import React, { useCallback, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  Title1,
  ContainedButton,
  SelectBox,
} from "cjbsDSTM";
import { Stack, Grid, Box, Container } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState, useRef } from "react";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../hooks/useList";
import { useForm, FormProvider } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { fetcher } from "api";
import { PUT } from "api";
import { toast } from "react-toastify";
import { formatPhoneNumber } from "cjbsDSTM/commonFunc";
import { getColumns } from "./Columns";
import useCalculatedHeight from "../../../hooks/useCalculatedHeight";

export default function ListContact() {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("user", page, perPage);
  const height = useCalculatedHeight(268);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<any[]>([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);

  const filteredData = data.userList.filter(
    (item: any) =>
      (item.nm && item.nm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(filterText.toLowerCase())),
  );

  const totalElements = data.pageInfo.totalElements;
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
    `/code/list/shortly/value?topValue=${topValue}&midValue=authority`,
    fetcher,
    {
      suspense: true,
    },
  );

  const { data: userStatusData } = useSWR(
    `/code/list/shortly/value?topValue=${topValue}&midValue=status`,
    fetcher,
    {
      suspense: true,
    },
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

  const columns = useMemo(() => getColumns(), []);

  const goDetailPage = (row: { ukey: string }) => {
    const path = row.ukey;
    router.push("/contact-list/" + path);
  };

  const handleClearRows = useCallback(() => {
    setToggleClearRows(!toggledClearRows);
  }, [toggledClearRows]);

  const renderList = useCallback(() => {
    mutate(`/user/list?page=${page}&size=${perPage}`);
  }, [page, perPage]);

  const setUserStatus = useCallback(async () => {
    console.log("상태 일괄 변경");

    let selectedUserStatus = getValues("userStatus");

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

    const apiUrl = `/user/status`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        handleClearRows();
        renderList();
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  }, [getValues, handleClearRows, renderList, selectedOption, selectedRowCnt]);

  const setUserAuth = useCallback(async () => {
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

    const apiUrl = `/user/auth`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        handleClearRows();
        renderList();
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("실행 권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  }, [getValues, handleClearRows, renderList, selectedOption, selectedRowCnt]);

  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
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
                    {userStatusData && (
                      <SelectBox
                        inputName="userStatus"
                        options={userStatusData}
                        defaultMsg="회원 상태 변경"
                      />
                    )}
                    <ContainedButton
                      buttonName="변경"
                      size="small"
                      onClick={setUserStatus}
                    />
                    {userAuthorityData && (
                      <SelectBox
                        inputName="userAuth"
                        options={userAuthorityData}
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
            {/*<DataTableFilter*/}
            {/*  onFilter={(e: {*/}
            {/*    target: { value: React.SetStateAction<string> };*/}
            {/*  }) => setFilterText(e.target.value)}*/}
            {/*  onClear={handleClear}*/}
            {/*  filterText={filterText}*/}
            {/*/>*/}
          </Stack>
        </Grid>
      </Grid>
    );
  }, [
    filterText,
    resetPaginationToggle,
    totalElements,
    handleSubmit,
    methods,
    setUserAuth,
    setUserStatus,
    userAuthorityData,
    userStatusData,
  ]);

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
    <Box sx={{ display: "grid" }}>
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
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        paginationResetDefaultPage={resetPaginationToggle}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        clearSelectedRows={toggledClearRows}
      />
    </Box>
  );
}
