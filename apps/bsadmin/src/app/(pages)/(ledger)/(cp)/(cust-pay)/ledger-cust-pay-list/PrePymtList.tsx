"use client";
import * as React from "react";
import { useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
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
  TableContainer, Table, TableBody, TableCell, TableRow, Chip, FormControlLabel,
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
import { ExpanderComponentProps } from "react-data-table-component";
import ResultInSearch from "./ResultInSearch";
import Checkbox from "@mui/material/Checkbox";

const PrePymtList = () => {
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

  const { data } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/agnc/prePymt/list${result}&page=${page}&size=${size}&chkAll=${checked}`
      : `/agnc/prePymt/list?page=${page}&size=${size}&chkAll=${checked}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("RUN LIST DATA", data);
  const prePymtStatusList = data.prePymtStatusList;
  const totalElements = data.pageInfo.totalElements;
  const rmpPrePymtPrice = data.rmpPrePymtPrice;

  const [filterText, setFilterText] = useState("");
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: "No.",
        width: "100px",
        center: true,
        // sortable: true,
        selector: (row) => row.invcId,
      },
      {
        name: "거래처 번호",
        width: "110px",
        center: true,
        // sortable: true,
        selector: (row) => row.agncId,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">거래처(PI)</Typography></Stack>,
        width: "300px",
        // sortable: true,
        // selector: (row : {agncNm: string; instNm: string}) => row.agncNm,
        cell: (row: any) => {
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
        width: "150px",
        // sortable: true,
        selector: (row: any) => row.rhpiNm,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">영업 담당자</Typography></Stack>,
        width: "150px",
        // sortable: true,
        selector: (row: any) => row.bsnsMngrNm,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">발행일자</Typography></Stack>,
        width: "110px",
        // sortable: true,
        selector: (row: any) => row.issueDttm,
      },
      {
        name: "결제 상태",
        center: true,
        cell: (row: { pymtInfoVal: string }) => {
          const { pymtInfoVal } = row;
          return (
              <Chip
                data-tag="allowRowEvents"
                label={pymtInfoVal}
                size="small"
                sx={{
                  backgroundColor:
                      pymtInfoVal === "카드"
                      ? blue["50"]
                      : pymtInfoVal === "계산서"
                        ? green["50"]
                        : pymtInfoVal === "이관"
                          ? red["50"]
                          : grey["100"],
                  color:
                      pymtInfoVal === "카드"
                      ? cjbsTheme.palette.primary.main
                      : pymtInfoVal === "계산서"
                        ? cjbsTheme.palette.success.main
                        : pymtInfoVal === "이관"
                          ? cjbsTheme.palette.error.main
                          : cjbsTheme.palette.common.black,
                }}
              />
          );
        },
        width: "120px",
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">금액(초기발생)</Typography></Stack>,
        width: "200px",
        right: true,
        selector: (row: any) => row.prePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">남은 선결제 금액</Typography></Stack>,
        width: "200px",
        right: true,
        selector: (row: any) => row.rmnPrePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
    ],
    []
  );

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("123123123123"+ event.target.checked);
    setChecked(event.target.checked);
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
              <FormControlLabel
                label="모든 선결제 내역 보기"
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
                exportUrl={`/agnc/prePymt/list/download${result}`}
                iconName="xls3"
              />
              <KeywordSearch />
              {/*<ResultInSearch/>*/}
            </Stack>
          </Stack>

          <TableContainer sx={{ mb: 1, mt:1 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "20%" }}>남은 선결제 금액</TH>
                  <TD sx={{ width: "80%", textAlign: "left" }}>
                    {rmpPrePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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

  interface Row {
    prePymtPrcsStatusList: any;
  }
  interface Props extends ExpanderComponentProps<Row> {
    // currently, props that extend ExpanderComponentProps must be set to optional.
    // someTitleProp?: string;
  }
  const ExpandableRowComponent: React.FC<Props> = ({data}) => {
    // console.log(">>>>>>>>>>>", data);
    return (
      <>
        <TableContainer>
          <Table aria-label="simple table" size="small">
            <TableBody>
              <TableRow
                sx={{
                  // '&:last-child td, &:last-child th': { border: 0 },
                  // '&:nth-of-type(even)': { backgroundColor: cjbsTheme.palette.action.hover, },
                  border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                  backgroundColor: cjbsTheme.palette.grey["400"],
                }}
              >
                <TableCell width={'25%'} align="center">
                  <Typography variant="body2">처리일</Typography>
                </TableCell>
                <TableCell width={'25%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["500"]}`}}>
                  <Typography variant="body2">처리내역</Typography>
                </TableCell>
                <TableCell width={'25%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["500"]}`}}>
                  <Typography variant="body2">사용금액</Typography>
                </TableCell>
                <TableCell width={'25%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["500"]}`}}>
                  <Typography variant="body2">남은 설결제 금액</Typography>
                </TableCell>
              </TableRow>
              {data.prePymtPrcsStatusList.length === 0 && (
                <TableRow
                  sx={{
                    border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    backgroundColor: blue["50"],
                  }}
                >
                  <TableCell width={'25%'} align="center" colSpan={4}>
                    <Typography variant="body2">데이터가 없습니다.</Typography>
                  </TableCell>
                </TableRow>
              )}
              {data.prePymtPrcsStatusList.map((item:any, index:number) => (
                <TableRow
                  key={index}
                  sx={{
                    border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    backgroundColor: blue["50"],
                  }}
                >
                  <TableCell width={'25%'} align="center">
                    <Typography variant="body2">{item.prcsDttm}</Typography>
                  </TableCell>
                  <TableCell width={'25%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                    <Typography variant="body2">{item.prcsVal}</Typography>
                  </TableCell>
                  <TableCell width={'25%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                    <Typography variant="body2">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                  </TableCell>
                  <TableCell width={'25%'} align="center" sx={{borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`}}>
                    <Typography variant="body2">{item.rmnPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <>
      <DataTableBase
        // title={
        //   <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
        //     <Title1 titleName="고객별 결제 현황" />
        //   </Stack>
        // }
        data={prePymtStatusList}
        columns={columns}
        // onRowClicked={goDetailPage}
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
        expandableRows
        expandableRowsComponent={ExpandableRowComponent}
        expandableIcon={{ collapsed: <MyIcon icon="plus" size={16} />, expanded: <MyIcon icon="minus" size={16} />}}
        // expandOnRowDoubleClicked={true}
      />
    </>
  );
};

export default PrePymtList;
