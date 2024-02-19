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
  TableContainer, Table, TableBody, TableCell, TableRow, Chip, FormControlLabel, FormControl, Select, MenuItem,
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

const LicenseList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [year, setYear] = useState<string>("2024");
  const [month, setMonth] = useState<string>("11");
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
      ? `/agnc/license/list${result}&page=${page}&size=${size}&year=${year}&month=${month}`
      : `/agnc/license/list?page=${page}&size=${size}&year=${year}&month=${month}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("RUN LIST DATA", data);
  const licenseStatusList = data.licenseStatusList;
  const totalElements = data.pageInfo.totalElements;
  const yearTotalPrice = data.yearTotalPrice;
  const monthTotalPrice = data.monthTotalPrice;

  const [filterText, setFilterText] = useState("");
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">분석내역서</Typography></Stack>,
        width: "110px",
        center: true,
        // sortable: true,
        selector: (row: any) => row.anlsItstId,
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
        width: "130px",
        center: true,
        // sortable: true,
        selector: (row: any) => row.rhpiNm,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">영업 담당자</Typography></Stack>,
        width: "130px",
        center: true,
        // sortable: true,
        selector: (row: any) => row.bsnsMngrNm,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">공급가액</Typography></Stack>,
        width: "150px",
        right: true,
        // sortable: true,
        selector: (row: any) => row.totalSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">사용 기간</Typography></Stack>,
        width: "200px",
        center: true,
        // sortable: true,
        selector: (row: any) => row.startDate+" ~ "+row.endDate,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">회차</Typography></Stack>,
        width: "100px",
        center: true,
        // sortable: true,
        selector: (row: any) => row.currentTurn+" / "+row.totalTurn,
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">사용금액</Typography></Stack>,
        width: "110px",
        right: true,
        // sortable: true,
        selector: (row: any) => row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: <Stack justifyContent="center" alignItems="center" sx={{width:'100%'}}><Typography variant="body2">플랫폼</Typography></Stack>,
        width: "500px",
        // sortable: true,
        // selector: (row: any) => row.currentTurn+" / "+row.pltfVal,
        selector: (row: any) => "MTP / "+row.pltfVal,
      },
    ],
    []
  );

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
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

              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={1}
                sx={{ mb: 0.5 }}
                alignItems="center"
              >
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  {/*<InputLabeltLabel id="demo-select-small-label">Age</InputLabeltLabel>*/}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={year}
                    // label="year"
                    onChange={handleChangeYear}
                  >
                    <MenuItem value="2024">2024년</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={month}
                    // label="month"
                    onChange={handleChangeMonth}
                  >
                    <MenuItem value="01">01월</MenuItem>
                    <MenuItem value="02">02월</MenuItem>
                    <MenuItem value="03">03월</MenuItem>
                    <MenuItem value="04">04월</MenuItem>
                    <MenuItem value="05">05월</MenuItem>
                    <MenuItem value="06">06월</MenuItem>
                    <MenuItem value="07">07월</MenuItem>
                    <MenuItem value="08">08월</MenuItem>
                    <MenuItem value="09">09월</MenuItem>
                    <MenuItem value="10">10월</MenuItem>
                    <MenuItem value="11">11월</MenuItem>
                    <MenuItem value="12">12월</MenuItem>
                  </Select>
                </FormControl>

              </Stack>

            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <FileDownloadBtn
                exportUrl={`/agnc/license/list/download${result}&year=${year}&month=${month}`}
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
                  <TH sx={{ width: "20%" }}>
                    <Box component="span" sx={{color: cjbsTheme.palette.primary.main}}>{month}월</Box> 사용금액 총계
                  </TH>
                  <TD sx={{ width: "30%", textAlign: "left" }}>
                    {monthTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TD>
                  <TH sx={{ width: "20%" }}>
                    <Box component="span" sx={{color: cjbsTheme.palette.primary.main}}>{year}년</Box> 사용금액 총계
                  </TH>
                  <TD sx={{ width: "30%", textAlign: "left" }}>
                    {yearTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
    lcnsCosts: any;
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
              <TableRow>
                {data.lcnsCosts.map((item:any, index:number) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      border: `1px solid ${cjbsTheme.palette.grey["500"]}`,
                      backgroundColor: cjbsTheme.palette.grey["400"],
                    }}
                  >
                    <Typography variant="body2">{item.date}</Typography>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {data.lcnsCosts.map((item:any, index:number) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                      backgroundColor: blue["50"],
                    }}
                >
                    <Typography variant="body2">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                  </TableCell>
                ))}
              </TableRow>
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
        data={licenseStatusList}
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

export default LicenseList;
