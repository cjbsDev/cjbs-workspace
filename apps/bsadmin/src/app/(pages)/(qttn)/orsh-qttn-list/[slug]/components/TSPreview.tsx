import React, { forwardRef } from "react";
import {
  formatNumberWithCommas,
  OutlinedButton,
  TH,
  TD, SkeletonLoading, cjbsTheme,
} from "cjbsDSTM";
import {
  Box,
  BoxProps, Chip,
  Grid,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import Image from 'next/image';
import CJLogo from '../../../../../../../public/svg/cj_bk_1.svg';
import {useFormContext, useWatch} from "react-hook-form";
import {geKoreanNumber} from "cjbsDSTM/commonFunc/geKoreanNumber";
import {fetcher} from "api";
import {useParams} from "next/navigation";
import useSWR from "swr";
import "./print.css";
import {toast} from "react-toastify";
import success = toast.success;

const TSPreview = forwardRef((props, ref) => {
  // const { getValues, control, watch } = useFormContext();
  const params = useParams();
  const { slug } = params;

  // data load
  const { data: qttnData } = useSWR(`/qttn/${slug}`, fetcher);
  console.log("qttnData", qttnData);
  const totalSupplyPrice = formatNumberWithCommas(qttnData.productInfo.totalSupplyPrice);
  const vat = formatNumberWithCommas(qttnData.productInfo.vat);
  const totalPrice = formatNumberWithCommas(qttnData.productInfo.totalPrice);
  const totalPriceKr = geKoreanNumber(qttnData.productInfo.totalPrice);
  const productValue = qttnData.qttnProdutsDetailRes;
  const pymtInfo = qttnData.pymtInfo;
  const basicInfo = qttnData.basicInfo;

  // data load 공급자정보
  const { data:sprAndDpstInfo, error, isLoading, } = useSWR(`/tdst/sprAndDpstInfo`, fetcher);
  if (isLoading) {
    return <SkeletonLoading />;
  }
  // console.log("sprAndDpstInfo", sprAndDpstInfo);
  const {dpstInfo, sprInfo} = sprAndDpstInfo;

  return (

    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="start"
      sx={{
        bgcolor: '#ffffff',
        width: '773px',
        height: '1094px',
        // border: '1px solid #000000',
        position: "relative",
      }}
      // className="printArea"
      ref={ref}
    >
      <Grid
        container
        sx={{ p: 2, mb: 5 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "start" }}>
          {/*<Box sx={{width: 130, height: 40}}>*/}
          {/*  /!*<Image className="imgLogo" src={CJLogo} alt='CJ바이오사이언스' quality={100} height={100} width={40}/>*!/*/}
          {/*  <img src="../../../../../../../public/img/logo/CJ_Bioscience_logo.png" alt="CJ바이오사이언스"/>*/}
          {/*</Box>*/}
          <Box sx={{
            width: 132,
            height: 40,
            backgroundImage: `url(/svg/cj_bk_1.svg)`,
            // backgroundPosition: "top left, top right, bottom left 130px",
            backgroundSize: "130px, 40px",
            backgroundRepeat: "no-repeat",
          }} />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mb:2 }}>
          <CJFontTitleBox>견 적 서</CJFontTitleBox>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <CJFontBodyBox>Date.&nbsp;</CJFontBodyBox>
          <CJFontBodyBox>{basicInfo.qttnDate}</CJFontBodyBox>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }} mb={1}>
          <TableContainer sx={{ mt: 0.5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "50%", height: "28px", p:0 }} colSpan={4} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontHeaderBox>공 급 자</CJFontHeaderBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "50%", height: "28px", p:0 }} colSpan={2} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontHeaderBox>공 급 받 는 자</CJFontHeaderBox>
                    </Stack>
                  </TH>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>등 록 번 호</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "28px", p:0 }} colSpan={3} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox>{sprInfo.sprAcsn}</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>소 속</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "28px", p:0, paddingX: 1 }} colSpan={1} align="center">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                        <CJFontTdBox>{qttnData.rcvInfo.rcvInstNm}</CJFontTdBox>
                      </Stack>
                      <CJFontTdBox>귀중</CJFontTdBox>
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>상 호</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "15%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox>{sprInfo.sprConm}</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>성 명</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "15%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox>{sprInfo.sprNm}</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>성 명</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "28px", p:0, paddingX: 1 }} align="center">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                        <CJFontTdBox>{qttnData.rcvInfo.rcvNm}</CJFontTdBox>
                      </Stack>
                      <CJFontTdBox> 님</CJFontTdBox>
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>주 소</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "28px", p:0 }} colSpan={3} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox sx={{fontSize:11}}>{sprInfo.sprAddr}</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>전 화</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "28px", p:0 }} colSpan={1} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox>{qttnData.rcvInfo.rcvTel}</CJFontTdBox>
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>전 화</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "28px", p:0 }} colSpan={3} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox>{sprInfo.sprTel}</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "28px", p:0  }} align="center">
                    <CJFont500TdBox>유효기간</CJFont500TdBox>
                  </TD>
                  <TD sx={{ width: "10%", height: "28px", p:0  }} colSpan={1} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox>견적일로 부터 </CJFontTdBox><CJFontTdBox>{qttnData.rcvInfo.validPerd}</CJFontTdBox><CJFontTdBox> 일</CJFontTdBox>
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              borderTop: "1px solid var(--gray-Gray-700, #495056)",
              borderBottom: "1px solid var(--gray-Gray-700, #495056)",
              background: "#E9ECEF",
              height: 28,
              paddingX: 4,
            }}
          >
            <CJFontHeaderBox>합계금액 (공급가액 + 부가세) : </CJFontHeaderBox>
            <CJFont500TdBox>일 금</CJFont500TdBox>
            <CJFontHeaderBox>{totalPriceKr}</CJFontHeaderBox>
            <CJFont500TdBox>원 정</CJFont500TdBox>
            <CJFontHeaderBox>₩ {totalPrice}</CJFontHeaderBox>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "50%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>품 명</CJFont500TdBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >수 량</CJFont500TdBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >단 위</CJFont500TdBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "10%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >단 가</CJFont500TdBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "20%", height: "28px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >금 액</CJFont500TdBox>
                    </Stack>
                  </TH>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "100%", borderBottom: 0, p:0 }} colSpan={5}>
                    <Box sx={{ minHeight: "420px", maxHeight: "420px" }}>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            {productValue.map((item: any) => {
                              return (
                                <TableRow key={item.productDetailUkey}>
                                  <TD sx={{ width: "50%", border: 0, p:0, minHeight:'28px', mt:10 }}>
                                    <Box sx={{mt:2}}>
                                      <Stack spacing={1} alignItems="flex-start" justifyContent="flex-start" sx={{pl:1}}>
                                        <CJFontTdBox>{item.product}</CJFontTdBox>
                                        <Box sx={{padding: "0px 10px 10px 12px"}}>
                                          <CJFontTdBox sx={{whiteSpace:'break-spaces', lineHeight: "19px", }}>{item.inclMemo}</CJFontTdBox>
                                        </Box>
                                      </Stack>
                                    </Box>
                                  </TD>
                                  <TD sx={{ width: "10%", border: 0, p:0, minHeight:'28px' }}>
                                    <Box>
                                      <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                                        <CJFontTdBox>{item.sampleSize}</CJFontTdBox>
                                      </Stack>
                                    </Box>
                                  </TD>
                                  <TD sx={{ width: "10%", border: 0, p:0, minHeight:'28px' }}>
                                    <Box>
                                      <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                                        <CJFontTdBox>ea</CJFontTdBox>
                                      </Stack>
                                    </Box>
                                  </TD>
                                  <TD sx={{ width: "10%", border: 0, p:0, minHeight:'28px' }}>
                                    <Box>
                                      <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                                        <CJFontTdBox>{formatNumberWithCommas(item.unitPrice)}</CJFontTdBox>
                                      </Stack>
                                    </Box>
                                  </TD>
                                  <TD sx={{ width: "20%", border: 0, p:0, minHeight:'28px' }}>
                                    <Box>
                                      <Stack spacing={1} alignItems="end" justifyContent="flex-start" sx={{pr:1}}>
                                        <CJFontTdBox>{formatNumberWithCommas(item.supplyPrice)}</CJFontTdBox>
                                      </Stack>
                                    </Box>
                                  </TD>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} mb={2}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "80%", height: "28px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                      <CJFontHeaderBox >공급가액</CJFontHeaderBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "20%", height: "28px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="end" justifyContent="flex-start" sx={{paddingRight:1}}>
                      <CJFontTdBox >{totalSupplyPrice}</CJFontTdBox>
                    </Stack>
                  </TH>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "80%", height: "28px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                      <CJFontHeaderBox >부가세</CJFontHeaderBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "20%", height: "28px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="end" justifyContent="flex-start" sx={{paddingRight:1}}>
                      <CJFontTdBox >{vat}</CJFontTdBox>
                    </Stack>
                  </TH>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "80%", height: "28px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                      <CJFontHeaderBox >합계금액 (공급가액 + 부가세)</CJFontHeaderBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "20%", height: "28px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="end" justifyContent="flex-start" sx={{paddingRight:1}}>
                      <CJFontTdBox >{totalPrice}</CJFontTdBox>
                    </Stack>
                  </TH>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <CJFontHeaderBox sx={{mb:1}}>특이사항</CJFontHeaderBox>
          <Stack
              direction="row"
              spacing={0.5}
              alignItems="start"
              justifyContent="start"
              sx={{
                border: "0.5px solid var(--gray-Gray-700, #495056)",
                height: 100,
                p: 2
              }}
          >
            <CJFontBodyBox sx={{whiteSpace:'break-spaces', lineHeight: "19px", }}>{pymtInfo.memo}</CJFontBodyBox>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="space-between"
            // space-between
            sx={{
              borderBottom: "1px solid var(--gray-Gray-700, #495056)",
              height: 30,
            }}
          >
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              justifyContent="start"
            >
              <CJFontBodyBox>지불조건 :&nbsp;</CJFontBodyBox>
              <CJFontBodyBox>{pymtInfo.pymtTypeVal}&nbsp;&nbsp;&nbsp;&nbsp;</CJFontBodyBox>
            </Stack>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              justifyContent="end"
              sx={{
                borderBottom: "1px solid var(--gray-Gray-700, #495056)",
                height: 30,
              }}
            >
              <CJFontBodyBox>계좌 :&nbsp;</CJFontBodyBox>
              <CJFontBodyBox>{dpstInfo.dpstBank}</CJFontBodyBox>
              <CJFontBodyBox>{dpstInfo.dpstAcno}&nbsp;&nbsp;&nbsp;&nbsp;</CJFontBodyBox>
              <CJFontBodyBox>예금주 : </CJFontBodyBox>
              <CJFontBodyBox>{dpstInfo.dpstDpsr}</CJFontBodyBox>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              justifyContent="space-between"
              // space-between
              sx={{
                borderBottom: "1px solid var(--gray-Gray-700, #495056)",
                height: 30,
              }}
          >
            <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                justifyContent="start"
            >
              <CJFontBodyBox>견적 담당 :&nbsp;</CJFontBodyBox>
              <CJFontBodyBox>{basicInfo.bsnsMngrNm}</CJFontBodyBox>
              <CJFontBodyBox>({basicInfo.bsnsMngrTel})</CJFontBodyBox>
            </Stack>
            <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                justifyContent="end"
                sx={{
                  borderBottom: "1px solid var(--gray-Gray-700, #495056)",
                  height: 30,
                }}
            >
              <CJFontBodyBox sx={{color: cjbsTheme.palette.error.main }}>결제조건 :&nbsp;</CJFontBodyBox>
              <CJFontBodyBox sx={{color: cjbsTheme.palette.error.main }}>{pymtInfo.pymtMemo}</CJFontBodyBox>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ position: 'absolute', bottom:0, width:'100%', p: 2 }}>
          <Stack
            direction="row"
            spacing={0}
            alignItems="flex-end"
            justifyContent="space-between"
            sx={{
              width: "100%",
              mb: 1
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <CJFontHeaderBox>CJ바이오사이언스</CJFontHeaderBox>
              <CJFontBodyBox>서울특별시 중구 세종대로14 그랜드센트럴 B동 7층  |  T.02-6078-3456</CJFontBodyBox>
            </Stack>
            <CJFontBodyBox >www.cjbioscience.com</CJFontBodyBox>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
});

export default TSPreview;

const CJFontTitleBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW Bold title",
  fontSize: "30px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "30px",
  letterSpacing: "-0.5px",
}));
const CJFontHeaderBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW Bold title",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "14px",
  letterSpacing: "-0.25px",
}));
const CJFont500TdBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW Medium title",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "14px",
  letterSpacing: "-0.25px",
}));
const CJFontTdBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW body",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "13px",
  letterSpacing: "-0.25px",
}));
const CJFontBodyBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW title",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "13px",
  letterSpacing: "-0.25px",
}));