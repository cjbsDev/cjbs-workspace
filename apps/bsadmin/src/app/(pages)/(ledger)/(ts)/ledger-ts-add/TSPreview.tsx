import React, { forwardRef } from "react";
import {
  formatNumberWithCommas,
  OutlinedButton,
  TH,
  TD,
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
import CJLogo from '../../../../../../public/svg/cj_bk.svg';
import {useFormContext, useWatch} from "react-hook-form";
import dayjs from "dayjs";
import {geKoreanNumber} from "cjbsDSTM/commonFunc/geKoreanNumber";

const TSPreview = forwardRef((props, ref) => {
  // const { open, onClose, modalWidth } = props;
  const { getValues, control, watch } = useFormContext();
  const productValue = useWatch({
    name: "productDetailList",
    control,
  }) || []; // productValue가 undefined일 경우 빈 배열을 기본값으로 사용

  const wdtDate = dayjs(getValues("wdtDate")).format("YYYY년 MM월 DD일");
  const conm = getValues("conm");
  const nm = getValues("nm");
  const tel = getValues("tel");
  const memo = getValues("memo");
  const totalSupplyPrice = formatNumberWithCommas(getValues("totalSupplyPrice"));
  const vat = formatNumberWithCommas(getValues("vat"));
  const totalPrice = formatNumberWithCommas(getValues("totalPrice"));
  const totalPriceKr = geKoreanNumber(getValues("totalPrice"));

  return (

    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="start"
      sx={{
        bgcolor: '#ffffff',
        width: '595px',
        height: '842px',
        // border: '1px solid #000000',
        position: "relative",
      }}
      className="printArea"
      // ref={ref}
    >
      <Grid
        container
        sx={{ p: 2, mb: 5 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "start" }}>
          <Image src={CJLogo} alt='CJ바이오사이언스' width={89} height={27} quality={100} />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mb:2 }}>
          <CJFontTitleBox sx={{fontSize:22}} >거 래 명 세 서</CJFontTitleBox>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <CJFontBodyBox sx={{fontSize:10}} >Date.&nbsp;</CJFontBodyBox>
          <CJFontBodyBox sx={{fontSize:10}} >{wdtDate}</CJFontBodyBox>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }} mb={1}>
          <TableContainer sx={{ mt: 0.5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "50%", height: "20px", p:0 }} colSpan={4} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontHeaderBox >공 급 자</CJFontHeaderBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "50%", height: "20px", p:0 }} colSpan={2} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontHeaderBox >공 급 받 는 자</CJFontHeaderBox>
                    </Stack>
                  </TH>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >등 록 번 호</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "20px", p:0 }} colSpan={3} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox sx={{fontSize:10}} >119-86-23145</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >소 속</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "20px", p:0, paddingX: 1 }} colSpan={1} align="center">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                        <CJFontTdBox sx={{fontSize:10}} >{conm}</CJFontTdBox>
                      </Stack>
                      <CJFontTdBox sx={{fontSize:10}} >귀중</CJFontTdBox>
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >상 호</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "15%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox sx={{fontSize:10}} >119-86-23145</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >성 명</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "15%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox sx={{fontSize:10}} >천종식</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >성 명</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "20px", p:0, paddingX: 1 }} align="center">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                        <CJFontTdBox sx={{fontSize:10}} >{nm}</CJFontTdBox>
                      </Stack>
                      <CJFontTdBox sx={{fontSize:10}} > 님</CJFontTdBox>
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>주 소</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "20px", p:0 }} colSpan={3} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox sx={{fontSize:10}} >서울특별시 중구 세종대로14 그랜드센트럴 B동 7층</CJFontTdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>전 화</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "20px", p:0 }} colSpan={1} align="center">
                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
                      <CJFontTdBox sx={{fontSize:10, pl:1}} >{tel}</CJFontTdBox>
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>전 화</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "20px", p:0 }} colSpan={3} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFontTdBox sx={{fontSize:10}} >02-6078-3456</CJFontTdBox>
                    </Stack>
                  </TD>
                  {/*<TD sx={{ width: "10%" }} align="center">*/}
                  {/*  <CJFont500TdBox >유효기간</CJFont500TdBox>*/}
                  {/*</TD>*/}
                  {/*<TD sx={{ width: "40%" }} colSpan={1} align="center">*/}
                  {/*  <CJFontTdBox sx={{fontSize:10}} >견적일로 부터 </CJFontTdBox>*/}
                  {/*  <CJFontTdBox sx={{fontSize:10}} >30</CJFontTdBox>*/}
                  {/*  <CJFontTdBox sx={{fontSize:10}} > 일</CJFontTdBox>*/}
                  {/*</TD>*/}
                  <TD sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox>비 고</CJFont500TdBox>
                    </Stack>
                  </TD>
                  <TD sx={{ width: "40%", height: "20px", p:0 }} colSpan={1} align="center">
                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
                      <CJFont500TdBox sx={{pl:1}}>{memo}</CJFont500TdBox>
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
              height: 20,
              paddingX: 4,
            }}
          >
            <CJFontHeaderBox >합계금액 (공급가액 + 부가세) : </CJFontHeaderBox>
            <CJFont500TdBox >일 금</CJFont500TdBox>
            <CJFontHeaderBox >{totalPriceKr}</CJFontHeaderBox>
            <CJFont500TdBox >원 정</CJFont500TdBox>
            <CJFontHeaderBox >₩ {totalPrice}</CJFontHeaderBox>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "50%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >품 명</CJFont500TdBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >수 량</CJFont500TdBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >단 위</CJFont500TdBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "10%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >단 가</CJFont500TdBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "20%", height: "20px", p:0 }} align="center">
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                      <CJFont500TdBox >금 액</CJFont500TdBox>
                    </Stack>
                  </TH>
                </TableRow>
                <TableRow >
                  <TD sx={{ width: "50%", borderBottom: 0 }}>
                    <Box sx={{ minHeight: "430px", maxHeight: "430px", pt: 0.5 }}>
                      <Stack spacing={1} alignItems="flex-start" justifyContent="flex-start">
                        {productValue.map((item: any) => {
                          return (
                            <CJFontTdBox>{item.products}</CJFontTdBox>
                          );
                        })}
                      </Stack>
                    </Box>
                  </TD>
                  <TD sx={{ width: "10%", borderBottom: 0 }}>
                    <Box sx={{ minHeight: "430px", maxHeight: "430px", pt: 0.5 }}>
                      <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                        {productValue.map((item: any) => {
                          return (
                            <CJFontTdBox>{item.sampleSize}</CJFontTdBox>
                          );
                        })}
                      </Stack>
                    </Box>
                  </TD>
                  <TD sx={{ width: "10%", borderBottom: 0 }}>
                    <Box sx={{ minHeight: "430px", maxHeight: "430px", pt: 0.5 }}>
                      <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                        {productValue.map((item: any) => {
                          return (
                            <CJFontTdBox>ea</CJFontTdBox>
                          );
                        })}
                      </Stack>
                    </Box>
                  </TD>
                  <TD sx={{ width: "10%", borderBottom: 0 }}>
                    <Box sx={{ minHeight: "430px", maxHeight: "430px", pt: 0.5 }}>
                      <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                        {productValue.map((item: any) => {
                          return (
                            <CJFontTdBox>{formatNumberWithCommas(item.unitPrice)}</CJFontTdBox>
                          );
                        })}
                      </Stack>
                    </Box>
                  </TD>
                  <TD sx={{ width: "20%", borderBottom: 0 }}>
                    <Box sx={{ minHeight: "430px", maxHeight: "430px", pt: 0.5 }}>
                      <Stack spacing={1} alignItems="end" justifyContent="flex-start">
                        {productValue.map((item: any) => {
                          return (
                            <CJFontTdBox>{formatNumberWithCommas(item.supplyPrice)}</CJFontTdBox>
                          );
                        })}
                      </Stack>
                    </Box>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "80%", height: "20px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                      <CJFontHeaderBox >공급가액</CJFontHeaderBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "20%", height: "20px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="end" justifyContent="flex-start" sx={{paddingRight:1}}>
                      <CJFontTdBox >{totalSupplyPrice}</CJFontTdBox>
                    </Stack>
                  </TH>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "80%", height: "20px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                      <CJFontHeaderBox >부가세</CJFontHeaderBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "20%", height: "20px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="end" justifyContent="flex-start" sx={{paddingRight:1}}>
                      <CJFontTdBox >{vat}</CJFontTdBox>
                    </Stack>
                  </TH>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "80%", height: "20px", p:0 }} align="center">
                    <Stack spacing={1} alignItems="center" justifyContent="flex-start">
                      <CJFontHeaderBox >합계금액 (공급가액 + 부가세)</CJFontHeaderBox>
                    </Stack>
                  </TH>
                  <TH sx={{ width: "20%", height: "20px", p:0 }} align="center">
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
            <CJFontBodyBox>계좌 : 신한은행 100-000-00000    예금주 : 씨제이바이오사이언스 주식회사</CJFontBodyBox>
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
              <CJFontHeaderBox sx={{fontSize:"9px", lineHeight: "10px",}}>CJ바이오사이언스</CJFontHeaderBox>
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
  fontSize: "22px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "24px",
  letterSpacing: "-0.5px",
}));
const CJFontHeaderBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW Bold title",
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "12px",
  letterSpacing: "-0.25px",
}));
const CJFont500TdBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW Medium title",
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "12px",
  letterSpacing: "-0.25px",
}));
const CJFontTdBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW body",
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "12px",
  letterSpacing: "-0.25px",
}));
const CJFontBodyBox = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: "CJ ONLYONE NEW title",
  fontSize: "9px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "10px",
  letterSpacing: "-0.25px",
}));