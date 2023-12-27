"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import useSWR from "swr";
import { fetcher } from "api";
import { Box, Stack, Typography } from "@mui/material";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import {
  cjbsTheme,
  DataTableBase,
  formatNumberWithCommas,
  Title1,
} from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";

const ListTax = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  // const [sort, setSort] = useState<string>("orderId,DESC");

  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/invc/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data } = useSWR(url, fetcher, { suspense: true });
  console.log("TAX Data ==>>", data);
  const listData = data.invcList;
  const totalElements = data.pageInfo.totalElements;

  const columns = useMemo(() => getColumns(totalElements), [totalElements]);

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={totalElements} result={result} />,
    [totalElements, result],
  );

  const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: React.SetStateAction<number>, page: any) => {
      setSize(newPerPage);
    },
    [],
  );

  const Expanded = ({ data }) => {
    const { invcDetailList } = data;
    console.log("Expanded Value ==>>", invcDetailList);
    const footerTotalQuty = invcDetailList
      .map((item) => item.quty)
      .reduce((acc: number, cur: number) => acc + cur);
    const footerTotalSupplyPrice = invcDetailList
      .map((item) => item.totalSupplyPrice)
      .reduce((acc: number, cur: number) => acc + cur);
    const footerTotalVat = invcDetailList
      .map((item) => item.vat)
      .reduce((acc: number, cur: number) => acc + cur);
    const footerTotalPrice = invcDetailList
      .map((item) => item.totalPrice)
      .reduce((acc: number, cur: number) => acc + cur);

    return (
      <Box
        sx={{
          px: 4,
          py: 2,
          backgroundColor: cjbsTheme.palette.grey["100"],
        }}
      >
        <TableContainer
          sx={{
            backgroundColor: "white",
            border: `1px solid ${cjbsTheme.palette.grey["300"]}`,
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>품명</TableCell>
                <TableCell align="right">수량</TableCell>
                <TableCell align="right">공급가액</TableCell>
                <TableCell align="right">부가세</TableCell>
                <TableCell align="right">금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invcDetailList.map((item) => {
                const {
                  products,
                  quty,
                  totalPrice,
                  totalSupplyPrice,
                  vat,
                  invcProductsUkey,
                } = item;
                return (
                  <TableRow key={invcProductsUkey}>
                    <TableCell>{products}</TableCell>
                    <TableCell align="right">{quty}</TableCell>
                    <TableCell align="right">
                      {formatNumberWithCommas(totalSupplyPrice)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberWithCommas(vat)}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumberWithCommas(totalPrice)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow sx={{ backgroundColor: cjbsTheme.palette.grey["200"] }}>
                <TableCell align="right" sx={{ color: "black" }}>
                  <Typography variant="body2">총 합계</Typography>
                </TableCell>
                <TableCell align="right" sx={{ color: "black" }}>
                  <Typography variant="body2">
                    {formatNumberWithCommas(footerTotalQuty)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ color: "black" }}>
                  <Typography variant="body2">
                    {formatNumberWithCommas(footerTotalSupplyPrice)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ color: "black" }}>
                  <Typography variant="body2">
                    {formatNumberWithCommas(footerTotalVat)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ color: "black" }}>
                  <Typography variant="body2">
                    {formatNumberWithCommas(footerTotalPrice)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="세금계산서" />}
        data={listData}
        columns={columns}
        // onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
        // sortServer
        // onSort={handleSort}
        defaultSortFieldId={1}
        defaultSortAsc={false}
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={Expanded}
      />
    </Box>
  );
};

export default ListTax;
