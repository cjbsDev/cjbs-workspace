import React from "react";
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
import { useRecoilValue } from "recoil";
import {
  dashboardTargetAtom,
  dashboardTypeCcAtom,
  dashboardYearAtom,
} from "../../dashboardAtom";

const Contents = () => {
  const getYear = useRecoilValue(dashboardYearAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);
  const getTarget = useRecoilValue(dashboardTargetAtom);

  const { data } = useSWR(
    `/dashboard/sls/agnc??year=${getYear}&typeCc=${getTypeCc}&target=${
      getTypeCc === "BS_2100005"
        ? getTarget.halfTarget
        : getTypeCc === "BS_2100004"
          ? getTarget.quarterTarget
          : getTypeCc === "BS_2100003"
            ? getTarget.monthTarget
            : 12
    }`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("기관 매출 Top", data);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <LeftTH>No</LeftTH>
            <CmnTH>Name</CmnTH>
            <CmnTH align="right">거래 금액</CmnTH>
            <RightRTH align="right">총 누적 금액</RightRTH>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (
              item: {
                code: string;
                nm: string;
                monthlySales: number;
                totalSales: number;
              },
              index: number,
            ) => {
              const { code, nm, monthlySales, totalSales } = item;
              return (
                <TableRow key={code}>
                  <TableCell height={56}>{index + 1}</TableCell>
                  <TableCell>{nm}</TableCell>
                  <TableCell align="right">
                    {formatNumberWithCommas(monthlySales)}
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

export default Contents;

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
