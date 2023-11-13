"use client";

import React, { useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  Title1,
  ContainedButton,
  cjbsTheme,
  FileDownloadBtn,
} from "cjbsDSTM";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import IconDescBar from "../../../components/IconDescBar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../hooks/useList";
import Link from "next/link";
import { blue, red, grey, green } from "cjbsDSTM/themes/color";
import useSWR from "swr";
import { fetcher } from "api";
import { useSearchParams } from "next/navigation";

import ResultInSearch from "./ResultInSearch";
// import KeywordSearch from "./KeywordSearch";
import KeywordSearch from "../../../components/KeywordSearch";
import NoDataView from "../../../components/NoDataView";

const ListOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [hideDirector, setHideDirector] = useState<boolean>(true);
  // ListAPI Call
  // const { data } = useList("order", page, perPage);
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
      ? `/order/list${result}&page=${page}&size=${size}`
      : `/order/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("ORDER LIST DATA", data);
  const orderListData = data.orderList;
  const totalElements = data.pageInfo.totalElements;
  const [filterText, setFilterText] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: "No",
        width: "120px",
        sortable: true,
        // selector: (row) => row.orderId,
        cell: (row) => {
          const { orderId, isFastTrack } = row;
          return (
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              data-tag="allowRowEvents"
            >
              <Typography variant="body2" data-tag="allowRowEvents">
                {orderId}
              </Typography>

              {isFastTrack === "Y" && (
                <MyIcon icon="fast" size={20} data-tag="allowRowEvents" />
              )}
              {/*{isFastTrack === "Y" && (*/}
              {/*  <MyIcon icon="re" size={20} data-tag="allowRowEvents" />*/}
              {/*)}*/}
            </Stack>
          );
        },
      },
      {
        name: "진행 상황",
        width: "105px",
        sortable: true,
        cell: (row) => {
          const { orderStatusVal } = row;
          return (
            <Chip
              data-tag="allowRowEvents"
              label={orderStatusVal}
              size="small"
              sx={{
                backgroundColor:
                  orderStatusVal === "진행중"
                    ? blue["50"]
                    : orderStatusVal === "완료"
                    ? green["50"]
                    : orderStatusVal === "취소"
                    ? red["50"]
                    : grey["100"],
                color:
                  orderStatusVal === "진행중"
                    ? cjbsTheme.palette.primary.main
                    : orderStatusVal === "완료"
                    ? cjbsTheme.palette.success.main
                    : orderStatusVal === "취소"
                    ? cjbsTheme.palette.error.main
                    : cjbsTheme.palette.common.black,
              }}
            />
          );
        },
      },
      {
        name: "타입",
        width: "110px",
        sortable: true,
        selector: (row) => row.typeVal,
      },
      {
        name: "연구책임자",
        width: "200px",
        // selector: (row) => "외부 (무료)",
        cell: (row) => {
          const { custNm, custEmail } = row;
          return (
            <Stack data-tag="allowRowEvents">
              <Typography variant="body2" data-tag="allowRowEvents">
                {custNm}
              </Typography>
              <Typography variant="body2" data-tag="allowRowEvents">
                {custEmail}
              </Typography>
            </Stack>
          );
        },
      },
      {
        name: "거래처",
        width: "170px",
        // selector: (row) => "외부 (무료)",
        cell: (row) => {
          const { isSpecialMng, instNm, agncNm } = row;
          return (
            <Stack data-tag="allowRowEvents">
              <Box data-tag="allowRowEvents">
                <Stack direction="row" spacing={"2px"} alignItems="center">
                  <Typography data-tag="allowRowEvents" variant="body2">
                    {agncNm}
                  </Typography>
                  {isSpecialMng === "Y" && (
                    <MyIcon
                      icon="vip-fill"
                      width={15}
                      data-tag="allowRowEvents"
                      color="#FFAB33"
                    />
                  )}
                </Stack>
              </Box>
              <Typography data-tag="allowRowEvents" variant="body2">
                ({instNm})
              </Typography>
            </Stack>
          );
        },
      },
      {
        name: "주문서",
        width: "120px",
        selector: (row) => (row.orshId === null ? "-" : row.orshId),
      },
      {
        name: "샘플종류",
        width: "120px",
        selector: (row) => (row.sampleType === null ? "-" : row.sampleType),
      },
      {
        name: "분석종류",
        selector: (row) => row.anlsTypeVal,
      },
      {
        name: "플랫폼",
        selector: (row) => row.pltfVal,
      },
      {
        name: "영업담당",
        selector: (row) => row.bsnsMngrVal,
      },
      {
        name: "실험담당",
        selector: (row) => row.expMngrVal,
      },
      {
        name: "분석담당",
        selector: (row) => row.anlsMngrVal,
      },
      {
        name: "연구담당",
        selector: (row) => row.prjtMngrVal,
      },
      {
        name: "16S 확인",
        selector: (row) => row.is16S,
      },
      {
        name: "DNA반송",
        selector: (row) => row.isDnaReturn,
      },
      {
        name: "샘플반송",
        selector: (row) => row.isSampleReturn,
      },
      {
        name: "오더금액",
        selector: (row) =>
          row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "RUN",
        selector: (row) => row.runList,
      },
      {
        name: "과제명",
        omit: hideDirector,
        selector: (row) => row.prjtCodeVal,
      },
      {
        name: "연구명",
        omit: hideDirector,
        selector: (row) => row.prjtDetailCodeVal,
      },
      {
        name: "분석 내역서",
        selector: (row) => row.anlsItstCount,
      },
      {
        name: "샘플 수",
        selector: (row) => row.sampleCount,
      },
      {
        name: "오더생성일",
        selector: (row) => row.createDttm,
      },
      {
        name: "샘플 접수일",
        selector: (row) => row.rcptDttm,
      },
      {
        name: "PCR/Lib 완료일",
        selector: (row) => row.libCompDttm,
      },
      {
        name: "Seq완료일",
        selector: (row) => row.seqCompDttm,
      },
      {
        name: "분석 완료일",
        selector: (row) => row.biCompDttm,
      },
      {
        name: "완료 통보일",
        selector: (row) => row.ntfcCompDttm,
      },
      {
        name: "메모",
        cell: (row: { memo: string }) => {
          const { memo } = row;
          return (
            memo !== null &&
            memo !== "" && (
              <Tooltip title={memo} arrow>
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
    [hideDirector]
  );

  // const filteredData = data.orderList.filter(
  //   (item) =>
  //     (item.custNm &&
  //       item.custNm.toLowerCase().includes(filterText.toLowerCase())) ||
  //     (item.ebcEmail &&
  //       item.ebcEmail.toLowerCase().includes(filterText.toLowerCase()))
  // );
  // console.log("filteredData ==>>", filteredData);

  const goDetailPage = (row: any) => {
    const path = row.orderUkey;
    router.push("/order-list/" + path);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <Link href="/order-reg">
              <ContainedButton buttonName="오더 등록" size="small" />
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
            {/*<OutlinedButton buttonName="NewData" onClick={newDataChange} />*/}
            <IconDescBar freeDisabled={true} reOrder={true} />

            <FileDownloadBtn
              exportUrl={`/order/list/download${result}`}
              iconName="xls3"
            />

            <KeywordSearch />
            <ResultInSearch />
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
    <DataTableBase
      title={<Title1 titleName="오더 관리" />}
      data={orderListData}
      columns={columns}
      onRowClicked={goDetailPage}
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
  );
};

export default ListOrder;
