import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ContainedButton, OutlinedButton, TD, TH } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";

const LazyAgncInfoModal = dynamic(() => import("./AgncInfoModal"), {
  ssr: false,
});
const LazyRearchInfoModal = dynamic(() => import("./RearchInfoModal"), {
  ssr: false,
});

const OrderTab = () => {
  // [거래처(PI)] 모달
  const [showAgncInfoModal, setShowAgncInfoModal] = useState<boolean>(false);
  // [연구책임자] 모달
  const [showRearchInfoModal, setShowRearchInfoModal] =
    useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/detail/${orderUkey}`, fetcher, {
    suspense: true,
  });

  console.log("주문 정보", data);
  // console.log("주문 정보", data.orderInfo);

  const agncInfoModalClose = () => {
    setShowAgncInfoModal(false);
  };
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
  } = data.agncInfo;

  // 주문 정보
  const {
    intnExtrClCc,
    prjtCodeMc,
    prjtCodeNm,
    prjtDetailCodeMc,
    prjtDetailCodeNm,
    prjtDetailCode,
    mailRcpnList,
    mailRcpnListVal,
    reqReturnList,
    reqReturnListVal,
    returnCompList,
    returnCompListVal,
    isAgncLeaderRcpn,
    isOrdrAplcRcpn,
    isEtcRcpn,
    addEmailList,
    isDnaReturn,
    isSampleReturn,
    isDnaReturnComp,
    isSampleReturnComp,
    is16S,
    check16sAt,
    price,
  } = data.orderInfo;

  // 담당자 정보
  const {
    prepMngrId,
    prepMngrNm,
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
  } = data.mngrInfo;

  // 주문서
  const { orshUkey, orshTypeCc, orshPath, isOrshCnct } = data;
  console.log("주문서 보기", orshUkey);

  // 메모
  const { memo } = data;
  return (
    <>
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          거래처(PI) 및 신청인 정보
        </Typography>
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
                        {isSpecial === "Y" && (
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

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="subtitle1">주문 정보</Typography>

          {orshUkey !== null && (
            <OutlinedButton
              buttonName="주문서 보기"
              size="small"
              color="secondary"
              sx={{ color: "black" }}
              endIcon={<MyIcon icon="cheveron-right" size={18} />}
              onClick={() => router.push(orshPath)}
            />
          )}
        </Stack>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow
                sx={{ display: prjtCodeNm === null ? "none" : "table-row" }}
              >
                <TH sx={{ width: "15%" }}>과제명</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  {prjtCodeNm}
                </TD>
              </TableRow>
              <TableRow
                sx={{
                  display: prjtDetailCodeNm === null ? "none" : "table-row",
                }}
              >
                <TH sx={{ width: "15%" }}>연구명</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  {prjtDetailCodeNm}
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>메일 수신 설정</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  {mailRcpnListVal.length === 0
                    ? "-"
                    : mailRcpnListVal.toString()}{" "}
                  ({addEmailList !== null && addEmailList})
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>반송 요청</TH>
                <TD sx={{ width: "35%" }}>
                  {reqReturnListVal.length === 0
                    ? "-"
                    : reqReturnListVal.toString()}
                </TD>
                <TH sx={{ width: "15%" }}>반송 완료 여부</TH>
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

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          담당자 정보
        </Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>실험 담당자</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  <Stack direction="row" spacing={0.5}>
                    <Box>{prepMngrNm === null ? "-" : prepMngrNm}(Prep),</Box>
                    <Box>{libMngrNm === null ? "-" : libMngrNm}(Lip),</Box>
                    <Box>{seqMngrNm === null ? "-" : seqMngrNm}(Seq)</Box>
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>분석 담당자</TH>
                <TD sx={{ width: "35%" }}>
                  {anlsMngrNm === null ? "-" : anlsMngrNm}
                </TD>
                <TH sx={{ width: "15%" }}>과제 담당자</TH>
                <TD sx={{ width: "35%" }}>
                  {prjcMngrNm === null ? "-" : prjcMngrNm}
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>영업 담당자</TH>
                <TD sx={{ width: "35%" }}>
                  {bsnsMngrNm === null ? "-" : bsnsMngrNm}
                </TD>
                <TH sx={{ width: "15%" }}>오더 등록자</TH>
                <TD sx={{ width: "35%" }}>
                  {orderCreatorNm === null ? "-" : orderCreatorNm}
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          메모
        </Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>메모</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  {memo}
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
    </>
  );
};

export default OrderTab;
