"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import {
  ContainedButton,
  Form,
  formatPhoneNumber,
  InputValidation,
  OutlinedButton,
  PostCodeBtn,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import TelNumber from "../../../../../components/NumberFormat/TelNumber";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import HsptCodeSrchRow from "../../stock-hspt-mngmnt-reg/HsptCodeSrchRow";

interface FormDataProps {
  addr: string;
  addrDetail: string;
  hsptCode: string;
  memo: string;
  stockHsptUkey: string;
  tel: string;
  zip: string;
}

const DetailView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const ukey = params.slug;
  const { data } = useSWR(`/stock/hspt/${ukey}`, fetcher, {
    suspense: true,
  });

  console.log("YUYUYUYUYUYU", data);

  const { stockHsptNm, hsptCode, zip, addr, addrDetail, tel, memo } = data;

  // const defaultValues = {
  //   ...data,
  // };

  // const onSubmit = async (data: FormDataProps) => {
  //   setIsLoading(true);
  //   const reqBody = {
  //     ...data,
  //     stockHsptUkey: stockHsptUkey?.toString(),
  //   };
  //
  //   console.log("REQ BODY", reqBody);
  //
  //   try {
  //     // API 호출
  //     const response = await PUT(`/stock/hspt/${stockHsptUkey}`, reqBody);
  //     // API 응답을 기반으로 처리, 예: 성공 메시지 출력, 페이지 이동 등
  //     console.log("Form submitted successfully:", response);
  //     if (response.success) {
  //       router.push("/stock-hspt-mngmnt-list");
  //     } else {
  //       toast(response.message);
  //     }
  //   } catch (error) {
  //     // 오류 처리 로직, 예: 오류 메시지 출력
  //     console.error("Failed to submit the form:", error);
  //     if (error.response) {
  //       // 서버에서 응답한 에러 메시지가 있는 경우
  //       console.error("Error response:", error.response.data);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={"병원 거래처 상세"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            {/*<HsptCodeSrchRow />*/}
            <TableRow>
              <TH sx={{ width: "15%" }}>병원명</TH>
              <TD sx={{ width: "85%" }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {stockHsptNm}
                  {/*<InputValidation*/}
                  {/*  inputName="stockHsptNm"*/}
                  {/*  InputProps={{*/}
                  {/*    readOnly: true,*/}
                  {/*  }}*/}
                  {/*  required={true}*/}
                  {/*  errorMessage="병원을 검색해 주세요."*/}
                  {/*/>*/}
                  {/*<ContainedButton buttonName="병원 검색" size="small" />*/}
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH>병원코드</TH>
              <TD>
                {hsptCode}
                {/*<InputValidation*/}
                {/*  sx={{ width: 255 }}*/}
                {/*  inputName="hsptCode"*/}
                {/*  InputProps={{*/}
                {/*    readOnly: true,*/}
                {/*  }}*/}
                {/*  required={true}*/}
                {/*  errorMessage="병원코드를 입력해 주세요."*/}
                {/*  maxLength={20}*/}
                {/*  maxLengthErrMsg="20자 이내로 입력해주세요."*/}
                {/*/>*/}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>주소</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={0.5}>
                    ({zip}) {addr}
                    {/*<InputValidation*/}
                    {/*  inputName="zip"*/}
                    {/*  placeholder="우편번호"*/}
                    {/*  sx={{ width: 77 }}*/}
                    {/*  InputProps={{*/}
                    {/*    readOnly: true,*/}
                    {/*  }}*/}
                    {/*  required={true}*/}
                    {/*  errorMessage="우편번호 추가해 주세요"*/}
                    {/*/>*/}
                    {/*<PostCodeBtn />*/}
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    {addrDetail}
                    {/*<InputValidation*/}
                    {/*  sx={{ width: 600 }}*/}
                    {/*  inputName="addrDetail"*/}
                    {/*  maxLength={50}*/}
                    {/*  maxLengthErrMsg="50자 이내로 입력해주세요."*/}
                    {/*  placeholder="상세주소"*/}
                    {/*  required={true}*/}
                    {/*  errorMessage="상세 주소 입력해 주세요"*/}
                    {/*/>*/}
                  </Stack>
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH>연락처</TH>
              <TD>
                {formatPhoneNumber(tel)}
                {/*<Box sx={{ width: 136 }}>*/}
                {/*  <TelNumber inputName="tel" />*/}
                {/*</Box>*/}
              </TD>
            </TableRow>
            <TableRow>
              <TH>메모</TH>
              <TD>
                {memo}
                {/*<InputValidation*/}
                {/*  fullWidth={true}*/}
                {/*  multiline*/}
                {/*  rows={3}*/}
                {/*  inputName="memo"*/}
                {/*  placeholder="메모"*/}
                {/*  sx={{ py: 0.5 }}*/}
                {/*  maxLength={500}*/}
                {/*  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"*/}
                {/*/>*/}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/stock-hspt-mngmnt-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <Link
          href={{
            pathname: "/stock-hspt-mngmnt-reg",
            query: { modifyUkey: ukey },
          }}
        >
          <ContainedButton buttonName="수정" size="small" />
        </Link>

        {/*<LoadingButton*/}
        {/*  loading={isLoading}*/}
        {/*  variant="contained"*/}
        {/*  size="small"*/}
        {/*  type="submit"*/}
        {/*>*/}
        {/*  수정*/}
        {/*</LoadingButton>*/}
      </Stack>
    </>
  );
};

export default DetailView;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
