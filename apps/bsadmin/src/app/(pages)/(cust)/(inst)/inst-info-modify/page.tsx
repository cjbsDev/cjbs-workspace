"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  RadioSV,
  Form,
  RadioGV,
} from "cjbsDSTM";
import {
  Typography,
  Box,
  Stack,
  Table,
  TableRow,
  TableBody,
  TableContainer,
  Container,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { fetcher, PUT } from "api";
import { toast } from "react-toastify";
import useSWR from "swr";

const LazyRegion1 = dynamic(
  () => import("../../../../components/Region/Region1"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const LazyInstModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  },
);

// 거래처에서 기관 모달과 다름
const LazyInstAddSearchModal = dynamic(() => import("../InstAddSearchModal"), {
  ssr: false,
  loading: () => <SkeletonLoading height={272} />,
});

const dataRadioGVstatusCodeCc = [
  { value: "BS_0602001", optionName: "운영" },
  { value: "BS_0602002", optionName: "폐업" },
];

// 기관 수정
export default function InstModifyPage() {
  const searchParams = useSearchParams();
  const params = searchParams.get("instUkey");
  const uKey = params;
  const router = useRouter();

  // [기관 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  // [ 기관 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  const { data } = useSWR(`/inst/${uKey}`, fetcher, {
    suspense: true,
  });

  console.log("기관 수정 초기 Data ==>>", data);

  const defaultValues = {
    ...data,
    // addr: data.addr,
    // addrDetail: data.addrDetail,
    // brno: data.brno,
    // ftr: data.ftr,
    // instNm: data.instNm,
    // instTypeCc: data.instTypeCc,
    // instUkey: data.instUkey,
    // instUniqueCodeMc: data.instUniqueCodeMc,
    // itbsns: data.itbsns,
    // lctnTypeCc: data.lctnTypeCc,
    // region1Gc: data.region1Gc,
    // region2Gc: data.region2Gc,
    // rprsNm: data.rprsNm,
    // statusCodeCc: data.statusCodeCc,
    // tpbsns: data.tpbsns,
    // zip: data.zip,
  };

  const onSubmit = async (data: any) => {
    const saveObj = {
      ...data,
      addr: data.addr ?? "",
      addrDetail: data.addrDetail ?? "",
      zip: data.zip ?? "",
      itbsns: data.itbsns ?? "",
      tpbsns: data.tpbsns ?? "",
      lctnTypeCc: "BS_0200002", // 국내 고정
      // brno: data.brno,
      // ftr: data.ftr,
      // instTypeCc: data.inst_type_cc,
      // instUkey: data.instUkey,

      // region1Gc: data.region1Gc,
      // region2Gc: data.region2Gc,
      // rprsNm: data.rprsNm,
      // statusCodeCc: data.statusCodeCc,
    };

    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));
    const apiUrl = `/inst`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        router.push("/inst-info-list");
      } else {
        toast(response.message);
      }
    } catch (error) {
      console.error("request failed:", error);
      toast(error?.message);
    }
  };

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="기관 수정" />
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
          기본 정보
        </Typography>
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
                    {/*<InputValidation*/}
                    {/*  disabled={true}*/}
                    {/*  inputName="instUniqueCodeMc"*/}
                    {/*  errorMessage="소속기관을 선택해 주세요."*/}
                    {/*  placeholder="기관 코드"*/}
                    {/*/>*/}
                    <InputValidation
                      disabled={true}
                      inputName="instNm"
                      errorMessage="소속기관을 선택해 주세요."
                      placeholder="기관명"
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
                      sx={{ width: 450 }}
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
                      sx={{ width: 450 }}
                    />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>업태 [선택]</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation inputName="itbsns" sx={{ width: 450 }} />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>업종 [선택]</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation inputName="tpbsns" sx={{ width: 450 }} />
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
                      />
                      <PostCodeBtn />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <InputValidation
                        disabled={true}
                        sx={{ width: 450 }}
                        inputName="addr"
                      />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <InputValidation
                        sx={{ width: 450 }}
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
                      inputName="instTypeCc"
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
                      sx={{ width: 450 }}
                    />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>상태</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <RadioGV
                    data={dataRadioGVstatusCodeCc}
                    inputName="statusCodeCc"
                    required={true}
                    errorMessage="필수 선택입니다."
                  />
                  {/*<Stack direction="row">*/}
                  {/*  <RadioSV*/}
                  {/*    inputName="statusCodeCc"*/}
                  {/*    labelText="운영"*/}
                  {/*    value="BS_0602001"*/}
                  {/*  />*/}
                  {/*  <RadioSV*/}
                  {/*    inputName="statusCodeCc"*/}
                  {/*    labelText="폐업"*/}
                  {/*    value="BS_0602002"*/}
                  {/*  />*/}
                  {/*</Stack>*/}
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

        <Box sx={{ mb: 5 }}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyInstModifyLog apiName="inst" uKey={uKey} logTitle="기관" />
          </ErrorContainer>
        </Box>
      </Form>
    </Container>
  );
}
