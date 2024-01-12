import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cjbsTheme, formatNumberWithCommas } from "cjbsDSTM";

interface RmnPymtPriceDetailProps {
  agncUkey: string;
  pymtInfoCc?: string;
}

const RmnPymtPriceDetail = ({
  agncUkey,
  pymtInfoCc,
}: RmnPymtPriceDetailProps) => {
  const { data } = useSWR(
    () =>
      agncUkey !== "" || undefined
        ? `/invc/list/rmn/${
            pymtInfoCc === "BS_1914004" ? "tnsf" : "pymt"
          }/price/${agncUkey}`
        : null,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Rmn Payment Price Detail ==>>", data);
  const { rmnPymtPriceListDetailList } = data;

  return (
    <TableContainer
      sx={{ border: `1px solid ${cjbsTheme.palette.grey["300"]}`, mt: 2 }}
    >
      <Table size="small">
        <TableHead>
          {pymtInfoCc === "BS_1914004" ? (
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">거래처명</TableCell>
              <TableCell align="right">이관 전 금액</TableCell>
              <TableCell align="right">처리금액</TableCell>
              <TableCell align="right">이관 후 금액</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">서비스 분류</TableCell>
              <TableCell align="center">분석 내역서</TableCell>
              <TableCell align="right">분석일</TableCell>
              <TableCell align="right">분석비용</TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {rmnPymtPriceListDetailList.length > 0 ? (
            rmnPymtPriceListDetailList.map(
              (
                item: {
                  srvcCtgrMc: string;
                  srvcCtgrMcVal: string;
                  anlsItstUkey: string;
                  anlsDttm: string;
                  anlsPrice: number;
                },
                index: number,
              ) => {
                const {
                  srvcCtgrMc,
                  srvcCtgrMcVal,
                  anlsItstUkey,
                  anlsDttm,
                  anlsPrice,
                } = item;

                return (
                  <TableRow key={anlsItstUkey}>
                    <TableCell>{index + 1}</TableCell>
                    {pymtInfoCc === "BS_1914004" ? (
                      ""
                    ) : (
                      <>
                        <TableCell align="center">{srvcCtgrMcVal}</TableCell>
                        <TableCell align="center">{anlsItstUkey}</TableCell>
                        <TableCell align="right">{anlsDttm}</TableCell>
                        <TableCell align="right">
                          {formatNumberWithCommas(anlsPrice)}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              },
            )
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2" sx={{ py: 2 }}>
                  데이터가 없습니다.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RmnPymtPriceDetail;
