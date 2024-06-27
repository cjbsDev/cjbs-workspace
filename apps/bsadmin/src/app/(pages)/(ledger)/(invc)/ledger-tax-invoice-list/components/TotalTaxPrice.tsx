import React, { useMemo } from "react";
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
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";

const TotalTaxPrice = () => {
  const [resultObject, result] = useResultObject();
  const isBillAndRequest = useRecoilValue(isBillAndRequestAtom);
  const startYear = useRecoilValue(invcStartYearAtom);
  const startMonth = useRecoilValue(invcStartMonthAtom);
  const endYear = useRecoilValue(invcEndYearAtom);
  const endMonth = useRecoilValue(invcEndMonthAtom);

  const cleanUrl = result?.replace("?", "");
  console.log("TOTAL PRICE RESULT ==>>", cleanUrl);

  const { data } = useSWR(
    `/invc/total/price?isBillAndRequest=${isBillAndRequest}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}&${cleanUrl}`,
    fetcher,
    {
      suspense: true,
    },
  );

  // const url = useMemo(() => {
  //   const base = "/invc/list";
  //   const params =
  //     JSON.stringify(resultObject) !== "{}"
  //       ? `${result}&page=${page}&size=${size}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`
  //       : `?page=${page}&size=${size}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`;
  //   return `${base}${params}`;
  // }, [
  //   resultObject,
  //   result,
  //   page,
  //   size,
  //   startYear,
  //   startMonth,
  //   endYear,
  //   endMonth,
  // ]);

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
