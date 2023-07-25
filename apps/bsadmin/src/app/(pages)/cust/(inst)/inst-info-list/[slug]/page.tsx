"use client";

import React from "react";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  ErrorContainer,
  Fallback,
} from "cjbsDSTM";
import useSWR from "swr";
import { useRouter } from "next-nprogress-bar";
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
} from "@mui/material";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const LazyListInst = dynamic(() => import("./InstAgncList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

interface CustViewProps {
  params: {
    slug: string;
  };
}

export default function InstPage({ params }: CustViewProps) {
  // init
  const { slug } = params;
  const router = useRouter();

  const {
    data: instTempData,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/inst/${slug}`, fetcher);

  if (isLoading) {
    return <SkeletonLoading />;
  }

  const instDetail = instTempData.data;

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="기관 정보" />
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
              <TH sx={{ width: "15%" }}>더존 코드</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {instDetail.douzoneCode ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>위치</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.region1Val ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>기관명</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.instNm ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>사업자 등록번호</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.brno ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>대표자</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.rprsNm ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>업태</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.itbsns ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>업종</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.tpbsns ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>주소</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {instDetail.zip ? "[" + instDetail.zip + "]" : ""}{" "}
                {instDetail.addr ?? "-"} {instDetail.addrDetail ?? ""}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>지역</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.region1Val ?? "-"} {instDetail.region2Val ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>분류</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.instTypeVal ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>특성</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.ftr ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.statusCodeVal ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyListInst instUkey={slug} />
      </ErrorContainer>
      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/cust/inst-info-list")}
        />
        <Link
          href={{
            pathname: "/cust/inst-info-modify",
            query: { instUkey: instTempData.data.instUkey },
          }}
        >
          <ContainedButton buttonName="수정" />
        </Link>
      </Stack>
    </Container>
  );
}
