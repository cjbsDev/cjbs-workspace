"use client";
import * as React from "react";
import { Table, TableBody, TableRow, Box, TableContainer } from "@mui/material";
import { cjbsTheme, TD, TH } from "cjbsDSTM";
import { useState } from "react";
import DisplayMoney from "../../../../../../components/DisplayMoney";

const TotalPriceBox = (props: any) => {
  const { year, month, monthTotalPrice, yearTotalPrice } = props;
  console.log(yearTotalPrice);
  console.log(monthTotalPrice);

  return (
    <TableContainer sx={{ mb: 1, mt: 1 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "20%" }}>
              <Box
                component="span"
                sx={{ color: cjbsTheme.palette.primary.main }}
              >
                {month}월
              </Box>{" "}
              사용금액 총계
            </TH>
            <TD sx={{ width: "30%", textAlign: "left" }}>
              <DisplayMoney price={monthTotalPrice} />
              {/*{monthTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
            </TD>
            <TH sx={{ width: "20%" }}>
              <Box
                component="span"
                sx={{ color: cjbsTheme.palette.primary.main }}
              >
                {year}년
              </Box>{" "}
              사용금액 총계
            </TH>
            <TD sx={{ width: "30%", textAlign: "left" }}>
              <DisplayMoney price={yearTotalPrice} />
              {/*{yearTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TotalPriceBox;
