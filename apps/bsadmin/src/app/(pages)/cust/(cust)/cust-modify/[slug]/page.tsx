"use client";
import { useState } from "react";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  InputValidation,
  ErrorContainer,
  Fallback,
  Checkbox,
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
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
        `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`
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
    console.log("in onSubmit");

    // validation 체크
    let telList = [getValues("tel_0"), getValues("tel_1"), getValues("tel_2")];
    let agncUkey = getValues("agncUkey");
    let custNm = getValues("custNm");
    let memo = getValues("memo");

    let saveObj = {
      agncUkey,
      custNm,
      telList,
      memo,
    };
    console.log("==saveObj", saveObj);

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`; // Replace with your API URL

    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          router.push("/cust/cust-list/" + slug);
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
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
                        error={errors.custNm ? true : false}
                        helperText={
                          errors.custNm ? errors.custNm?.message : null
                        }
                        inputName="custNm"
                        errorMessage="필수 값입니다."
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
                        error={errors.tel_0 ? true : false}
                        inputName="tel_0"
                        errorMessage=""
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <InputValidation
                        error={errors.tel_1 ? true : false}
                        inputName="tel_1"
                        errorMessage=""
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <InputValidation
                        error={errors.tel_2 ? true : false}
                        inputName="tel_2"
                        errorMessage=""
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>거래처(PI)</TH>

                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      <InputValidation
                        disabled={true}
                        error={errors.agncNm ? true : false}
                        inputName="agncNm"
                        errorMessage="필수 값입니다."
                      />

                      <InputValidation
                        disabled={true}
                        sx={{ display: "none" }}
                        inputName="agncUkey"
                        error={errors.agncUkey ? true : false}
                        errorMessage="필수 값입니다."
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
                    <Checkbox
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
                      errorMessage={false}
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/cust/cust-list")}
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
