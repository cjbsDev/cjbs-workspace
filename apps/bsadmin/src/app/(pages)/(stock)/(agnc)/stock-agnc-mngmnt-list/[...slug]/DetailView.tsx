"use client";
import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import {
  ContainedButton,
  Form,
  formatPhoneNumber,
  InputValidation,
  OutlinedButton,
  SelectBox,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Container,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import TelNumber from "../../../../../components/NumberFormat/TelNumber";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";

const DetailView = () => {
  const params = useParams();
  const ukey = params.slug;
  const { data } = useSWR(`/stock/agnc/${ukey}`, fetcher, {
    suspense: true,
  });

  console.log("Stock agnc detail view data ==>>", data);

  const {
    departMngrMc,
    departMngrVal,
    email,
    memo,
    mngrNm,
    mngrTel,
    stockAgncId,
    stockAgncNm,
    stockAgncUkey,
  } = data;

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={"주문처 상세"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>주문처</TH>
              <TD sx={{ width: "85%" }}>{stockAgncNm}</TD>
            </TableRow>
            <TableRow>
              <TH>이메일</TH>
              <TD>{email}</TD>
            </TableRow>
            <TableRow>
              <TH>담당자</TH>
              <TD>{mngrNm}</TD>
            </TableRow>
            <TableRow>
              <TH>연락처</TH>
              <TD>{formatPhoneNumber(mngrTel)}</TD>
            </TableRow>
            <TableRow>
              <TH>거래부서</TH>
              <TD>{departMngrVal}</TD>
            </TableRow>
            <TableRow>
              <TH>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
              <TD>{memo}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/stock-agnc-mngmnt-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <Link
          href={{
            pathname: "/stock-agnc-mngmnt-reg",
            query: { modifyUkey: ukey },
          }}
        >
          <ContainedButton buttonName="수정" size="small" />
        </Link>
      </Stack>
    </>
  );
};

export default DetailView;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
