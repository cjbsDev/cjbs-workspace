"use client";
import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import {
  ContainedButton,
  Form,
  formatPhoneNumber,
  InputValidation,
  OutlinedButton,
  SelectBox,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Container,
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
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";

// interface FormDataProps {
//   departMngrMc: string;
//   departMngrVal: string;
//   email: string;
//   memo: string;
//   mngrNm: string;
//   mngrTel: string;
//   stockAgncId: number;
//   stockAgncNm: string;
//   stockAgncUkey: string;
// }

const DetailView = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const params = useParams();
  // console.log("params", params.slug);
  const ukey = params.slug;
  // console.log(stockHsptUkey);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useSWR(`/stock/agnc/${ukey}`, fetcher, {
    suspense: true,
  });

  console.log("Stock agnc detail view data ==>>", data);

  const {
    departMngrMc,
    departMngrVal,
    email,
    memo,
    mngrNm,
    mngrTel,
    stockAgncId,
    stockAgncNm,
    stockAgncUkey,
  } = data;

  // const defaultValues = {
  //   // ...data,
  //   departMngrMc: departMngrMc,
  //   departMngrVal: departMngrVal,
  //   email: email,
  //   memo: memo,
  //   mngrNm: mngrNm,
  //   mngrTel: mngrTel,
  //   stockAgncId: stockAgncId,
  //   stockAgncNm: stockAgncNm,
  //   stockAgncUkey: stockAgncUkey,
  // };

  // const onSubmit = async (data: FormDataProps) => {
  //   setIsLoading(true);
  //   const reqBody = {
  //     ...data,
  //   };
  //
  //   console.log("REQ BODY", reqBody);
  //
  //   const apiUrl = `/stock/agnc/${ukey}`;
  //
  //   try {
  //     // API 호출
  //     const response = await PUT(apiUrl, reqBody);
  //     // API 응답을 기반으로 처리, 예: 성공 메시지 출력, 페이지 이동 등
  //     console.log("Form submitted successfully:", response);
  //     if (response.success) {
  //       mutate("/stock/agnc/list?page=1&size=15");
  //       router.push("/stock-agnc-mngmnt-list");
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
    <Box>
      {/*<Form onSubmit={onSubmit} defaultValues={defaultValues}>*/}
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={"주문처 상세"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>주문처</TH>
              <TD sx={{ width: "85%" }}>
                {stockAgncNm}
                {/*<InputValidation*/}
                {/*  sx={{ width: 255 }}*/}
                {/*  inputName="stockAgncNm"*/}
                {/*  // InputProps={{*/}
                {/*  //   readOnly: true,*/}
                {/*  // }}*/}
                {/*  required={true}*/}
                {/*  errorMessage="주문처를 입력해 주세요."*/}
                {/*/>*/}
              </TD>
            </TableRow>
            <TableRow>
              <TH>이메일</TH>
              <TD>
                {email}
                {/*<InputValidation*/}
                {/*  sx={{ width: 255 }}*/}
                {/*  inputName="email"*/}
                {/*  // InputProps={{*/}
                {/*  //   readOnly: true,*/}
                {/*  // }}*/}
                {/*  required={true}*/}
                {/*  errorMessage="email를 입력해 주세요."*/}
                {/*  // maxLength={20}*/}
                {/*  // maxLengthErrMsg="20자 이내로 입력해주세요."*/}
                {/*/>*/}
              </TD>
            </TableRow>
            <TableRow>
              <TH>담당자</TH>
              <TD>
                {mngrNm}
                {/*<InputValidation*/}
                {/*  sx={{ width: 255 }}*/}
                {/*  inputName="mngrNm"*/}
                {/*  // InputProps={{*/}
                {/*  //   readOnly: true,*/}
                {/*  // }}*/}
                {/*  required={true}*/}
                {/*  errorMessage="담당자를 입력해 주세요."*/}
                {/*  // maxLength={20}*/}
                {/*  // maxLengthErrMsg="20자 이내로 입력해주세요."*/}
                {/*/>*/}
              </TD>
            </TableRow>
            <TableRow>
              <TH>연락처</TH>
              <TD>
                {formatPhoneNumber(mngrTel)}
                {/*<Box sx={{ width: 136 }}>*/}
                {/*  <TelNumber inputName="mngrTel" />*/}
                {/*</Box>*/}
              </TD>
            </TableRow>
            <TableRow>
              <TH>거래부서</TH>
              <TD>
                {departMngrVal}
                {/*<SelectBox*/}
                {/*  options={groupDepartMngrListData}*/}
                {/*  inputName="departMngrMc"*/}
                {/*/>*/}
              </TD>
            </TableRow>
            <TableRow>
              <TH>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
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
        <Link href="/stock-agnc-mngmnt-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <ContainedButton
          buttonName="수정"
          type="submit"
          size="small"
          onClick={() =>
            router.push(`/stock-agnc-mngmnt-reg?modifyUkey=${ukey}`)
          }
        />

        {/*<LoadingButton*/}
        {/*  loading={isLoading}*/}
        {/*  variant="contained"*/}
        {/*  size="small"*/}
        {/*  type="submit"*/}
        {/*>*/}
        {/*  수정*/}
        {/*</LoadingButton>*/}
      </Stack>
      {/*</Form>*/}
    </Box>
  );
};

export default DetailView;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
