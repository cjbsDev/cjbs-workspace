"use client";

import React, { useCallback, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { DELETE, fetcher } from "api";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AlertModal,
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
import LoadingSvg from "public/svg/loading_wh.svg";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import AccountStatementModal from "../components/AccountStatementModal";
import RmnPrePymtPrice from "../../tax-invoice-reg/components/RmnPrePymtPrice";
import AdminPublishInfoModify from "../components/AdminPublishInfoModify";
import PublishCancelBtn from "../components/PublishCancelBtn";
import ModifyBtn from "../components/ModifyBtn";
// import dayjs from "dayjs";

// const currentDate = dayjs(new Date()).format("YYYY-MM-DD");

const LazyRmnPymtPriceDetail = dynamic(
  () => import("./../components/RmnPymtPriceDetail"),
  {
    ssr: false,
    loading: () => (
      <Stack direction="row" justifyContent="center">
        <CircularProgress disableShrink size={20} sx={{ p: 1 }} />
      </Stack>
    ),
  },
);

const LazyAgncInfoModal = dynamic(
  () => import("../../../../../components/AgncInfoModal"),
  {
    ssr: false,
  },
);

const TaxInvoiceInfo = () => {
  const [showAgncInfoModal, setShowAgncInfoModal] = useState<boolean>(false);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [accountStatementModalOpen, setAccountStatementModalOpen] =
    useState<boolean>(false);
  const [subAlertMsg, setSubAlertMsg] = useState("");
  const [show, setShow] = useRecoilState(rmnPriceDetailShowInfoAtom);
  const router = useRouter();
  const params = useParams();
  const ukey = params.slug;
  console.log(ukey);
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

  const handleInvcDelete = async (invcUkey: string) => {
    try {
      const res = await DELETE(`/invc/${invcUkey}`);
      console.log("Response", res);
      if (res.success) {
        router.push("/tax-invoice-list");
      } else {
        setSubAlertMsg(res.message);
        // toast(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      // setIsLoading(false);
      // setIsDisabled(true);
    }
  };

  const handleAccountStatementModalOpen = useCallback(() => {
    setAccountStatementModalOpen(true);
  }, []);

  const handleAccountStatementModalClose = useCallback(() => {
    setAccountStatementModalOpen(false);
  }, []);

  const handleAlertOpen = useCallback(() => {
    setAlertModalOpen(true);
  }, []);

  const handleAlertClose = () => {
    setAlertModalOpen(false);
    setSubAlertMsg("");
  };

  const agncInfoModalClose = () => {
    setShowAgncInfoModal(false);
  };
  // const handleDelete = async () => {
  //   console.log("RRRRRRRRRRR", sampleUkeyList);
  //   if (sampleUkeyList.length === 0) toast("샘플을 선책해 주세요.");
  //
  //   const body = {
  //     sampleUkeyList: sampleUkeyList,
  //   };
  //   try {
  //     const res = await DELETE(`/run/delete/${ukey}`, body);
  //     console.log("Delete 성공 여부", res.success);
  //
  //     if (res.success) {
  //       mutate(`/run/sample/${ukey}?page=1&size=20`);
  //       handleAlertClose();
  //       toast("삭제 되었습니다.");
  //     } else {
  //       toast(res.message);
  //     }
  //   } catch (error: any) {
  //     console.error(
  //       "샘플 삭제 오류>>>>",
  //       error.response?.data?.data || error.message,
  //     );
  //   } finally {
  //     setToggleClearRows(!toggledClearRows);
  //   }
  // };

  return (
    <>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box sx={{ mb: 4 }}>
          <Title1
            titleName={`세금계산서 발행 ${statusVal === "요청" ? "요청" : ""}`}
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

                    <IconButton onClick={() => setShowAgncInfoModal(true)}>
                      <MyIcon
                        icon="memo"
                        width={18}
                        data-tag="allowRowEvents"
                        color="black"
                      />
                    </IconButton>
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

              {pymtInfoCc !== "BS_1914004" && (
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
                        <LazyRmnPymtPriceDetail agncUkey={instUkey} />
                      </ErrorContainer>
                    )}
                  </TD>
                </TableRow>
              )}

              {pymtInfoCc === "BS_1914004" && (
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
                            agncUkey={tnsfTargetAgncUkey}
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
              {invcProductDetailList.map((item, index) => {
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
                    <TD align="right">{formatNumberWithCommas(unitPrice)}원</TD>
                    <TD align="right">
                      {formatNumberWithCommas(supplyPrice)}원
                    </TD>
                  </TableRow>
                );
              })}
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
          <AdminPublishInfoModify />
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
                    color={statusVal === "요청" ? "primary" : "success"}
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
          <Link href="/tax-invoice-list">
            <OutlinedButton size="small" buttonName="목록" />
          </Link>

          <Stack direction="row" spacing={0.5}>
            {pymtInfoCc !== "BS_1914004" && (
              <ModifyBtn
                invcUkey={invcUkey}
                agncUkey={agncUkey}
                issuDttm={issuDttm}
              />
            )}

            {pymtInfoCc === "BS_1914002" && statusVal === "발행" ? null : (
              <ContainedButton
                buttonName="삭제"
                color="error"
                onClick={handleAlertOpen}
                size="small"
              />
            )}

            {pymtInfoCc === "BS_1914002" && statusVal === "발행" && (
              <PublishCancelBtn />
            )}

            {pymtInfoCc === "BS_1914002" && statusVal === "요청" ? (
              <ContainedButton
                size="small"
                buttonName="계산서 발행"
                onClick={handleAccountStatementModalOpen}
              />
            ) : null}
          </Stack>
        </Stack>
      </Container>

      <AlertModal
        onClose={handleAlertClose}
        alertMainFunc={() => handleInvcDelete(invcUkey)}
        open={alertModalOpen}
        mainMessage="삭제를 진행하시겠습니까?"
        subMessage={subAlertMsg}
        alertBtnName="삭제"
      />

      {/*거래처(pi) 정보 모달*/}
      <LazyAgncInfoModal
        onClose={agncInfoModalClose}
        open={showAgncInfoModal}
        modalWidth={800}
      />

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
