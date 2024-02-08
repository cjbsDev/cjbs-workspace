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
import { useParams, useRouter } from "next/navigation";
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
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import { useForm, FormProvider } from "react-hook-form";
import { fetcher } from "api";

const LazyListProd = dynamic(() => import("./ProdList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

// 미리보기
const LazyPreviewModal = dynamic(
  () => import("./PreviewModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

export default function AgncPage() {
  // init
  const params = useParams();
  const { slug } = params;
  const router = useRouter();
  const [agncInfoModalOpen, setAgncInfoModalOpen] = useState<boolean>(false);
  // [미리 보기] 모달
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [resendType, setResendType] = useState<String>("N");

  // load
  const {
    data: getDataObj,
    error,
    isLoading,
  } = useSWR(`/tdst/${slug}`, fetcher);
  if (isLoading) {
    return <SkeletonLoading />;
  }

  console.log("tdstData", getDataObj);
  //setSelectedMembers(getDataObj.custDetail);

  const handleAgncInfoModalOpen = () => {
    setAgncInfoModalOpen(true);
  };
  const handleAgncInfoModalClose = () => {
    setAgncInfoModalOpen(false);
  };
  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  // [ 미리보기 ] 모달 오픈
  const preveiwModalOpen = (resendType: string) => {
    setResendType(resendType)
    setShowPreviewModal(true);
  };

  // [ 미리보기 ] 모달 닫기
  const preveiwModalClose = () => {
    setShowPreviewModal(false);
  };

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="거래명세서 정보" />
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
              <TH sx={{ width: "15%" }}>번호</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {getDataObj.tdstNo ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>유형</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.tdstTypeVal ?? "-"}
              </TD>

              <TH sx={{ width: "15%" }}>거래처(PI)</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    [{getDataObj.agncId}] {getDataObj.agncNm ?? "-"}
                    {getDataObj.isSpecialMng === "Y" && (
                      <MyIcon
                        data-tag="allowRowEvents"
                        icon="vip-fill"
                        size={20}
                        color="#FFAB33"
                      />
                    )}
                    <Box>
                      {getDataObj.instNm ? "(" + getDataObj.instNm + ")" : "-"}
                    </Box>
                    <IconButton size="small" onClick={handleAgncInfoModalOpen}>
                      <MyIcon icon="memo" size={20} />
                    </IconButton>
                  </Stack>
                </Box>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>작성일</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.wdtDate ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>영업담당</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.bsnsMngrNm ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1">공급받는자 정보</Typography>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>상호</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.conm ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>성명</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.nm ?? "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>연락처</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.tel ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>비고</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.memo ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyListProd productDetailList={getDataObj.productDetailList} />
      </ErrorContainer>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>총 공급가액</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.totalSupplyPrice
                  ? formatNumber(getDataObj.totalSupplyPrice)
                  : "-"}
              </TD>
              <TH sx={{ width: "15%" }}>부가세</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.vat ? formatNumber(getDataObj.vat) : "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>합계금액</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {getDataObj.totalPrice
                  ? formatNumber(getDataObj.totalPrice)
                  : "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1">등록 및 발송 정보</Typography>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>발송상태</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.sendStatusVal ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>발송일시</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.sendDttm ?? "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>작성자</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.wdtNm ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>등록일시</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.createdDttm ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/ledger-ts-list/")}
        />
        {getDataObj.sendStatusCc === 'BS_2302001' ? (
          <ContainedButton
            color={"success"}
            size="small"
            buttonName="거래명세서 발송"
            onClick={() => preveiwModalOpen("N")}
          />
        ) : (
          <ContainedButton
              color={"success"}
              size="small"
              buttonName="거래명세서 재발송"
              onClick={() => preveiwModalOpen("Y")}
          />
        )}
        {getDataObj.sendStatusCc === 'BS_2302001' && (
          <Link
              href={{
                pathname: "/ledger-ts-modify",
                query: { tdstUkey: getDataObj.tdstUkey },
              }}
          >
            <ContainedButton buttonName="수정" />
          </Link>
        )}

      </Stack>

      {/* 미리보기 & 발송 모달*/}
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyPreviewModal
          open={showPreviewModal}
          onClose={preveiwModalClose}
          // modalWidth={995}
          modalWidth={1173}
          wdtDate={getDataObj.wdtDate}
          conm={getDataObj.conm}
          nm={getDataObj.nm}
          sendStatusCc={getDataObj.sendStatusCc}
          resendType={resendType}
        />
      </ErrorContainer>

      {/* 기관 정보 모달
      {agncInfoModalOpen && (
        <LazyAgncInfoModal
          open={agncInfoModalOpen}
          onClose={handleAgncInfoModalClose}
          modalWidth={800}
        />
      )}
       */}

      {/* 내역 확인
      {statementChkModalOpen && (
        <LazyStatementCheckModal
          open={statementChkModalOpen}
          onClose={handleStatementChkModalClose}
          modalWidth={800}
        />
      )}
       */}
    </Container>
  );
}
