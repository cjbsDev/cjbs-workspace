"use client";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  InputValidation,
  ErrorContainer,
  Fallback,
  CheckboxSV,
} from "cjbsDSTM";

import {
  Box,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import * as React from "react";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import LogUpdateTitle from "../../../../../components/LogUpdateTitle";

const LazyCustEBCInfo = dynamic(() => import("../../CustEBCInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={270} />,
});

const LazyCustModifyLog = dynamic(
  () => import("../../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  }
);

interface ParamsProps {
  params: {
    slug: string;
  };
}

interface FormData {
  agncNm?: string;
  agncUkey?: string;
  custNm?: string;
  memo?: string;
  tel_0?: string;
  tel_1?: string;
  tel_2?: string;
  telList?: string[];
}

export default function CustModifyPage({ params }: ParamsProps) {
  // init
  const { slug } = params;
  const router = useRouter();

  const methods = useForm<FormData>({
    defaultValues: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cust/list/detail/${slug}`
      );
      const getData = await res.json();
      const data = getData.data;
      console.log("modity data", data);

      return {
        custNm: data.custNm,
        tel_0: data.telList[0],
        tel_1: data.telList[1],
        tel_2: data.telList[2],
        agncNm: data.agncNm,
        agncUkey: data.agncUkey,
        memo: data.memo,
      };
    },
  });
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = methods;

  const onSubmit = (data: any) => {
    console.log("onSubmit data", data);
    let telList = [];
    if (data.tel_0) {
      telList.push(data.tel_0);
    }
    if (data.tel_1) {
      telList.push(data.tel_1);
    }
    if (data.tel_2) {
      telList.push(data.tel_2);
    }

    // validation 체크
    //let telList = [data.tel_0, data.tel_1, data.tel_2];
    let custNm = data.custNm;
    let memo = data.memo;

    let saveObj = {
      custNm,
      telList,
      memo,
    };
    console.log("==saveObj", saveObj);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/cust/list/detail/${slug}`; // Replace with your API URL

    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("request successful:", response.data);
        if (response.data.success) {
          router.push("/cust-list/" + slug);
        }
      })
      .catch((error) => {
        console.error("request failed:", error);
      });
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={{ mb: 4 }}>
            <Title1 titleName="고객 정보 수정" />
          </Box>

          {/* 가입 정보 */}
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyCustEBCInfo slug={slug} ebcShow={false} />
          </ErrorContainer>

          <Typography variant="subtitle1" sx={{ mt: 5 }}>
            기본 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>이름</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="custNm"
                        required={true}
                        errorMessage="필수 값입니다."
                        pattern={/^[A-Za-z0-9가-힣\s]*$/}
                        patternErrMsg="이름은 한글 또는 영문 입력해주세요.(띄어쓰기와 숫자도 허용합니다.)"
                        minLength={2}
                        minLengthErrMsg="최소 2자 이상 입력해주세요."
                        maxLength={50}
                        maxLengthErrMsg="50자 이내로 입력해주세요."
                        sx={{ width: 600 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>연락처 [선택] </TH>

                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <InputValidation
                        inputName="tel_0"
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        minLength={8}
                        minLengthErrMsg="8자리 이상 입력해주세요."
                        maxLength={15}
                        maxLengthErrMsg="15자리 이내로 입력해주세요."
                        placeholder="01012345678"
                        sx={{ width: 600 }}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <InputValidation
                        inputName="tel_1"
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        minLength={8}
                        minLengthErrMsg="8자리 이상 입력해주세요."
                        maxLength={15}
                        maxLengthErrMsg="15자리 이내로 입력해주세요."
                        placeholder="01012345678"
                        sx={{ width: 600 }}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <InputValidation
                        inputName="tel_2"
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        minLength={8}
                        minLengthErrMsg="8자리 이상 입력해주세요."
                        maxLength={15}
                        maxLengthErrMsg="15자리 이내로 입력해주세요."
                        placeholder="01012345678"
                        sx={{ width: 600 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="subtitle1">운영 관리 정보</Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                {/* 
                <TableRow>
                  <TH sx={{ width: "15%" }}>상태</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <CheckboxSV
                      inputName="isAcsFlag"
                      labelText="사용자를 차단 합니다."
                      value="N"
                      waringIs={true}
                      subMessage="(차단된 사용자는 주문서 작성 화면에 로그인 할 수 없습니다.)"
                    />
                  </TD>
                </TableRow>
*/}
                <TableRow>
                  <TH sx={{ width: "15%" }}>메모</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <InputValidation
                      fullWidth={true}
                      multiline
                      rows={4}
                      inputName="memo"
                      maxLength={500}
                      maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/cust-list")}
            />
            <ContainedButton buttonName="저장" type="submit" />
          </Stack>
        </Box>

        {/* 수정 로그 부분 */}
        <Box sx={{ mb: 5 }}>
          <LogUpdateTitle logTitle="고객정보" />
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyCustModifyLog apiName="cust" uKey={slug} />
          </ErrorContainer>
        </Box>
      </Container>
    </FormProvider>
  );
}