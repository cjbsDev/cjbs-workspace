"use client";

import React, { useState } from "react";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  ErrorContainer,
  Fallback,
  formatNumberWithCommas,
} from "cjbsDSTM";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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
import MyIcon from "icon/MyIcon";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import { fetcher } from "api";
import InstInfo from "./InstInfo";
import StatementCheck from "./StatementCheck";

const LazyMemberTable = dynamic(
  () => import("../../../../../components/MemberMng"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={270} />,
  },
);

const AgncInfo = () => {
  // init
  const params = useParams();
  console.log("@@@@@@PARAMS", params);
  const { slug } = params;
  const router = useRouter();
  // load
  const { data: agncData } = useSWR(`/agnc/${slug}`, fetcher, {
    suspense: true,
  });

  console.log("agncData", agncData);

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="거래처(PI) 정보" />
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
              <TH sx={{ width: "15%" }}>기관명</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {agncData.isSpecialMng === "Y" && (
                      <MyIcon
                        data-tag="allowRowEvents"
                        icon="vip-fill"
                        size={20}
                        color="#FFAB33"
                      />
                    )}
                    <Box>{agncData.instNm ?? "-"}</Box>
                  </Stack>

                  <InstInfo />
                </Box>
              </TD>
              <TH sx={{ width: "15%" }}>거래처(PI)명</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {agncData.agncNm ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>주소</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {agncData.zip ? "[" + agncData.zip + "]" : ""}{" "}
                {agncData.addr ?? "-"} {agncData.addrDetail ?? ""}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>연구책임자 아이디</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {agncData.ebcEmail ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>연구책임자 이름</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {agncData.custNm ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/*
      <Typography variant="subtitle1">
        소속 연구원( 총 {agncCustList.length}명 )
      </Typography>
      <TableContainer component={Box} sx={{ mb: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TH sx={{ width: "2%" }}></TH>
              <TH sx={{ width: "35%" }}>아이디</TH>
              <TH sx={{ width: "35%" }}>이름</TH>
            </TableRow>
          </TableHead>
          <TableBody>
            {agncCustList.length === 0 ? (
              <TableRow>
                <TD colSpan={5}>
                  <Box sx={{ textAlign: "center" }}>멤버가 없습니다.</Box>
                </TD>
              </TableRow>
            ) : (
              agncCustList.map((dataItem, index) => (
                <TableRow key={dataItem.custUkey}>
                  <TD>{index + 1}</TD>
                  <TD>{dataItem.ebcEmail}</TD>
                  <TD>{dataItem.custNm}</TD>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

*/}

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyMemberTable
          memberData={agncData.custDetail}
          memberSearchModalFlag={false}
        />
      </ErrorContainer>

      <Typography sx={{ mt: 5 }} variant="subtitle1">
        기타 운영 정보
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>선결제 금액</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">
                    {formatNumberWithCommas(agncData.prePymtPrice)}
                  </Typography>

                  <StatementCheck />
                  {/*<OutlinedButton*/}
                  {/*  buttonName="내역 확인"*/}
                  {/*  size="small"*/}
                  {/*  onClick={handleStatementChkModalOpen}*/}
                  {/*/>*/}
                </Stack>
              </TD>
              <TH sx={{ width: "15%" }}>영업 담당자</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {agncData.bsnsMngrNm ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">메모</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>메모</TH>
              <TD
                sx={{
                  width: "85%",
                }}
              >
                <Box sx={{ whiteSpace: "pre-wrap" }}>{agncData.memo}</Box>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/agnc-pi-list")}
        />
        {/*<ContainedButton*/}
        {/*  buttonName="수정"*/}
        {/*  onClick={() =>*/}
        {/*    router.push("/agnc-pi-modify/" + agncData.agncUkey)*/}
        {/*  }*/}
        {/*/>*/}
        <Link
          href={{
            pathname: "/agnc-pi-modify",
            query: { agncUkey: agncData.agncUkey },
          }}
        >
          <ContainedButton buttonName="수정" />
        </Link>
      </Stack>
    </Container>
  );
};

export default AgncInfo;
