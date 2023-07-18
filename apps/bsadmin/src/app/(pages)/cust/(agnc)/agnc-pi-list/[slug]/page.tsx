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
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import { useForm, FormProvider } from "react-hook-form";

const LazyAgncInfoModal = dynamic(() => import("./AgncInfoModal"), {
  ssr: false,
});
const LazyStatementCheckModal = dynamic(() => import("./StatementCheckModal"), {
  ssr: false,
});
const LazyMemberTable = dynamic(
  () => import("../../../../../components/MemberMng"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={270} />,
  }
);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface CustViewProps {
  params: {
    slug: string;
  };
}

export default function AgncPage({ params }: CustViewProps) {
  // init
  const { slug } = params;
  const router = useRouter();
  const [agncInfoModalOpen, setAgncInfoModalOpen] = useState<boolean>(false);
  const [statementChkModalOpen, setStatementChkModalOpen] =
    useState<boolean>(false);

  // load
  const {
    data: agncTempData,
    error,
    isLoading,
  } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/${slug}`,
    fetcher
  );
  if (isLoading) {
    return <SkeletonLoading />;
  }

  const agncData = agncTempData.data;
  console.log("agncData", agncData);
  //setSelectedMembers(agncData.custDetail);

  //const agncCustList: DataItem[] = agncTempData.data.custDetail;

  const handleAgncInfoModalOpen = () => {
    setAgncInfoModalOpen(true);
  };
  const handleAgncInfoModalClose = () => {
    setAgncInfoModalOpen(false);
  };

  const handleStatementChkModalOpen = () => {
    setStatementChkModalOpen(true);
  };
  const handleStatementChkModalClose = () => {
    setStatementChkModalOpen(false);
  };

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

                  <IconButton size="small" onClick={handleAgncInfoModalOpen}>
                    <MyIcon icon="memo" size={20} />
                  </IconButton>
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

      <ErrorContainer FallbackComponent={Fallback} sx={{ mb: 10 }}>
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>{agncData.pymnPrice ?? "-"}</Box>
                  <OutlinedButton
                    buttonName="내역 확인"
                    size="small"
                    onClick={handleStatementChkModalOpen}
                  />
                </Box>
              </TD>
              <TH sx={{ width: "15%" }}>영업 담당자</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {agncData.bsnsManagedByNm ?? "-"}
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
          onClick={() => router.push("/cust/agnc-pi-list")}
        />
        {/*<ContainedButton*/}
        {/*  buttonName="수정"*/}
        {/*  onClick={() =>*/}
        {/*    router.push("/cust/agnc-pi-modify/" + agncData.agncUkey)*/}
        {/*  }*/}
        {/*/>*/}
        <Link
          href={{
            pathname: "/cust/agnc-pi-modify",
            query: { agncUkey: agncData.agncUkey },
          }}
        >
          <ContainedButton buttonName="수정" />
        </Link>
      </Stack>

      {/* 기관 정보 모달 */}
      {agncInfoModalOpen && (
        <LazyAgncInfoModal
          open={agncInfoModalOpen}
          onClose={handleAgncInfoModalClose}
          modalWidth={800}
        />
      )}

      {/* 내역 확인 */}
      {statementChkModalOpen && (
        <LazyStatementCheckModal
          open={statementChkModalOpen}
          onClose={handleStatementChkModalClose}
          modalWidth={800}
        />
      )}
    </Container>
  );
}
