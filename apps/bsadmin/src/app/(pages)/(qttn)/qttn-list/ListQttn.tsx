"use client";

import React, { useEffect, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ContainedButton,
  Title1, FileDownloadBtn,
} from "cjbsDSTM";

import {Box, Stack, Grid, Link, Chip, FormControlLabel} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../hooks/useList";
import { toast } from "react-toastify";
import useSWR, {mutate} from "swr";
import {DELETE, fetcher} from "api";
import {useSearchParams} from "next/navigation";
import Checkbox from "@mui/material/Checkbox";
import KeywordSearch from "../../../components/KeywordSearch";
import { useSession } from "next-auth/react";
import NoDataView from "../../../components/NoDataView";

const ListQttn = () => {
  const { data: session, status } = useSession();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [checked, setChecked] = useState(false);
  const searchParams = useSearchParams();
  const resultObject: any = {};
  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);
  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));
  // ListAPI Call
  // const { data } = useList("qttn", page, perPage);
  const { data } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/qttn/list?page=${page}&size=${size}&isOwn=${checked}`
      : `/qttn/list?page=${page}&size=${size}&isOwn=${checked}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("RUN LIST DATA", data);

  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredData = data.qttnList;
  const totalElements = data.pageInfo.totalElements;

  // useEffect(() => {
  //   console.log(selectedRows);
  // }, [selectedRows]);

  const handleRowSelected = (rows: any) => {
    console.log("rows", rows);
    setSelectedRowCnt(rows.selectedCount);
    const getSampleUkeyList = rows.selectedRows.map((row) => row.qttnUkey);
    console.log("getSampleUkeyList", getSampleUkeyList);
    setSelectedRows(getSampleUkeyList);
  };
  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const columns = useMemo(
    () => [
      {
        name: "견적 번호",
        center: true,
        cell: (row: { qttnNo: number; qttnUkey: string }) => (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            // useFlexGap
            // flexWrap="wrap"
          >
            <Box data-tag="allowRowEvents">{row.qttnNo} </Box>
            {row.qttnUkey == null && (
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
        name: "유형",
        width: "100px",
        center: true,
        selector: (row: { qttnTypeVal: string }) => row.qttnTypeVal,
        cell: (row: { qttnTypeVal: string }) => {
          const { qttnTypeVal } = row;
          return (
            <Chip
              label={qttnTypeVal}
              size="small"
              color={qttnTypeVal === "견적용" ? "success" : "primary"}
            />
          );
        },
      },
      {
        name: "거래처(PI)",
        cell: (row: { agncInstNm: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
              data-tag="allowRowEvents"
            >
              <Box data-tag="allowRowEvents">{row.agncInstNm}</Box>
            </Stack>
          </>
        ),
        minWidth: "250px",
      },
      {
        name: "견적금액",
        selector: (row: { totalPrice: string }) => row.totalPrice,
        width: "200px",
        right: true,
        cell: (row) => formatNumber(row.totalPrice),
      },
      {
        name: "견적일",
        width: "150px",
        right: true,
        selector: (row: { qttnDate: any }) =>
          row.qttnDate && Dayjs(row.qttnDate).format("YYYY-MM-DD"),
      },
      {
        name: "견적담당",
        center: true,
        selector: (row: { bsnsMngrNm: string }) => row.bsnsMngrNm,
        width: "100px",
      },
      {
        name: "작성자",
        center: true,
        selector: (row: { wdtNm: string }) => row.wdtNm,
        width: "100px",
      },

      {
        name: "할인율",
        width: "100px",
        center: true,
        selector: (row: { isExc: string }) => row.isExc,
        cell: (row: { isExc: string }) => {
          const { isExc } = row;
          return isExc == "Y" ? (
            <Chip label={"초과"} size="small" color={"error"} />
          ) : (
            "-"
          );
        },
      },
      {
        name: "발송",
        center: true,
        selector: (row: { sendStatusVal: string }) => row.sendStatusVal,
        width: "150px",
      },
      {
        name: "발송일자",
        width: "150px",
        center: true,
        selector: (row: { sendDttm: any }) =>
          row.sendDttm ? Dayjs(row.sendDttm).format("YYYY-MM-DD") : "-",
      },
    ],
    []
  );

  const goDetailPage = (row: { qttnUkey: string }) => {
    const path = row.qttnUkey;
    console.log("path", path);
    if (!row.qttnUkey) {
      toast("잘못된 접근입니다.");
    } else {
      router.push("/qttn-list/" + path);
    }
  };

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("123123123123"+ event.target.checked);
    setChecked(event.target.checked);
  };

  const rowDisabled = (row: { isDel: string }) => row.isDel !== "Y";

  const handleDelete = async () => {
    console.log("RRRRRRRRRRR", selectedRows);
    if (selectedRows.length === 0) toast("견적서를 선택해 주세요.");

    // const body = {
    //   qttnUkeyList: selectedRows,
    // };
    try {
      const res = await DELETE(`/qttn?qttnUkeyList=${selectedRows}`);
      console.log("Delete 성공 여부", res.success);

      if (res.success) {
        mutate(`/qttn-list/`);
        toast("삭제 되었습니다.");
        setSelectedRows([]);
      } else {
        toast(res.message);
      }
    } catch (error: any) {
      console.error(
        "샘플 삭제 오류>>>>",
        error.response?.data?.data || error.message,
      );
    } finally {
      // setToggleClearRows(!toggledClearRows);
    }
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item xs={12} sx={{ pt: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 0.5 }}
            alignItems="center"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <DataCountResultInfo totalCount={totalElements} />
              <Link href="/qttn-add">
                <ContainedButton buttonName="견적서 등록" size="small" />
              </Link>
              <ContainedButton
                buttonName="삭제"
                size="small"
                color="error"
                onClick={handleDelete}
                startIcon={<MyIcon icon="trash" size={18} />}
              />
              <FormControlLabel
                label="나와 관련된 견적서만 보기"
                control={
                  <Checkbox onChange={handleChange1}
                  />
                }
              />
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <FileDownloadBtn
                exportUrl={`/agnc/prePymt/list/download${result}&chkAll=${checked}`}
                iconName="xls3"
              />
              <KeywordSearch />
              {/*<ResultInSearch/>*/}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, totalElements, selectedRows]);

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="견적서 관리" />}
        data={filteredData}
        columns={columns}
        onRowClicked={goDetailPage}
        onSelectedRowsChange={handleRowSelected}
        selectableRows
        selectableRowDisabled={rowDisabled}
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
        noDataComponent={<NoDataView />}
      />
    </Box>

  );
};

export default ListQttn;
