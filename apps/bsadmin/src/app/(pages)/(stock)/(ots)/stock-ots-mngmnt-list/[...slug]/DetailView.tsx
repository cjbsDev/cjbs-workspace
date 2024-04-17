"use client";

import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  formatNumberWithCommas,
  formatPhoneNumber,
  InputValidation,
  OutlinedButton,
  SelectBox,
  SingleDatePicker,
  TD,
  TH,
  Title1,
  transformedNullToHyphon,
  Won,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Checkbox,
  Container,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TelNumber from "../../../../../components/NumberFormat/TelNumber";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";
import AmountFormat from "../../../../../components/NumberFormat/AmountFormat";

const DetailView = () => {
  const params = useParams();
  const ukey = params.slug;
  const { data } = useSWR(`/ots/${ukey}`, fetcher, {
    suspense: true,
  });

  console.log("Stock OTS detail view data ==>>", data);

  const {
    agncCc,
    agncVal,
    anlsTypeMc,
    anlsTypeVal,
    clrNm,
    clrUkey,
    lastPrice,
    memo,
    orderInfo,
    otsDttm,
    otsId,
    otsSampleDetailList,
    otsUkey,
    pltfMc,
    pltfVal,
    qttnPrice,
    rcptNum,
    resultRcpnDttm,
    sampleInfo,
    sampleTypeMc,
    sampleTypeVal,
    sampleUkeyList,
    seqTypeCc,
    seqTypeVal,
    srvcTypeMc,
    srvcTypeVal,
  } = data;

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={"아웃소싱 상세"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>구분</TH>
              <TD sx={{ width: "35%" }}>{seqTypeVal}</TD>
              <TH sx={{ width: "15%" }}>날짜</TH>
              <TD sx={{ width: "35%" }}>{otsDttm}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>업체</TH>
              <TD sx={{ width: "35%" }}>{agncVal}</TD>
              <TH sx={{ width: "15%" }}>접수번호</TH>
              <TD sx={{ width: "35%" }}>{rcptNum}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>샘플종류</TH>
              <TD sx={{ width: "35%" }}>{sampleTypeVal}</TD>
              <TH sx={{ width: "15%" }}>서비스종류</TH>
              <TD sx={{ width: "35%" }}>{srvcTypeVal}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>분석종류</TH>
              <TD sx={{ width: "35%" }}>{anlsTypeVal}</TD>
              <TH sx={{ width: "15%" }}>플랫폼</TH>
              <TD sx={{ width: "35%" }}>{pltfVal}</TD>
            </TableRow>
            <TableRow>
              <TH>견적 금액</TH>
              <TD>{formatNumberWithCommas(qttnPrice)}</TD>
              <TH>최종 금액</TH>
              <TD>{formatNumberWithCommas(lastPrice)}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>결과 접수일</TH>
              <TD sx={{ width: "35%" }}>{resultRcpnDttm}</TD>
              <TH sx={{ width: "15%" }}>발주자</TH>
              <TD sx={{ width: "35%" }}>{clrNm}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">샘플 정보</Typography>
      <TableContainer sx={{ mb: 1.5 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TH align="center">샘플 번호</TH>
              <TH align="center">샘플명</TH>
              <TH align="center">샘플종류</TH>
              <TH align="center">Source</TH>
              <TH align="center">Depth(GB)</TH>
              <TH align="center">Taxon</TH>
              <TH align="center">오더 번호</TH>
              <TH align="center">서비스 타입</TH>
            </TableRow>
          </TableHead>
          <TableBody>
            {otsSampleDetailList.map((item, index) => {
              const {
                sampleUkey,
                sampleNm,
                sampleTypeVal,
                source,
                depthVal,
                depthMc,
                taxonVal,
                taxonCc,
                orderId,
                orderUkey,
                srvcTypeVal,
                srvcTypeMc,
              } = transformedNullToHyphon(item);
              return (
                <TableRow>
                  <TD align="center">{sampleUkey}</TD>
                  <TD align="center">{sampleNm}</TD>
                  <TD align="center">{sampleTypeVal}</TD>
                  <TD align="center">{source}</TD>
                  <TD align="center">{depthVal}</TD>
                  <TD align="center">{taxonVal}</TD>
                  <TD align="center">{orderId}</TD>
                  <TD align="center">{srvcTypeVal}</TD>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>오더 정보</TH>
              <TD sx={{ width: "35%" }}>{orderInfo}</TD>
              <TH sx={{ width: "15%" }}>샘플 정보</TH>
              <TD sx={{ width: "35%" }}>{sampleInfo}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>메모</TH>
              <TD>{memo}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/stock-ots-mngmnt-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <Link
          href={{
            pathname: "/stock-ots-mngmnt-reg",
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
