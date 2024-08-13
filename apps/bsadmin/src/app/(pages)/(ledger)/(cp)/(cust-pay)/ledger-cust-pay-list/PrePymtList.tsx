"use client";
import * as React from "react";
import { useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  cjbsTheme,
  FileDownloadBtn,
  green,
  red,
  grey,
  TH,
  TD,
} from "cjbsDSTM";
import { blue } from "cjbsDSTM/themes/color";
import {
  Box,
  Stack,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  FormControlLabel,
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
import DisplayMoney from "../../../../../components/DisplayMoney";
import { getColumns } from "./components/Columns/PrePymtListColumns";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";
import useCalculatedHeight from "../../../../../hooks/useCalculatedHeight";

const PrePymtList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [checked, setChecked] = useState(false);
  const [resultObject, result] = useResultObject();
  const height = useCalculatedHeight(370);

  console.log("result", result);

  const url = useMemo(() => {
    const base = "/agnc/prePymt/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  const { prePymtStatusList, rmpPrePymtPrice, pageInfo } = data;
  const { totalElements } = pageInfo;

  const columns = useMemo(() => getColumns(), []);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("123123123123" + event.target.checked);
    setChecked(event.target.checked);
  };

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={12} sx={{ mt: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 0.5 }}
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <DataCountResultInfo totalCount={totalElements} />
              <FormControlLabel
                label="모든 선결제 내역 보기"
                control={<Checkbox onChange={handleChange1} />}
              />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <FileDownloadBtn
                exportUrl={
                  JSON.stringify(resultObject) !== "{}"
                    ? `/agnc/prePymt/list/download${result}&chkAll=${checked}`
                    : `/agnc/prePymt/list/download?chkAll=${checked}`
                }
                iconName="xls3"
              />
              <KeywordSearch />
              {/*<ResultInSearch/>*/}
            </Stack>
          </Stack>

          <TableContainer sx={{ mb: 1, mt: 1 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "20%" }}>남은 선결제 금액</TH>
                  <TD sx={{ width: "80%", textAlign: "left" }}>
                    <DisplayMoney price={rmpPrePymtPrice} />
                    {/*{rmpPrePymtPrice*/}
                    {/*  .toString()*/}
                    {/*  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }, [totalElements, rmpPrePymtPrice, result]);

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
  const ExpandableRowComponent: React.FC<Props> = ({ data }) => {
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
                <TableCell width={"25%"} align="center">
                  <Typography variant="body2">처리일</Typography>
                </TableCell>
                <TableCell
                  width={"25%"}
                  align="center"
                  sx={{
                    borderLeft: `1px solid ${cjbsTheme.palette.grey["500"]}`,
                  }}
                >
                  <Typography variant="body2">처리내역</Typography>
                </TableCell>
                <TableCell
                  width={"25%"}
                  align="center"
                  sx={{
                    borderLeft: `1px solid ${cjbsTheme.palette.grey["500"]}`,
                  }}
                >
                  <Typography variant="body2">사용금액</Typography>
                </TableCell>
                <TableCell
                  width={"25%"}
                  align="center"
                  sx={{
                    borderLeft: `1px solid ${cjbsTheme.palette.grey["500"]}`,
                  }}
                >
                  <Typography variant="body2">남은 선결제 금액</Typography>
                </TableCell>
              </TableRow>
              {data.prePymtPrcsStatusList.length === 0 && (
                <TableRow
                  sx={{
                    border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    backgroundColor: blue["50"],
                  }}
                >
                  <TableCell width={"25%"} align="center" colSpan={4}>
                    <Typography variant="body2">데이터가 없습니다.</Typography>
                  </TableCell>
                </TableRow>
              )}
              {data.prePymtPrcsStatusList.map((item: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{
                    border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    backgroundColor: blue["50"],
                  }}
                >
                  <TableCell width={"25%"} align="center">
                    <Typography variant="body2">{item.prcsDttm}</Typography>
                  </TableCell>
                  <TableCell
                    width={"25%"}
                    align="center"
                    sx={{
                      borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    }}
                  >
                    <Typography variant="body2">{item.prcsVal}</Typography>
                  </TableCell>
                  <TableCell
                    width={"25%"}
                    align="center"
                    sx={{
                      borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    }}
                  >
                    <Typography variant="body2">
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    width={"25%"}
                    align="center"
                    sx={{
                      borderLeft: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                    }}
                  >
                    <Typography variant="body2">
                      {item.rmnPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
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
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        // title={
        //   <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
        //     <Title1 titleName="고객별 결제 현황" />
        //   </Stack>
        // }
        data={prePymtStatusList}
        columns={columns}
        // onRowClicked={goDetailPage}
        // pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
        expandableRows
        expandableRowsComponent={ExpandableRowComponent}
        expandableIcon={{
          collapsed: <MyIcon icon="plus" size={16} />,
          expanded: <MyIcon icon="minus" size={16} />,
        }}
        // expandOnRowDoubleClicked={true}
        paginationPerPage={100}
        paginationRowsPerPageOptions={[100, 200, 300, 400]}
      />
    </Box>
  );
};

export default PrePymtList;
