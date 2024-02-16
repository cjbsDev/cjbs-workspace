"use client";
import * as React from "react";
import { useMemo } from "react";
import {
    DataCountResultInfo,
    DataTableBase,
    Title1,
    ContainedButton,
    cjbsTheme,
    FileDownloadBtn, green, red, grey, TH, TD,
} from "cjbsDSTM";
import {
  blue,
} from "cjbsDSTM/themes/color";
import {
    Box,
    Stack,
    Grid,
    Typography,
    Collapse,
    TableContainer, Table, TableBody, TableCell, TableRow, Chip,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import { useSearchParams } from "next/navigation";
import KeywordSearch from "../../../../../components/KeywordSearch";
import NoDataView from "../../../../../components/NoDataView";
import dynamic from "next/dynamic";
import { ExpanderComponentProps } from "react-data-table-component";
import ResultInSearch from "./ResultInSearch";
import CategorySelectModal from "./CategorySelectModal";

const ListRun = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const searchParams = useSearchParams();

  const resultObject: any = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/agnc/pymt/list${result}&page=${page}&size=${size}`
      : `/agnc/pymt/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("RUN LIST DATA", data);
  const agncPymtList = data.agncPymtList;
  const totalElements = data.pageInfo.totalElements;
  const rmnPrice = data.rmnPrice;
  const totalAnlsPrice = data.totalAnlsPrice;
  const totalPymtPrice = data.totalPymtPrice;

  const [filterText, setFilterText] = useState("");
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  const columns = useMemo(
    () => [
      {
        name: "거래처 번호",
        width: "140px",
        center: true,
        // sortable: true,
        selector: (row, index) => row.agncId,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">거래처(PI)</Typography></Stack>,
        // width: "400px",
        // sortable: true,
        // selector: (row : {agncNm: string; instNm: string}) => row.agncNm,
        cell: (row) => {
          const { instNm, agncNm } = row;
          return (
            <Stack data-tag="allowRowEvents">
              <Box data-tag="allowRowEvents">
                <Stack direction="row" spacing={"2px"} alignItems="center">
                  <Typography data-tag="allowRowEvents" variant="body2">
                    {agncNm}
                  </Typography>
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
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">연구 책임자</Typography></Stack>,
        width: "200px",
        // sortable: true,
        selector: (row) => row.rhpiNm,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">영업 담당자</Typography></Stack>,
        width: "200px",
        // sortable: true,
        selector: (row) => row.bsnsMngrNm,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">결제 총계</Typography></Stack>,
        width: "200px",
        right: true,
        selector: (row) => row.totalPymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">분석 총계</Typography></Stack>,
        width: "200px",
        right: true,
        selector: (row) => row.totalAnlsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">남은금액</Typography></Stack>,
        width: "200px",
        right: true,
        selector: (row) => row.rmnPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "결제 상태",
        center: true,
        cell: (row: { pymtStatusVal: string }) => {
          const { pymtStatusVal } = row;
          return (
              <Chip
                data-tag="allowRowEvents"
                label={pymtStatusVal}
                size="small"
                sx={{
                  backgroundColor:
                      pymtStatusVal === "선결제"
                      ? blue["50"]
                      : pymtStatusVal === "완료"
                        ? green["50"]
                        : pymtStatusVal === "취소"
                          ? red["50"]
                          : grey["100"],
                  color:
                      pymtStatusVal === "선결제"
                      ? cjbsTheme.palette.primary.main
                      : pymtStatusVal === "완료"
                        ? cjbsTheme.palette.success.main
                        : pymtStatusVal === "취소"
                          ? cjbsTheme.palette.error.main
                          : cjbsTheme.palette.common.black,
                }}
              />
          );
        },
        width: "140px",
      },
    ],
    []
  );

  const goDetailPage = (row: any) => {
    const agncUkey = row.agncUkey;
    router.push("/ledger-cust-pay-list/" + agncUkey);
  };

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={12} sx={{mt: 0}}>
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
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <FileDownloadBtn
                exportUrl={`/agnc/pymt/list/download${result}`}
                iconName="xls3"
              />
              <KeywordSearch />
              <ResultInSearch/>
            </Stack>
          </Stack>

          <TableContainer sx={{ mb: 1, mt:1 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "10%" }}>분석 누적 총계</TH>
                  <TD sx={{ width: "23%", textAlign: "left" }}>
                    {totalAnlsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TD>
                  <TH sx={{ width: "10%" }}>결제 누적 총계</TH>
                  <TD sx={{ width: "23%", textAlign: "left" }}>
                    {totalPymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TD>
                  <TH sx={{ width: "10%", color: "red" }}>결제대기 누적 금액</TH>
                  <TD sx={{ width: "23%", textAlign: "left", color: "red" }}>
                    {rmnPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
    <>
      <DataTableBase
        title={
          <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
            <Title1 titleName="고객별 결제 현황" />
          </Stack>
        }
        data={agncPymtList}
        columns={columns}
        onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
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
        // expandOnRowDoubleClicked={true}
      />
    </>
  );
};

export default ListRun;
