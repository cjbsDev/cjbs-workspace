"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import {
  Box,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  FileDownloadBtn,
  formatNumberWithCommas,
  SelectBox2,
  SelectBox3,
  TD,
  TD2,
  TH,
  TH2,
  Title1,
} from "cjbsDSTM";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import {
  dashboardYearData,
  dashboardMonthData,
} from "../../../../data/inputDataLists";
const MngmntList = () => {
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const { data } = useSWR(
    `/stock/mtld/list?year=${year}&month=${month}`,
    fetcher,
    {
      suspense: true,
    },
  );
  // console.log("MTLD", data);

  const {
    mtldDetailList,
    closingStockTotalAmt,
    closingStockTotalCnt,
    openingStockTotalAmt,
    openingStockTotalCnt,
    stockInTotalAmt,
    stockInTotalCnt,
    stockOutTotalAmt,
    stockOutTotalCnt,
  } = data;

  const handleYear = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setYear(value);
  };

  const handleMonth = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setMonth(value);
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Title1 titleName={"수불부"} />
      </Box>

      <Box sx={{ mb: 1 }}>
        <Stack direction="row" spacing={3}>
          <Stack direction="row" spacing={1}>
            <SelectBox3
              options={dashboardYearData}
              value={year}
              onChange={handleYear}
            />
            <SelectBox3
              options={dashboardMonthData}
              value={month}
              onChange={handleMonth}
            />
          </Stack>

          <Stack direction="row" spacing={1}>
            <FileDownloadBtn
              exportUrl={`/stock/mtld/list/download?year=${year}&month=${month}`}
              iconName="xls3"
            />
            <FileDownloadBtn
              exportUrl={`/stock/mtld/list/download?year=${year}&month=${month}&qrtl=Q1`}
              iconName="xls3"
              buttonName="1분기"
            />
            <FileDownloadBtn
              exportUrl={`/stock/mtld/list/download?year=${year}&month=${month}&qrtl=Q2`}
              iconName="xls3"
              buttonName="2분기"
            />
            <FileDownloadBtn
              exportUrl={`/stock/mtld/list/download?year=${year}&month=${month}&qrtl=Q3`}
              iconName="xls3"
              buttonName="3분기"
            />
            <FileDownloadBtn
              exportUrl={`/stock/mtld/list/download?year=${year}&month=${month}&qrtl=Q4`}
              iconName="xls3"
              buttonName="4분기"
            />
          </Stack>
        </Stack>
      </Box>

      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TH2 width={80} align="center">
                  재고 ID
                </TH2>
                <TH2>품명</TH2>
                <TH2 align="right">단가</TH2>
                <TH2 align="right">기초재고 수량</TH2>
                <TH2 align="right">기초재고 금액</TH2>
                <TH2 align="right">입고 수량</TH2>
                <TH2 align="right">입고 금액</TH2>
                <TH2 align="right">출고 수량</TH2>
                <TH2 align="right">출고 금액</TH2>
                <TH2 align="right">기말재고 수량</TH2>
                <TH2 align="right">기말재고 금액</TH2>
              </TableRow>
            </TableHead>
            <TableBody>
              {mtldDetailList.map((item) => {
                const {
                  closingStockAmt,
                  closingStockCnt,
                  mtldDetailUkey,
                  openingStockAmt,
                  openingStockCnt,
                  stockId,
                  stockInAmt,
                  stockInCnt,
                  stockNm,
                  stockOutAmt,
                  stockOutCnt,
                  unpr,
                } = item;
                return (
                  <TableRow key={mtldDetailUkey}>
                    <TD2 align="center">{stockId}</TD2>
                    <TD2>{stockNm}</TD2>
                    <TD2 align="right">{formatNumberWithCommas(unpr)}</TD2>
                    <TD2 align="right">
                      {formatNumberWithCommas(openingStockCnt)}
                    </TD2>
                    <TD2 align="right">
                      {formatNumberWithCommas(openingStockAmt)}
                    </TD2>
                    <TD2 align="right">
                      {formatNumberWithCommas(stockInCnt)}
                    </TD2>
                    <TD2 align="right">
                      {formatNumberWithCommas(stockInAmt)}
                    </TD2>
                    <TD2 align="right">
                      {formatNumberWithCommas(stockOutCnt)}
                    </TD2>
                    <TD2 align="right">
                      {formatNumberWithCommas(stockOutAmt)}
                    </TD2>
                    <TD2 align="right">
                      {formatNumberWithCommas(closingStockCnt)}
                    </TD2>
                    <TD2 align="right">
                      {formatNumberWithCommas(closingStockAmt)}
                    </TD2>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter
              sx={{ backgroundColor: cjbsTheme.palette.grey["100"] }}
            >
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ backgroundColor: cjbsTheme.palette.grey["300"] }}
                >
                  <Typography variant="body1">합계</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumberWithCommas(closingStockTotalCnt)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumberWithCommas(closingStockTotalAmt)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumberWithCommas(stockInTotalCnt)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumberWithCommas(stockInTotalAmt)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumberWithCommas(stockOutTotalCnt)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumberWithCommas(stockOutTotalAmt)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumberWithCommas(openingStockTotalCnt)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {formatNumberWithCommas(openingStockTotalAmt)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MngmntList;
