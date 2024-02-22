import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { cjbsTheme, TD, TH, formatNumberWithCommas } from "cjbsDSTM";

const TotalTaxPrice = () => {
  const { data } = useSWR("/invc/total/price", fetcher, {
    suspense: true,
  });

  const { totalSupplyPrice, totalVat, totalPrice } = data;
  console.log(data);

  return (
    <TableContainer sx={{ my: 1 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH>총 공급금액</TH>
            <TD align="right">{formatNumberWithCommas(totalSupplyPrice)}원</TD>
            <TH>총 부가세</TH>
            <TD align="right">{formatNumberWithCommas(totalVat)}원</TD>
            <TH>총 합계금액</TH>
            <TD align="right">{formatNumberWithCommas(totalPrice)}원</TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TotalTaxPrice;
