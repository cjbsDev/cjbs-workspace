"use client";

import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "api";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  formatBusinessRegNo,
  formatNumberWithCommas,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";
import RmnPymtDetailBtn from "../components/RmnPymtDetailBtn";
import { useRecoilState } from "recoil";
import { rmnPriceDetailShowInfoAtom } from "../atom";
import Link from "next/link";
import AccountStatementModal from "../components/AccountStatementModal";
import AdminPublishInfoModify from "../components/AdminPublishInfoModify";
import PublishCancelBtn from "../components/PublishCancelBtn";
import ModifyBtn from "../components/ModifyBtn";
import DeleteBtn from "../components/DeleteBtn";
import AgncDetailInfo from "../../../../../components/AgncDetailInfo";

const LazyRmnPymtPriceDetail = dynamic(
  () => import("./../components/RmnPymtPriceDetail"),
  {
    ssr: false,
    loading: () => (
      <Stack direction="row" justifyContent="center" spacing={1}>
        <Typography variant="body2" color="secondary">
          Loading...
        </Typography>
        <CircularProgress size={20} />
      </Stack>
    ),
  },
);

const TaxInvoiceInfo = () => {
  const [accountStatementModalOpen, setAccountStatementModalOpen] =
    useState<boolean>(false);
  const [show, setShow] = useRecoilState(rmnPriceDetailShowInfoAtom);
  const params = useParams();
  const ukey = params.slug;
  const { data } = useSWR(`/invc/${ukey}`, fetcher, {
    suspense: true,
  });
  console.log("INVOICE INIT DATA", data);
  const {
    agncId,
    agncNm,
    agncUkey,
    brno,
    bsnsMngrUkey,
    bsnsMngrVal,
    dpstDttm,
    dpstPrice,
    instNm,
    instUkey,
    invcNum,
    invcProductDetailList,
    invcUkey,
    isSpecialMng,
    issuDttm,
    memo,
    pymtInfoCc,
    pymtInfoVal,
    pymtMngrNm,
    pyrNm,
    rcvEmail,
    report,
    rmnPymtPrice,
    rprsNm,
    statusCc,
    statusVal,
    tnsfPsbyPymtPrice,
    tnsfTargetAgncId,
    tnsfTargetAgncNm,
    tnsfTargetAgncUkey,
    tnsfTargetInstNm,
    tnsfTargetInstUkey,
    totalPrice,
    totalSupplyPrice,
    vat,
  } = data;

  const isManager =
    statusCc === "BS_1902003" &&
    (pymtInfoCc === "BS_1914002" || pymtInfoCc === "BS_1914004");

  const handleAccountStatementModalOpen = useCallback(() => {
    setAccountStatementModalOpen(true);
  }, []);

  const handleAccountStatementModalClose = useCallback(() => {
    setAccountStatementModalOpen(false);
  }, []);

  return (
    <>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box sx={{ mb: 4 }}>
          <Title1
            titleName={`세금계산서 발행 ${
              statusCc === "BS_1902002" ? "요청" : ""
            }`}
          />
        </Box>

        <Typography variant="subtitle1">거래처(PI) 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                <TD sx={{ width: "35%" }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={1}>
                      <Typography variant="body2">
                        [{agncUkey}]{agncNm}({instNm})
                      </Typography>
                      {isSpecialMng === "Y" && (
                        <MyIcon
                          icon="vip-fill"
                          width={15}
                          data-tag="allowRowEvents"
                          color="#FFAB33"
                        />
                      )}
                    </Stack>

                    <AgncDetailInfo agncUkey={agncUkey} />
                  </Stack>
                </TD>
                <TH sx={{ width: "15%" }}>영업 담당자</TH>
                <TD sx={{ width: "35%" }}>{bsnsMngrVal}</TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">결제 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>결제구분</TH>
                <TD sx={{ width: "85%" }}>{pymtInfoVal}</TD>
              </TableRow>

              {pymtInfoCc !== "BS_1914004" && statusCc === "BS_1902002" && (
                <TableRow>
                  <TH sx={{ width: "15%" }}>남은금액</TH>
                  <TD>
                    <Stack direction="row" justifyContent="space-between">
                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="flex-end"
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: cjbsTheme.palette.warning.main }}
                        >
                          {formatNumberWithCommas(rmnPymtPrice)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: cjbsTheme.palette.warning.main }}
                        >
                          원
                        </Typography>
                      </Stack>

                      <RmnPymtDetailBtn rmnPymtPrice={rmnPymtPrice} />
                    </Stack>

                    {show && (
                      <ErrorContainer FallbackComponent={Fallback}>
                        <LazyRmnPymtPriceDetail
                          agncUkey={agncUkey}
                          pymtInfoCc={pymtInfoCc}
                        />
                      </ErrorContainer>
                    )}
                  </TD>
                </TableRow>
              )}

              {pymtInfoCc === "BS_1914004" && statusCc !== "BS_1902003" && (
                <>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>이관 가능 금액</TH>
                    <TD sx={{ width: "85%" }} colSpan={5}>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing={0.5}>
                          <Typography
                            variant="body2"
                            sx={{ color: cjbsTheme.palette.warning.main }}
                          >
                            {formatNumberWithCommas(tnsfPsbyPymtPrice)}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: cjbsTheme.palette.warning.main }}
                          >
                            원
                          </Typography>
                        </Stack>
                        <RmnPymtDetailBtn rmnPymtPrice={tnsfPsbyPymtPrice} />
                      </Stack>

                      {show && (
                        <ErrorContainer FallbackComponent={Fallback}>
                          <LazyRmnPymtPriceDetail
                            agncUkey={invcUkey}
                            pymtInfoCc={pymtInfoCc}
                          />
                        </ErrorContainer>
                      )}
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>이관 대상</TH>
                    <TD sx={{ width: "85%" }} colSpan={3}>
                      <Stack direction="row" spacing={0.2} alignItems="center">
                        <Typography variant="body2">
                          [{tnsfTargetAgncUkey}]
                        </Typography>
                        <Typography variant="body2">
                          {tnsfTargetAgncNm}
                        </Typography>
                        <Typography variant="body2">
                          ({tnsfTargetInstNm})
                        </Typography>
                      </Stack>
                    </TD>
                  </TableRow>
                </>
              )}

              {pymtInfoCc === "BS_1914004" && statusCc === "BS_1902003" && (
                <TableRow>
                  <TH sx={{ width: "15%" }}>처리 내역</TH>
                  <TD sx={{ width: "85%" }} colSpan={3}>
                    <TableContainer
                      sx={{
                        border: `1px solid ${cjbsTheme.palette.grey["300"]}`,
                        mt: 2,
                      }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="center">상태</TableCell>
                            <TableCell align="center">거래처명</TableCell>
                            <TableCell align="right">이관 전 금액</TableCell>
                            <TableCell align="right">처리금액</TableCell>
                            <TableCell align="right">이관 후 금액</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow></TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TD>
                </TableRow>
              )}

              {pymtInfoCc !== "BS_1914004" && statusCc === "BS_1902003" && (
                <TableRow>
                  <TH sx={{ width: "15%" }}>처리 내역</TH>
                  <TD sx={{ width: "85%" }} colSpan={3}>
                    <TableContainer
                      sx={{
                        border: `1px solid ${cjbsTheme.palette.grey["300"]}`,
                        mt: 2,
                      }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="center">서비스 분류</TableCell>
                            <TableCell align="center">분석 내역서</TableCell>
                            <TableCell align="right">분석일</TableCell>
                            <TableCell align="right">분석비용</TableCell>
                            <TableCell align="right">남은금액</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow></TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TD>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">
          요청금액(총 {invcProductDetailList.length}건)
        </Typography>
        <TableContainer sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TH sx={{ width: "60px" }} align="center">
                  No
                </TH>
                <TH>품목</TH>
                <TH sx={{ width: "100px" }} align="right">
                  수량
                </TH>
                <TH sx={{ width: "200px" }} align="right">
                  단가
                </TH>
                <TH sx={{ width: "200px" }} align="right">
                  공급가액
                </TH>
              </TableRow>
            </TableHead>
            <TableBody>
              {invcProductDetailList.map(
                (
                  item: {
                    anlsTypeMc: string;
                    anlsTypeVal: string;
                    products: string;
                    qnty: number;
                    srvcCtgrMc: string;
                    srvcCtgrVal: string;
                    supplyPrice: number;
                    unitPrice: number;
                  },
                  index: number,
                ) => {
                  const {
                    anlsTypeMc,
                    anlsTypeVal,
                    products,
                    qnty,
                    srvcCtgrMc,
                    srvcCtgrVal,
                    supplyPrice,
                    unitPrice,
                  } = item;
                  return (
                    <TableRow>
                      <TD align="center">{index + 1}</TD>
                      <TD>{products}</TD>
                      <TD align="right">{formatNumberWithCommas(qnty)}개</TD>
                      <TD align="right">
                        {formatNumberWithCommas(unitPrice)}원
                      </TD>
                      <TD align="right">
                        {formatNumberWithCommas(supplyPrice)}원
                      </TD>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>총 공급가액</TH>
                <TD align="right">
                  <Stack
                    direction="row"
                    spacing={0.5}
                    justifyContent="flex-end"
                  >
                    <Typography variant="body2">
                      {formatNumberWithCommas(totalSupplyPrice)}
                    </Typography>
                    <Typography variant="body2">원</Typography>
                  </Stack>
                </TD>
                <TH sx={{ width: "15%" }}>부가세</TH>
                <TD align="right">
                  <Stack
                    direction="row"
                    spacing={0.5}
                    justifyContent="flex-end"
                  >
                    <Typography variant="body2">
                      {formatNumberWithCommas(vat)}
                    </Typography>
                    <Typography variant="body2">원</Typography>
                  </Stack>
                </TD>
                <TH sx={{ width: "15%" }}>합계금액</TH>
                <TD align="right">
                  <Stack
                    direction="row"
                    spacing={0.5}
                    justifyContent="flex-end"
                  >
                    <Typography variant="body2">
                      {formatNumberWithCommas(totalPrice)}
                    </Typography>
                    <Typography variant="body2">원</Typography>
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">발행처 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>기관명(상호)</TH>
                <TD colSpan={3}>{instNm}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>대표자명</TH>
                <TD sx={{ width: "35%" }}>{rprsNm}</TD>
                <TH sx={{ width: "15%" }}>사업자등록번호</TH>
                <TD align="right">{formatBusinessRegNo(brno)}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>결제 담당</TH>
                <TD>{pymtMngrNm}</TD>
                <TH sx={{ width: "15%" }}>이메일</TH>
                <TD>{rcvEmail}</TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1">발행 정보</Typography>

          {/* 부서 관리자만 가능 권한 로직 추가 */}
          {isManager && <AdminPublishInfoModify />}
        </Stack>

        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>상태</TH>
                <TD>
                  <Chip
                    label={statusVal}
                    size="small"
                    color={statusCc === "BS_1902002" ? "primary" : "success"}
                  />
                </TD>
                <TH sx={{ width: "15%" }}>발행일</TH>
                <TD align="right">{issuDttm}</TD>
                <TH sx={{ width: "15%" }}>세금계산서 번호</TH>
                <TD align="right">
                  {invcNum === null ? "-" : formatBusinessRegNo(invcNum)}
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
                  <Box sx={{ whiteSpace: "pre-wrap" }}>{memo}</Box>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">보고서</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>보고서</TH>
                <TD
                  sx={{
                    width: "85%",
                  }}
                >
                  <Box sx={{ whiteSpace: "pre-wrap" }}>{report}</Box>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={0.5} justifyContent="space-between">
          <Link href="/ledger-tax-invoice-list">
            <OutlinedButton size="small" buttonName="목록" />
          </Link>

          <Stack direction="row" spacing={0.5}>
            {pymtInfoCc !== "BS_1914004" && statusCc === "BS_1902002" && (
              <ModifyBtn
                invcUkey={invcUkey}
                agncUkey={agncUkey}
                issuDttm={issuDttm}
              />
            )}

            {statusCc === "BS_1902002" && <DeleteBtn />}

            {statusCc === "BS_1902003" && <PublishCancelBtn />}

            {statusCc === "BS_1902002" && (
              <ContainedButton
                size="small"
                buttonName="계산서 발행"
                onClick={handleAccountStatementModalOpen}
              />
            )}
          </Stack>
        </Stack>
      </Container>

      {/* 계산서 발행 모달 */}
      <AccountStatementModal
        onClose={handleAccountStatementModalClose}
        open={accountStatementModalOpen}
        modalWidth={440}
      />
    </>
  );
};

export default TaxInvoiceInfo;