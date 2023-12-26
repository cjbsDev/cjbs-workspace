import React from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useSWR from "swr";
import { fetcher } from "api";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import { useRecoilState, useRecoilValue } from "recoil";
import { idleDurationValueAtom } from "./idleAtom";
import MyIcon from "icon/MyIcon";

const IdleTop = () => {
  const getDuration = useRecoilValue(idleDurationValueAtom);

  const { data } = useSWR(
    `/dashboard/idle/agnc?duration=${getDuration}`,
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
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
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} sx={{ border: "none" }}>
                <Box
                  sx={{
                    mt: 3,
                    // position: "absolute",
                    // left: "50%",
                    // top: "50%",
                    // transform: "translate(-50%, -50%)",
                  }}
                >
                  <Stack direction="row" justifyContent="center">
                    <MyIcon icon="nodata" size={20} />
                    <Typography variant="body2">
                      데이터가 존재하지 않습니다.
                    </Typography>
                  </Stack>
                </Box>
              </TableCell>
            </TableRow>
          )}

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
                  <TableCell height={56}>{lastSalesDate}</TableCell>
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
