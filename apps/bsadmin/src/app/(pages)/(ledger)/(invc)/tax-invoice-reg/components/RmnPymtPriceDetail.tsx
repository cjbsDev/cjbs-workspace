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
import { cjbsTheme } from "cjbsDSTM";

const RmnPymtPriceDetail = () => {
  const { getValues } = useFormContext();
  const agncUkey = getValues("agncUkey");
  console.log("AGNCUKEY ==>>", typeof agncUkey);
  const { data } = useSWR(
    () =>
      agncUkey !== "" || undefined
        ? `/invc/list/rmn/pymt/price/${agncUkey}`
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
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">서비스 분류</TableCell>
            <TableCell align="center">분석 내역서</TableCell>
            <TableCell align="right">분석일</TableCell>
            <TableCell align="right">분석비용</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rmnPymtPriceListDetailList.map(
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
                  <TableCell>{index}</TableCell>
                  <TableCell align="center">{srvcCtgrMcVal}</TableCell>
                  <TableCell align="center">{anlsItstUkey}</TableCell>
                  <TableCell align="right">{anlsDttm}</TableCell>
                  <TableCell align="right">{anlsPrice}</TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RmnPymtPriceDetail;
