"use client";

import React, { useEffect, useState } from "react";
import {
  ContainedButton,
  OutlinedButton,
  LinkButton,
  Title1,
  TH,
  TD,
  ErrorContainer,
  Fallback,
  LeaderCip,
  cjbsTheme,
} from "cjbsDSTM";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  IconButton,
} from "@mui/material";
import MyIcon from "icon/myIcon";
import Dayjs from "dayjs";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import { useForm, FormProvider } from "react-hook-form";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface viewProps {
  params: {
    slug: string;
  };
}

export default function EstProductPage({ params }: viewProps) {
  // init
  const { slug } = params;
  const router = useRouter();

  // load
  const {
    data: estProductTempData,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/mngr/esPrMng/${slug}`,
    fetcher
  );
  if (isLoading) {
    return <SkeletonLoading />;
  }

  const estProductData = estProductTempData.data;
  console.log("estProductData", estProductData);

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="견적 품명 정보" />
      </Box>

      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1">기본 정보</Typography>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>분석 종류</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {estProductData.anlsTypeMcVal}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>품명</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {estProductData.prNm}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>포함사항</TH>
              <TD
                sx={{
                  width: "85%",
                }}
              >
                <Box sx={{ whiteSpace: "pre-wrap" }}>
                  {estProductData.inclInfo}
                </Box>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/es-pr-list")}
        />

        <Link
          href={{
            pathname: "/es-pr-modify",
            query: { esPrMngUkey: estProductData.esPrMngUkey },
          }}
        >
          <ContainedButton buttonName="수정" />
        </Link>
      </Stack>
    </Container>
  );
}
