"use client";
import React, { useEffect, useState } from "react";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  ErrorContainer,
  Fallback,
  InputValidation,
  PostCodeBtn,
  SelectBox,
  RadioGV,
  Form,
} from "cjbsDSTM";
import useSWR from "swr";
import {
  Typography,
  Box,
  Stack,
  Table,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import axios from "axios";

// 거래처에서 기관 모달과 다름
const LazyInstAddSearchModal = dynamic(() => import("../InstAddSearchModal"), {
  ssr: false,
});

const LazyRegion1 = dynamic(
  () => import("../../../../components/Region/Region1"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

/**
 * 기관 등록 2023-07-03 개발 시작 0704일에 완료 예정
 * - 우선은 거래처 등록을 base 로 진행 예정
 * - 마스터 코드에서 등록된 기관에 대해 -> 기관 검색 & 추가
 * - 기관 검색은 거래처에서 기관 검색과는 다름
 *
 * 1차 개발 목표 [ 저장 ]
 * - 위치 선택 후 값 확인하기
 * - 상태 선택 후 값 확인하기
 * - 기관 검색 모달 띄우고 선택하기
 * - 국내 & 해외 선택에 따라 지역 1 값들 나오게 하기
 * - 지역 1 선택에 따라 지역 2 값 나오게 하기
 * - 분류 값들 나오게 하기
 * - 저장 눌러서 값들 확인하기
 *
 * 2차 개발 목표 [ Validation ]
 * 선택과 필수 값 확인 후 저장
 * - 선택값 : 대표자, 업태, 업종, 주소 나머지 다 필수
 * API 에서 validation 관련하여 리턴 처리
 *
 */

const dataRadioGVstatusCodeCc = [
  { value: "BS_0602001", optionName: "운영" },
  { value: "BS_0602002", optionName: "폐업" },
];

// 기관 등록
const InstAdd = () => {
  // init
  const router = useRouter();

  const methods = useForm();
  const {
    formState: { errors },
    getValues,
    setValue,
  } = methods;

  // [기관 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  // [ 기관 검색 ] 모달 오픈
  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // [ 기관 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  // Common
  // [ 등록 ]
  const onSubmit = (data: any) => {
    let saveObj = {
      zip: data.zip ?? "",
      addr: data.addr ?? "",
      addrDetail: data.addrDetail ?? "",
      brno: data.brno,
      ftr: data.ftr,
      instTypeCc: data.inst_type_cc,
      instUniqueCodeMc: data.instUniqueCodeMc,
      itbsns: data.itbsns ?? "",
      tpbsns: data.tpbsns ?? "",
      lctnTypeCc: "BS_0200002", // 국내
      region1Gc: data.region1Gc,
      region2Gc: data.region2Gc,
      rprsNm: data.rprsNm,
      statusCodeCc: data.statusCodeCc,
    };

    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));
    //return;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/inst`; // Replace with your API URL
    axios
      .post(apiUrl, saveObj)
      .then((response) => {
        console.log("등록 successful:", response.data);
        if (response.data.success) {
          router.push("/inst-info-list");
        }
      })
      .catch((error) => {
        console.error("등록 failed:", error);
      });
  };

  const defaultValues = {
    region1Gc: "11000", // 서울
    statusCodeCc: "BS_0602001", // 운영
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="기관 등록" />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>위치</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                국내
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>기관명</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="instNm"
                    disabled={true}
                    required={true}
                    errorMessage="소속기관을 선택해 주세요."
                    placeholder="기관명"
                    sx={{ width: 600 }}
                  />

                  <OutlinedButton
                    size="small"
                    buttonName="기관 검색"
                    onClick={agncSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>사업자 등록번호</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="brno"
                    required={true}
                    errorMessage="사업자 등록번호 숫자 10자리를 입력해 주세요."
                    pattern={/^\d{10}$/}
                    patternErrMsg="사업자 등록번호 숫자 10자리를 입력해 주세요."
                    placeholder="사업자 등록번호 숫자 10자리를 입력해 주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>대표자</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="rprsNm"
                    required={true}
                    pattern={/^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s()-]*$/}
                    patternErrMsg="이름은 한글 또는 영문으로 20자리 이내로 입력해주세요."
                    errorMessage="대표자명은 필수 입력입니다."
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
              <TH sx={{ width: "15%" }}>업태 [선택]</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="itbsns"
                    maxLength={50}
                    maxLengthErrMsg="50자 이내로 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>업종 [선택]</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="tpbsns"
                    maxLength={20}
                    maxLengthErrMsg="20자 이내로 입력해주세요."
                    sx={{ width: 600 }}
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
                      inputName="zip"
                      placeholder="우편번호"
                      sx={{ width: 147 }}
                    />
                    <PostCodeBtn />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      disabled={true}
                      sx={{ width: 600 }}
                      inputName="addr"
                    />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 600 }}
                      inputName="addrDetail"
                      maxLength={50}
                      maxLengthErrMsg="50자 이내로 입력해주세요."
                      placeholder="상세주소"
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>지역</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <LazyRegion1 />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>분류</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <SelectBox
                    inputName="inst_type_cc"
                    options={[
                      { value: "BS_0600004", optionName: "기관" },
                      { value: "BS_0600001", optionName: "학교" },
                      { value: "BS_0600002", optionName: "병원" },
                      { value: "BS_0600003", optionName: "기업" },
                      { value: "BS_0600005", optionName: "기타" },
                    ]}
                    defaultOption={false}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>특성</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="ftr"
                    required={true}
                    errorMessage="특성은 필수 값입니다."
                    maxLength={20}
                    maxLengthErrMsg="20자 이내로 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                {/* 운영, 폐업 */}
                <RadioGV
                  data={dataRadioGVstatusCodeCc}
                  inputName="statusCodeCc"
                  required={true}
                  errorMessage="필수 선택입니다."
                />
                {/* 
                <Radio
                  inputName="statusCodeCc"
                  labelText="운영"
                  value="BS_0602001"
                />
                <Radio
                  inputName="statusCodeCc"
                  labelText="폐업"
                  value="BS_0602002"
                />
*/}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 기관 검색 모달*/}
      <LazyInstAddSearchModal
        onClose={agncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={800}
      />

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/inst-info-list")}
        />
        <ContainedButton type="submit" buttonName="저장" />
      </Stack>
    </Form>
  );
};

export default InstAdd;
