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

const MngmntList = () => {
  const year = useRecoilValue(currentYearAtom);
  const month = useRecoilValue(currentMonthAtom);

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

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Title1 titleName={"수불부"} />
      </Box>

      <SubHeader />

      <Box>
        <TableContainer>
          <Table>
            <TableHeader />
            <TableBody>
              {mtldDetailList.map(
                (item: {
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
                }) => {
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
      </Box>
    </>
  );
};

export default MngmntList;
