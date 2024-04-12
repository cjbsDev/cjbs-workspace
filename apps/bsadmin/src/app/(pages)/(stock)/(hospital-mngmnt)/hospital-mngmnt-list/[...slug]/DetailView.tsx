"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import {
  ContainedButton,
  Form,
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

interface FormDataProps {
  addr: "string";
  addrDetail: "string";
  hsptCode: "string";
  memo: "string";
  stockHsptUkey: "string";
  tel: "string";
  zip: "string";
}

const DetailView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const stockHsptUkey = params.slug;
  // console.log(stockHsptUkey);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useSWR(`/stock/hspt/${stockHsptUkey}`, fetcher, {
    suspense: true,
  });

  console.log("YUYUYUYUYUYU", data);

  const defaultValues = {
    ...data,
  };

  const onSubmit = async (data: FormDataProps) => {
    setIsLoading(true);
    const reqBody = {
      ...data,
      stockHsptUkey: stockHsptUkey?.toString(),
    };

    console.log("REQ BODY", reqBody);

    try {
      // API 호출
      const response = await PUT(`/stock/hspt/${stockHsptUkey}`, reqBody);
      // API 응답을 기반으로 처리, 예: 성공 메시지 출력, 페이지 이동 등
      console.log("Form submitted successfully:", response);
      router.push("/hospital-mngmnt-list");
    } catch (error) {
      // 오류 처리 로직, 예: 오류 메시지 출력
      console.error("Failed to submit the form:", error);
      if (error.response) {
        // 서버에서 응답한 에러 메시지가 있는 경우
        console.error("Error response:", error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={"병원 거래처 상세"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>병원명</TH>
              <TD sx={{ width: "85%" }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <InputValidation
                    inputName="stockHsptNm"
                    InputProps={{
                      readOnly: true,
                    }}
                    required={true}
                    errorMessage="병원을 검색해 주세요."
                  />
                  <ContainedButton buttonName="병원 검색" size="small" />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH>병원코드</TH>
              <TD>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="hsptCode"
                  InputProps={{
                    readOnly: true,
                  }}
                  required={true}
                  errorMessage="병원코드를 입력해 주세요."
                  maxLength={20}
                  maxLengthErrMsg="20자 이내로 입력해주세요."
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>주소</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      inputName="zip"
                      placeholder="우편번호"
                      sx={{ width: 77 }}
                      InputProps={{
                        readOnly: true,
                      }}
                      required={true}
                      errorMessage="우편번호 추가해 주세요"
                    />
                    <PostCodeBtn />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 600 }}
                      inputName="addr"
                      InputProps={{
                        readOnly: true,
                      }}
                      required={true}
                      errorMessage="주소 입력해 주세요"
                    />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 600 }}
                      inputName="addrDetail"
                      maxLength={50}
                      maxLengthErrMsg="50자 이내로 입력해주세요."
                      placeholder="상세주소"
                      required={true}
                      errorMessage="상세 주소 입력해 주세요"
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH>연락처</TH>
              <TD>
                <Box sx={{ width: 136 }}>
                  <TelNumber />
                </Box>
              </TD>
            </TableRow>
            <TableRow>
              <TH>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
              <TD>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={3}
                  inputName="memo"
                  placeholder="메모"
                  sx={{ py: 0.5 }}
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/hospital-mngmnt-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <LoadingButton
          loading={isLoading}
          variant="contained"
          size="small"
          type="submit"
        >
          수정
        </LoadingButton>
      </Stack>
    </Form>
  );
};

export default DetailView;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
