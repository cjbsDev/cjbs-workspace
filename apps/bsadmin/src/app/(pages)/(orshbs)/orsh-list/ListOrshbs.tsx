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
  cjbsTheme, FileDownloadBtn,
} from "cjbsDSTM";
import {
  Stack,
  Grid,
  Box,
  Container,
  Divider,
  Typography,
  Button,
  Tooltip,
  IconButton,
  tooltipClasses, TooltipProps
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next-nprogress-bar";
import { useState, useRef, useEffect } from "react";
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useFiltersList } from "../../../hooks/useFiltersList";
import { useForm, FormProvider } from "react-hook-form";
import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import IconDescBar from "../../../components/IconDescBar";
import KeywordSearch from "../../../components/KeywordSearch";
import ResultInSearch from "../../(order)/order-list/ResultInSearch";
import {useSearchParams} from "next/navigation";
import {fetcher} from "api";
import Link from "next/link";
import NoDataView from "../../../components/NoDataView";


const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 1)',
    boxShadow: theme.shadows[10],
    fontSize: 11,
    border: '1px solid #000000',
    padding: '10px'
  },
}));


export default function ListOrshbs() {
  //const tableRef = React.useRef<any>(null);
  const table = useRef(null);

  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(20);
  // const [filters, setFilters] = useState("");

  // ListAPI Call
  // const { data } = useFiltersList("orsh/bs/extr/list", filters);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<any[]>([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // const [toggledClearRows, setToggleClearRows] = React.useState(false);

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
      ? `/orsh/bs/extr/list${result}&page=${page}&size=${size}`
      : `/orsh/bs/extr/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("고객주문서 LIST DATA", data);
  const totalElements = data.pageInfo.totalElements;
  // const handleRowSelected = (rows: any) => {
  //   setSelectedOption(rows.selectedRows);
  //   setSelectedRowCnt(rows.selectedCount);
  // };

  const columns = useMemo(
    () => [
      {
        name: "주문번호",
        selector: (row: { orshNo: string }) => row.orshNo,
        width: "160px",
      },
      {
        name: "분석 종류",
        selector: (row: { anlsTypeVal: string }) => row.anlsTypeVal,
        width: "100px",
        center: true,
      },
      {
        name: "서비스 타입",
        selector: (row: { srvcTypeVal: string }) => row.srvcTypeVal,
        width: "120px",
      },
      {
        name: "샘플수량",
        selector: (row: { sampleCount: string }) => row.sampleCount,
        width: "90px",
        center: true,
      },
      {
        name: "거래처(기관)",
        cell: (row: { agncNm: string; instNm: string }) => (
          <Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box>{row.agncNm}</Box>
              <Box>({row.instNm})</Box>
            </Stack>
            {/*<Stack direction="row" spacing={0.5} alignItems="center">*/}
            {/*  <Box>({row.instNm})</Box>*/}
            {/*</Stack>*/}
          </Stack>
        ),
        width: "400px",
      },
      {
        name: "주문자(ID)",
        cell: (row: { rhpiNm: string; rhpiEbcEmail: string; isMastered:string }) => (
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} width={'100%'}>
            <Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box>{row.rhpiNm}</Box>
                <Box>({row.rhpiEbcEmail})</Box>
              </Stack>
              {/*<Stack direction="row" spacing={0.5} alignItems="center">*/}
              {/*  <Box>({row.rhpiEbcEmail})</Box>*/}
              {/*</Stack>*/}
            </Stack>
            {row.isMastered == "N" ? (
              <>
                <LightTooltip placement="top"
                  title={
                    <React.Fragment>
                      <Typography variant="body2">미등록 거래처(기관) 사용자입니다.</Typography>
                      <Typography variant="body2">거래처 및 연구원 등록 후 오더를 등록해주세요.</Typography>
                    </React.Fragment>
                  }
                >
                  <IconButton>
                    <MyIcon icon="exclamation-circle-fill" size={26} color={cjbsTheme.palette.warning.main}/>
                  </IconButton>
                </LightTooltip>
              </>
            ):('')}

          </Stack>
        ),
        minWidth: "460px",
      },
      {
        name: "주문상태",
        cell: (row: { isOrderStatus: string; isMastered:string }) => {
          return row.isOrderStatus == "N" ? (
            <Stack direction="row" spacing={1} alignItems="center">
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

              {row.isMastered == "Y" ? (
                <>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <ContainedButton
                    buttonName="+오더등록"
                    size="small"
                    onClick={() => goLinkOrderPage(row)}
                  />
                </>
              ):('')}

            </Stack>
          ) : (
            <Stack direction="row" spacing={0.5} alignItems="center">
              {/*<Box data-tag="allowRowEvents">주문완료</Box>*/}
              <Typography variant="subtitle2">주문완료</Typography>
            </Stack>
          );
        },
        width: "260px",
      },
      {
        name: "주문일시",
        selector: (row: { orshDttm: any }) =>
          row.orshDttm && Dayjs(row.orshDttm).format("YYYY-MM-DD"),
        // width: "150px",
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
    router.push(  `/orsh-list/${path}/${srvcTypeAbb}/${isOrderStatus}/${anlsTypeAbb}`);
  };

  const goLinkOrderPage = (row: {
    orshUkey: string;
    srvcTypeAbb: string;
    isOrderStatus: string;
    anlsTypeAbb: string;
  }) => {
    // /3i0fvg/ao/N/mtp
    const orshUkey = row.orshUkey;
    const srvcTypeAbb = row.srvcTypeAbb;
    const isOrderStatus = row.isOrderStatus;
    const anlsTypeAbb = row.anlsTypeAbb;
    router.push(`/order-reg?orshUkey=${orshUkey}&orshType=extr&from=/orsh-list&srvcTypeAbb=${srvcTypeAbb}&isOrderStatus=${isOrderStatus}&anlsTypeAbb=${anlsTypeAbb}`);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    // const handleClear = () => {
    //   if (filterText) {
    //     setResetPaginationToggle(!resetPaginationToggle);
    //     setFilterText("");
    //   }
    // };

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
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
              exportUrl={`/orsh/bs/extr/list/download${result}`}
              iconName="xls3"
            />
            <KeywordSearch />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [totalElements, result]);

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="고객 주문서 관리" />}
        data={data.orshList}
        columns={columns}
        onRowClicked={goDetailPage}
        // onSelectedRowsChange={handleRowSelected}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
      />
    </Box>
  );
}
