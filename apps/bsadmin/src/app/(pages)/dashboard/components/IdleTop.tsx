import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useSWR from "swr";
import { fetcher } from "api";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import { useSearchParams } from "next/navigation";

const IdleTop = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("idleduration");
  console.log("IdleDuration", params);
  const [duration, setDuration] = useState<number>(1);
  const { data } = useSWR(
    params === null
      ? `/dashboard/idle/agnc?duration=1`
      : `/dashboard/idle/agnc?duration=${params}`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("장기 미거래 Top", data);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <LeftTH>최종 거래일</LeftTH>
            <CmnTH>기관</CmnTH>
            <CmnTH>거래처</CmnTH>
            <CmnTH align="right">최종 거래 금액</CmnTH>
            <RightRTH align="right">총 누적 금액</RightRTH>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (
              item: {
                code: string;
                instNm: string;
                ukey: string;
                agncNm: string;
                lastSalesDate: string;
                lastSales: number;
                totalSales: number;
              },
              index: number,
            ) => {
              const {
                code,
                instNm,
                ukey,
                agncNm,
                lastSalesDate,
                lastSales,
                totalSales,
              } = item;
              return (
                <TableRow key={ukey}>
                  <TableCell>{lastSalesDate}</TableCell>
                  <TableCell>{instNm}</TableCell>
                  <TableCell>{agncNm}</TableCell>
                  <TableCell align="right">
                    {formatNumberWithCommas(lastSales)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumberWithCommas(totalSales)}
                  </TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IdleTop;

const CmnTH = styled(TableCell)`
  border-bottom: none;
  background-color: #f1f3f5;
`;

const LeftTH = styled(CmnTH)`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const RightRTH = styled(CmnTH)`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;