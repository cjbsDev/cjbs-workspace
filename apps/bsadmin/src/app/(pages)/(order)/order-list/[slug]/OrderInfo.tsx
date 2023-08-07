"use client";
import { useRouter } from "next-nprogress-bar";
import {
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  OutlinedButton,
  Title1,
  SkeletonLoading,
  TH,
  TD,
  InputValidation,
} from "cjbsDSTM";
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { fetcher } from "api";
import fetcher from "../../../../func/fetcher";
import useSWR from "swr";
import { useParams } from "next/navigation";
import Link from "next/link";
import MyIcon from "icon/myIcon";
import {
  blue,
  yellow,
  red,
  orange,
  cyan,
  grey,
  green,
} from "cjbsDSTM/themes/color";
import dynamic from "next/dynamic";

const LazyOrderShortInfo = dynamic(() => import("./OrderShortInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={176} />,
});
const LazyAgncInfoModal = dynamic(() => import("./AgncInfoModal"), {
  ssr: false,
});
const LazyRearchInfoModal = dynamic(() => import("./RearchInfoModal"), {
  ssr: false,
});

export default function OrderInfo() {
  const params = useParams();
  const orderUkey = params.slug;
  const router = useRouter();
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/order/detail/${orderUkey}`,
    fetcher,
    {
      suspense: true,
    }
  );
  // [거래처(PI)] 모달
  const [showAgncInfoModal, setShowAgncInfoModal] = useState<boolean>(false);
  const agncInfoModalClose = () => {
    setShowAgncInfoModal(false);
  };
  // [연구책임자] 모달
  const [showRearchInfoModal, setShowRearchInfoModal] =
    useState<boolean>(false);
  const rearchInfoModalClose = () => {
    setShowRearchInfoModal(false);
  };

  // 거래처(PI) 및 신청인 정보
  const {
    agncId,
    agncNm,
    instNm,
    ordrAplctel,
    ordrAplcNm,
    ordrAplcEmail,
    agncLeaderNm,
    agncLeaderEmail,
    isSpecial,
    agncInfoDetail,
    agncLeaderInfoDetail,
  } = data.data.agncInfo;

  // 주문 정보
  const {
    intnExtrClCc,
    prjtCodeMc,
    prjtCodeNm,
    studyCodeMc,
    studyCodeNm,
    mailRcpnList,
    mailRcpnListVal,
    reqReturnList,
    reqReturnListVal,
    returnCompList,
    returnCompListVal,
    isAgncLeaderRcpn,
    isOrdrAplcRcpn,
    isEtcRcpn,
    etcEmailList,
    isDnaReturn,
    isSampleReturn,
    isDnaReturnComp,
    isSampleReturnComp,
    is16S,
    check16sAt,
    price,
  } = data.data.orderInfo;

  const {
    qcMngrId,
    qcMngrNm,
    libMngrId,
    libMngrNm,
    seqMngrId,
    seqMngrNm,
    anlsMngrId,
    anlsMngrNm,
    prjtMngrId,
    prjcMngrNm,
    bsnsMngrId,
    bsnsMngrNm,
    orderCreatorId,
    orderCreatorNm,
  } = data.data.mngrInfo;

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">오더 정보</Typography>
          <ContainedButton
            buttonName="오더 정보 변경"
            onClick={() => console.log("sssd")}
            endIcon={<MyIcon icon="cheveron-right" size={20} />}
          />
        </Stack>
      </Box>
      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyOrderShortInfo />
        </ErrorContainer>
      </Box>
      {/* 오더 */}
      <Box>
        <Typography variant="subtitle1">거래처(PI) 및 신청인 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                <TD sx={{ width: "35%" }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Box>[{agncId}]</Box>
                        <Box>
                          {agncNm} ({instNm})
                        </Box>
                        {isSpecial === "N" && (
                          <MyIcon
                            icon="vip-fill"
                            width={15}
                            data-tag="allowRowEvents"
                            color="#FFAB33"
                          />
                        )}
                      </Stack>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => setShowAgncInfoModal(true)}>
                        <MyIcon
                          icon="memo"
                          width={18}
                          data-tag="allowRowEvents"
                          color="black"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TD>
                <TH sx={{ width: "15%" }}>연구책임자</TH>
                <TD sx={{ width: "35%" }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      {agncLeaderNm} ({agncLeaderEmail})
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => setShowRearchInfoModal(true)}>
                        <MyIcon
                          icon="memo"
                          width={18}
                          data-tag="allowRowEvents"
                          color="black"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>신청인</TH>
                <TD sx={{ width: "35%" }}>
                  {ordrAplcNm} ({ordrAplcEmail})
                </TD>
                <TH sx={{ width: "15%" }}>연락처</TH>
                <TD sx={{ width: "35%" }}>{ordrAplctel}</TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">주문 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow
                sx={{ display: intnExtrClCc === null ? "none" : "table-row" }}
              >
                <TH sx={{ width: "15%" }}>과제명</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  {}
                </TD>
              </TableRow>
              <TableRow
                sx={{ display: intnExtrClCc === null ? "none" : "table-row" }}
              >
                <TH sx={{ width: "15%" }}>연구명</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  {}
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>메일 수신 설정</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  {mailRcpnListVal.length === 0
                    ? "-"
                    : mailRcpnListVal.toString()}
                  {etcEmailList !== null && etcEmailList}
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>반송 요청</TH>
                <TD sx={{ width: "35%" }}>
                  {reqReturnListVal.length === 0
                    ? "-"
                    : reqReturnListVal.toString()}
                </TD>
                <TH sx={{ width: "15%" }}>반송 여부</TH>
                <TD sx={{ width: "35%" }}>
                  {returnCompListVal.length === 0
                    ? "-"
                    : returnCompListVal.toString()}
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>16S 확인 요청</TH>
                <TD sx={{ width: "35%" }}>
                  {is16S === "Y" ? "확인요청(Y)" : "-"}
                </TD>
                <TH sx={{ width: "15%" }}>16S 확인일</TH>
                <TD sx={{ width: "35%" }}>
                  {check16sAt === null ? "-" : check16sAt}
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>오더 금액</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  {price.length === 0
                    ? "-"
                    : price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <pre>{JSON.stringify(data.data, null, 2)}</pre>
      </Box>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Link href="/order-list">
            <OutlinedButton size="small" buttonName="목록" />
          </Link>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <OutlinedButton
              size="small"
              color="secondary"
              buttonName="이전"
              startIcon={<MyIcon icon="cheveron-left" size={20} />}
            />
            <OutlinedButton
              size="small"
              color="secondary"
              buttonName="다음"
              endIcon={<MyIcon icon="cheveron-right" size={20} />}
            />
          </Stack>
        </Grid>
      </Grid>
      {/*거래처(pi) 정보 모달*/}
      <LazyAgncInfoModal
        onClose={agncInfoModalClose}
        open={showAgncInfoModal}
        modalWidth={800}
        data={agncInfoDetail}
      />
      {/* 연구책임자 정보 모달 */}
      <LazyRearchInfoModal
        onClose={rearchInfoModalClose}
        open={showRearchInfoModal}
        modalWidth={800}
        data={agncLeaderInfoDetail}
      />
    </Container>
  );
}
