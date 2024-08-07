"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Typography,
} from "@mui/material";
import { cjbsTheme, formatNumberWithCommas, TD2, Title1 } from "cjbsDSTM";
import TableHeader from "./components/TableHeader";
import { useRecoilValue } from "recoil";
import { currentMonthAtom, currentYearAtom } from "./atom";
import SubHeader from "./components/SubHeader";
import TableSumFooter from "./components/TableSumFooter";
import Row from "./components/Row";
import useCalculatedHeight from "../../../../hooks/useCalculatedHeight";

const MtldMngmntList = () => {
  const height = useCalculatedHeight(212);
  const year = useRecoilValue(currentYearAtom);
  const month = useRecoilValue(currentMonthAtom);

  const { data } = useSWR(
    `/stock/mtld/list?year=${year}&month=${month}`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("MTLD", data);

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

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Title1 titleName={"수불부"} />
      </Box>

      <SubHeader />

      <TableContainer
        sx={{
          position: "relative",
          height: height,
          // pb: 56,
        }}
      >
        <Table>
          <TableHeader />
          <TableBody sx={{ height: 300, overflowY: "auto" }}>
            {mtldDetailList.map(
              (
                item: {
                  closingStockAmt: any;
                  closingStockCnt: any;
                  mtldDetailUkey: any;
                  openingStockAmt: any;
                  openingStockCnt: any;
                  stockId: any;
                  stockInAmt: any;
                  stockInCnt: any;
                  stockNm: any;
                  stockOutAmt: any;
                  stockOutCnt: any;
                  unpr: any;
                },
                index,
              ) => {
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
                  <TableRow key={mtldDetailUkey + index.toString()}>
                    <Row
                      stockId={stockId}
                      stockNm={stockNm}
                      unpr={unpr}
                      openingStockCnt={openingStockCnt}
                      openingStockAmt={openingStockAmt}
                      stockInCnt={stockInCnt}
                      stockInAmt={stockInAmt}
                      stockOutCnt={stockOutCnt}
                      stockOutAmt={stockOutAmt}
                      closingStockCnt={closingStockCnt}
                      closingStockAmt={closingStockAmt}
                    />
                  </TableRow>
                );
              },
            )}
          </TableBody>

          <TableSumFooter
            closingStockTotalCnt={closingStockTotalCnt}
            closingStockTotalAmt={closingStockTotalAmt}
            openingStockTotalAmt={openingStockTotalAmt}
            openingStockTotalCnt={openingStockTotalCnt}
            stockInTotalAmt={stockInTotalAmt}
            stockInTotalCnt={stockInTotalCnt}
            stockOutTotalCnt={stockOutTotalCnt}
            stockOutTotalAmt={stockOutTotalAmt}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default MtldMngmntList;
