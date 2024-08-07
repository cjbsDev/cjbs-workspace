"use client";
import * as React from "react";
import { useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  cjbsTheme,
  FileDownloadBtn,
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
import YearMonthSelectBox from "./components/YearMonthSelectBox";
import TotalPriceBox from "./components/TotalPriceBox";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentMonthAtom, currentYearAtom } from "./atom";
import { getColumns } from "./components/Columns/LicenseListColumns";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";
import useCalculatedHeight from "../../../../../hooks/useCalculatedHeight";
// const currentYear = dayjs().year();
// const currentMonth = dayjs().get("month");

const LicenseList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const year = useRecoilValue(currentYearAtom);
  const month = useRecoilValue(currentMonthAtom);
  const [resultObject, result] = useResultObject();
  const height = useCalculatedHeight(370);

  const url = useMemo(() => {
    const base = "/agnc/license/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}&year=${year}&month=${month}`
        : `?page=${page}&size=${size}&year=${year}&month=${month}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size, year, month]);

  const { data } = useSWR(url, fetcher, { suspense: true });
  const { licenseStatusList, yearTotalPrice, monthTotalPrice, pageInfo } = data;
  const { totalElements } = pageInfo;

  const columns = useMemo(() => getColumns(), []);

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

              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={1}
                sx={{ mb: 0.5 }}
                alignItems="center"
              >
                <YearMonthSelectBox />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <FileDownloadBtn
                exportUrl={`/agnc/license/list/download${result}&year=${year}&month=${month}`}
                iconName="xls3"
              />
              <KeywordSearch />
              {/*<ResultInSearch/>*/}
            </Stack>
          </Stack>

          <TotalPriceBox
            year={year}
            month={month}
            monthTotalPrice={monthTotalPrice}
            yearTotalPrice={yearTotalPrice}
          />
        </Grid>
      </Grid>
    );
  }, [totalElements, result, year, month]);

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
  const ExpandableRowComponent: React.FC<Props> = ({ data }) => {
    // console.log(">>>>>>>>>>>", data);
    return (
      <>
        <TableContainer>
          <Table aria-label="simple table" size="small">
            <TableBody>
              <TableRow>
                {data.lcnsCosts.map((item: any, index: number) => (
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
                {data.lcnsCosts.map((item: any, index: number) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
                      backgroundColor: blue["50"],
                    }}
                  >
                    <Typography variant="body2">
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
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
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        data={licenseStatusList}
        columns={columns}
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
        paginationRowsPerPageOptions={[50, 100, 200, 300, 400]}
      />
    </Box>
  );
};

export default LicenseList;
