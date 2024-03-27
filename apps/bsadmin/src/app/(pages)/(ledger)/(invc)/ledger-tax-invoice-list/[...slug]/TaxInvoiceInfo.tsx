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
  transformedNullToHyphon,
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
import NoDataView from "../../../../../components/NoDataView";

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
    agncInstNm,
    agncNm,
    agncUkey,
    brno,
    bsnsMngrUkey,
    bsnsMngrNm,
    bsnsMngrVal,
    dpstDttm,
    dpstPrice,
    instNm,
    instUkey,
    invcNum,
    productDetailList,
    prcsListDetailList,
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
    tnsfPrcsListDetailList,
    tnsfPsbyPymtPrice,
    tnsfTargetAgncId,
    tnsfTargetAgncNm,
    tnsfTargetAgncUkey,
    tnsfTargetInstNm,
    tnsfTargetInstUkey,
    totalPrice,
    totalSupplyPrice,
    vat,
  } = transformedNullToHyphon(data);

  const isManager = statusCc === "BS_1902003" && pymtInfoCc === "BS_1914002";

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
                        [{agncUkey}]{agncNm}({agncInstNm})
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
                <TD sx={{ width: "35%" }}>{bsnsMngrNm}</TD>
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
                        my: 1,
                      }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>거래처명</TableCell>
                            <TableCell align="right">이관 전 금액</TableCell>
                            <TableCell align="right">처리금액</TableCell>
                            <TableCell align="right">이관 후 금액</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tnsfPrcsListDetailList.map((item, index) => {
                            const {
                              agncNm,
                              instNm,
                              invcId,
                              invcUkey,
                              postTnsfPrice,
                              prcsPrice,
                              preTnsfPrice,
                              tnsfTypeCc,
                              tnsfTypeVal,
                            } = item;
                            return (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color:
                                        tnsfTypeCc === "BS_2600001"
                                          ? "red"
                                          : "blue",
                                    }}
                                  >
                                    {tnsfTypeVal}[{invcId}]
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  {agncNm}({instNm})
                                </TableCell>
                                <TableCell align="right">
                                  {formatNumberWithCommas(preTnsfPrice)}원
                                </TableCell>
                                <TableCell align="right">
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color:
                                        Math.sign(prcsPrice) === -1
                                          ? "red"
                                          : "black",
                                    }}
                                  >
                                    {formatNumberWithCommas(prcsPrice)}원
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  {formatNumberWithCommas(postTnsfPrice)}원
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
                          {prcsListDetailList.map((item, index) => {
                            const {
                              anlsDttm,
                              anlsItstUkey,
                              anlsPrice,
                              prcs,
                              rmnPrice,
                              srvcCtgrMc,
                              srvcCtgrMcVal,
                              productDetailUkey,
                            } = item;
                            return (
                              <TableRow key={productDetailUkey}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="center">
                                  {srvcCtgrMcVal}
                                </TableCell>
                                <TableCell align="center">
                                  {anlsItstUkey}
                                </TableCell>
                                <TableCell align="right">{anlsDttm}</TableCell>
                                <TableCell align="right">
                                  {formatNumberWithCommas(anlsPrice)}원
                                </TableCell>
                                <TableCell align="right">
                                  {formatNumberWithCommas(rmnPrice)}원
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
          요청금액(총 {productDetailList.length}건)
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
              {productDetailList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Stack direction="row" justifyContent="center">
                      <MyIcon icon="nodata" size={20} />
                      <Typography variant="body2">
                        데이터가 존재하지 않습니다.
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
              {productDetailList.map(
                (
                  item: {
                    anlsTypeMc: string;
                    anlsTypeVal: string;
                    products: string;
                    sampleSize: number;
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
                    sampleSize,
                    srvcCtgrMc,
                    srvcCtgrVal,
                    supplyPrice,
                    unitPrice,
                  } = item;
                  return (
                    <TableRow key={index}>
                      <TD align="center">{index + 1}</TD>
                      <TD>{products}</TD>
                      <TD align="right">
                        {formatNumberWithCommas(sampleSize)}개
                      </TD>
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

        {pymtInfoCc !== "BS_1914004" && (
          <>
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
          </>
        )}

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
                <TD sx={{ width: pymtInfoCc === "BS_1914002" ? "15%" : null }}>
                  <Chip
                    label={statusVal}
                    size="small"
                    color={statusCc === "BS_1902002" ? "primary" : "success"}
                  />
                </TD>
                <TH sx={{ width: "15%" }}>발행일</TH>
                <TD align="right">{issuDttm}</TD>
                {pymtInfoCc === "BS_1914002" && (
                  <>
                    <TH sx={{ width: "15%" }}>세금계산서 번호</TH>
                    <TD align="right">
                      {invcNum === null ? "-" : formatBusinessRegNo(invcNum)}
                    </TD>
                  </>
                )}
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
                buttonName="발행"
                onClick={handleAccountStatementModalOpen}
              />
            )}
          </Stack>
        </Stack>
      </Container>

      {/* 계산서 발행 모달 */}
      <AccountStatementModal
        pymtInfoCc={pymtInfoCc}
        onClose={handleAccountStatementModalClose}
        open={accountStatementModalOpen}
        modalWidth={440}
      />
    </>
  );
};

export default TaxInvoiceInfo;
