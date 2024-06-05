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
import { useRecoilValue } from "recoil";
import {
  isBillAndRequestAtom,
  invcStartMonthAtom,
  invcEndMonthAtom,
  invcEndYearAtom,
  invcStartYearAtom,
} from "../atom";

const TotalTaxPrice = () => {
  const isBillAndRequest = useRecoilValue(isBillAndRequestAtom);
  const startYear = useRecoilValue(invcStartYearAtom);
  const startMonth = useRecoilValue(invcStartMonthAtom);
  const endYear = useRecoilValue(invcEndYearAtom);
  const endMonth = useRecoilValue(invcEndMonthAtom);
  const { data } = useSWR(
    `/invc/total/price?isBillAndRequest=${isBillAndRequest}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`,
    fetcher,
    {
      suspense: true,
    },
  );

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
