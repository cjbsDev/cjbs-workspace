"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ContainedButton,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import { useDaumPostcodePopup } from "react-daum-postcode";
import LogUpdateTitle from "../../../../../components/LogUpdateTitle";

interface ParamsProps {
  params: {
    slug: string;
  };
}
export default function AgncPiModifyPage({ params }: ParamsProps) {
  const { slug } = params;
  const router = useRouter();
  const methods = useForm();
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = methods;

  const onSubmit = (data: any) => {
    console.log("in onSubmit", data);
  };

  const handlePostAddressComplete = (data) => {
    console.log("Post code data ==>>", data);
    let fullAddress = data.address;
    let zip = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log("fullAddress", fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setValue("zip", zip);
    setValue("addr", fullAddress);
  };

  const handlePostAddressClick = () => {
    open({ onComplete: handlePostAddressComplete });
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
            <Title1 titleName="거래처(PI) 수정" />
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 5 }}>
            기본 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>기관명</TH>
                  <TD sx={{ width: "85%" }}>강남세브란스병원</TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>거래처(PI)명</TH>

                  <TD sx={{ width: "85%" }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        error={errors.agncNm ? true : false}
                        helperText={errors.agncNm?.message ?? null}
                        register={register}
                        inputName="agncNm"
                        errorMessage={
                          errors.agncNm
                            ? "중복된 거래처명이 있습니다."
                            : "거래처(PI)를 입력해 주세요."
                        }
                      />

                      <OutlinedButton
                        size="small"
                        buttonName="중복 확인"
                        // onClick={getAgncDuplicate}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>주소 [선택]</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          disabled={true}
                          register={register}
                          inputName="zip"
                          errorMessage={false}
                          placeholder="zip code"
                        />
                        <OutlinedButton
                          size="small"
                          buttonName="우편번호 찾기"
                          onClick={handlePostAddressClick}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          disabled={true}
                          sx={{ width: 450 }}
                          register={register}
                          inputName="addr"
                          errorMessage={false}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          sx={{ width: 450 }}
                          register={register}
                          inputName="addrDetail"
                          errorMessage={false}
                          placeholder="상세주소"
                        />
                      </Stack>
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/cust/agnc-pi-list")}
            />
            <ContainedButton buttonName="저장" type="submit" />
          </Stack>
        </Box>

        <Box sx={{ mb: 5 }}>
          <LogUpdateTitle logTitle="거래처(PI)" />
          {/*<LazyCustModifyLog slug={slug} />*/}
        </Box>
      </Container>
    </FormProvider>
  );
}
