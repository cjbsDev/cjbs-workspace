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
  Radio,
  Form,
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
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import LogUpdateTitle from "../../../../components/LogUpdateTitle";

import axios from "axios";

const LazyRegion1 = dynamic(
  () => import("../../../../components/Region/Region1"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const LazyInstModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  }
);

// 거래처에서 기관 모달과 다름
const LazyInstAddSearchModal = dynamic(() => import("../InstAddSearchModal"), {
  ssr: false,
  loading: () => <SkeletonLoading height={272} />,
});

// 기관 수정
export default function InstModifyPage() {
  // init
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

  const methods = useForm<FormData>({
    defaultValues: () => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/inst/${uKey}`)
        .then((res) => res.json())
        .then((getData) => {
          const data = getData.data;
          console.log("자세히 보기 data", data);

          return {
            addr: data.addr,
            addrDetail: data.addrDetail,
            brno: data.brno,
            ftr: data.ftr,
            instNm: data.instNm,
            instTypeCc: data.instTypeCc,
            instUkey: data.instUkey,
            instUniqueCodeMc: data.instUniqueCodeMc,
            itbsns: data.itbsns,
            lctnTypeCc: data.lctnTypeCc,
            region1Gc: data.region1Gc,
            region2Gc: data.region2Gc,
            rprsNm: data.rprsNm,
            statusCodeCc: data.statusCodeCc,
            tpbsns: data.tpbsns,
            zip: data.zip,
          };
        });
    },
  });
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = methods;

  // Common
  // [ 수정 ]
  const onSubmit = (data: any) => {
    let saveObj = {
      addr: data.addr,
      addrDetail: data.addrDetail,
      brno: data.brno,
      ftr: data.ftr,
      instTypeCc: data.inst_type_cc,
      instUkey: data.instUkey,
      itbsns: data.itbsns,
      lctnTypeCc: "BS_0200002", // 국내 고정
      region1Gc: data.region1Gc,
      region2Gc: data.region2Gc,
      rprsNm: data.rprsNm,
      statusCodeCc: data.statusCodeCc,
      tpbsns: data.tpbsns,
      zip: data.zip,
    };

    console.log("==saveObj", saveObj);
    //console.log("saveObj stringify", JSON.stringify(saveObj));
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/inst`; // Replace with your API URL
    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("수정 successful:", response.data);
        if (response.data.success) {
          router.push("/cust/inst-info-list");
        } else {
        }
      })
      .catch((error) => {
        console.error("수정 failed:", error);
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
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
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
                        errorMessage={
                          errors.brno
                            ? "중복된 사업자 등록번호가 있습니다."
                            : "사업자 등록번호를 입력해 주세요."
                        }
                        placeholder="사업자 등록번호 10자리를 입력해주세요."
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
                        errorMessage="대표자명은 필수 입력입니다."
                        sx={{ width: 450 }}
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
                        sx={{ width: 450 }}
                        errorMessage={false}
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
                        sx={{ width: 450 }}
                        errorMessage={false}
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
                          placeholder="상세주소"
                        />
                      </Stack>
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>지역</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
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
                        errorMessage="특성은 필수 값입니다."
                        sx={{ width: 450 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>상태</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
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
              onClick={() => router.push("/cust/inst-info-list")}
            />
            <ContainedButton type="submit" buttonName="저장" />
          </Stack>

          <Box sx={{ mb: 5 }}>
            <LogUpdateTitle logTitle="기관" />
            <ErrorContainer FallbackComponent={Fallback}>
              <LazyInstModifyLog apiName="inst" uKey={uKey} />
            </ErrorContainer>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  );
}
