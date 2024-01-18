import React from "react";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { OutlinedButton, TD, TH } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import AgncDetailInfo from "../../../../../components/AgncDetailInfo";
import RearchDetailInfo from "../../../../../components/RearchDetailInfo";

const OrderTab = () => {
  const router = useRouter();
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/detail/${orderUkey}`, fetcher, {
    suspense: true,
  });

  console.log("주문 정보", data);

  // 거래처(PI) 및 신청인 정보
  const {
    agncId,
    agncNm,
    agncUkey,
    instNm,
    ordrAplctel,
    ordrAplcNm,
    ordrAplcEmail,
    agncLeaderNm,
    agncLeaderEmail,
    agncLeaderUkey,
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
                      <AgncDetailInfo agncUkey={agncUkey} />
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
                      <RearchDetailInfo agncLeaderUkey={agncLeaderUkey} />
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
              onClick={() => router.push(orshPath + "?from=order-list")}
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
                  원
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
    </>
  );
};

export default OrderTab;
