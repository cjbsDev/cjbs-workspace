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
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../components/SkeletonLoading";

const LazyCommontModifyLog = dynamic(
  () => import("../../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  },
);

const DetailView = () => {
  const router = useRouter();
  const params = useParams();
  const ukey = params.slug;
  const { data } = useSWR(`/stock/${ukey}`, fetcher, {
    suspense: true,
  });

  console.log("Stock detail view data ==>>", data);

  const {
    agncNm,
    catNo,
    departMngrMc,
    departMngrVal,
    isAstnPrice,
    isGutinside,
    mchnMc,
    mchnVal,
    memo,
    mkrNm,
    mngrNm,
    mngrUkey,
    srvcMc,
    srvcVal,
    stnd,
    stockCtgrCc,
    stockCtgrVal,
    stockId,
    stockNm,
    stockUkey,
    strgPlaceMc,
    strgPlaceVal,
    unitCc,
    unitVal,
    unpr,
  } = transformedNullToHyphon(data);

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={"재고 상세"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>보조금 여부</TH>
              <TD sx={{ width: "35%" }}>{isAstnPrice}</TD>
              <TH sx={{ width: "15%" }}>구분</TH>
              <TD sx={{ width: "35%" }}>{stockCtgrVal}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>주문처</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                {agncNm}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>품명</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                {stockNm}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>제조사</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                {mkrNm}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>재고 담당자</TH>
              <TD sx={{ width: "35%" }}>
                {departMngrVal} {mngrNm}
              </TD>
              <TH sx={{ width: "15%" }}>단가</TH>
              <TD sx={{ width: "35%" }}>{formatNumberWithCommas(unpr)}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>규격</TH>
              <TD sx={{ width: "35%" }}>{stnd}</TD>
              <TH sx={{ width: "15%" }}>단위</TH>
              <TD sx={{ width: "35%" }}>{unitVal}</TD>
            </TableRow>
            <TableRow>
              <TH>Cat. No</TH>
              <TD>{catNo}</TD>
              <TH>서비스</TH>
              <TD>{srvcVal}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>사용기계</TH>
              <TD sx={{ width: "35%" }}>{mchnVal}</TD>
              <TH sx={{ width: "15%" }}>재고위치</TH>
              <TD sx={{ width: "35%" }}>{strgPlaceVal}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>메모</TH>
              <TD colSpan={3}>{memo}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCommontModifyLog apiName="stock" uKey={ukey} logTitle="재고" />
        </ErrorContainer>
      </Box>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          size="small"
          buttonName="목록"
          onClick={() => router.back()}
        />

        <Link
          href={{
            pathname: "/stock-mngmnt-reg",
            query: { modifyUkey: stockUkey },
          }}
        >
          <ContainedButton buttonName="수정" size="small" />
        </Link>
      </Stack>
    </>
  );
};

export default DetailView;
