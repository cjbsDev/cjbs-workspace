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
  IconButton,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import { fetcher } from "api";
import AgncDetailInfo from "../../../../components/AgncDetailInfo";

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

const LazyAgncInfoModal = dynamic(() => import("./AgncInfoModal"), {
  ssr: false,
});

export default function QttnPage() {
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
  } = useSWR(`/qttn/${slug}`, fetcher);
  if (isLoading) {
    return <SkeletonLoading />;
  }
  console.log("getDataObjInfo", getDataObj);
  const { basicInfo } = getDataObj;

  //setSelectedMembers(getDataObj.custDetail);

  const handleAgncInfoModalOpen = () => {
    setAgncInfoModalOpen(true);
  };
  const handleAgncInfoModalClose = () => {
    setAgncInfoModalOpen(false);
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

  const formatNumber = (number: number | string) => {
    if (number === undefined || number === null) {
      return number; // undefined나 null일 경우 빈 문자열 반환
    }
    const num = typeof number === "string" ? parseFloat(number) : number;
    if (isNaN(num)) {
      return number; // 숫자로 변환할 수 없는 경우 빈 문자열 반환
    }

    return num.toLocaleString();
  };

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="견적서 정보" />
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
                {getDataObj.basicInfo.qttnNo ?? "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>유형</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.basicInfo.qttnTypeCc ?? "-"}
              </TD>

              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {/*<Box sx={{ display: "flex", justifyContent: "space-between" }}>*/}
                  <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
                    {getDataObj.basicInfo.agncInstNm ?? "-"}
                    {/*<IconButton size="small" onClick={handleAgncInfoModalOpen}>*/}
                    {/*  <MyIcon icon="memo" size={20} />*/}
                    {/*</IconButton>*/}
                    {basicInfo.isExist === 'Y' && (
                      <AgncDetailInfo agncUkey={basicInfo.agncUkey} />
                    )}
                  </Stack>
                {/*</Box>*/}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>견적일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.basicInfo.qttnDate ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>견적담당</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.basicInfo.bsnsMngrNm ?? "-"}
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
              <TH sx={{ width: "15%" }}>소속</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.rcvInfo.rcvInstNm ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>성명</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.rcvInfo.rcvNm ?? "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>연락처</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.rcvInfo.rcvTel ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>유효기간</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.rcvInfo.validPerd ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyListProd productDetailList={getDataObj.qttnProdutsDetailRes} />
      </ErrorContainer>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>총 공급가액</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.productInfo.totalSupplyPrice
                  ? formatNumber(getDataObj.productInfo.totalSupplyPrice)
                  : "-"}
              </TD>
              <TH sx={{ width: "15%" }}>부가세</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.productInfo.vat
                  ? formatNumber(getDataObj.productInfo.vat)
                  : "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>합계금액</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {getDataObj.productInfo.totalPrice
                  ? formatNumber(getDataObj.productInfo.totalPrice)
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
                {getDataObj.sendInfo.sendStatusVal ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>발송일시</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.sendInfo.sendDttm ?? "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>작성자</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.sendInfo.wdtNm ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>등록일시</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getDataObj.sendInfo.createDate ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/orsh-qttn-list/")}
        />
        {getDataObj.sendInfo.sendStatusCc === 'BS_2402001' ? (
          <ContainedButton
            color={"success"}
            size="small"
            buttonName="견적서 발송"
            onClick={() => preveiwModalOpen("N")}
          />
        ) : (
          <ContainedButton
            color={"success"}
            size="small"
            buttonName="견적서 재발송"
            onClick={() => preveiwModalOpen("Y")}
          />
        )}
        {getDataObj.sendInfo.sendStatusCc === 'BS_2402001' && getDataObj.isUpdated === 'Y' && (
          <Link
            href={{
              pathname: "/orsh-qttn-modify",
              query: { qttnUkey: slug },
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
            wdtDate={getDataObj.basicInfo.qttnDate}
            conm={getDataObj.rcvInfo.rcvInstNm}
            nm={getDataObj.rcvInfo.rcvNm}
            resendType={resendType}
        />
      </ErrorContainer>
      {/* 기관 정보 모달 */}
      {agncInfoModalOpen && (
        <LazyAgncInfoModal
          open={agncInfoModalOpen}
          onClose={handleAgncInfoModalClose}
          modalWidth={800}
        />
      )}
    </Container>
  );
}
