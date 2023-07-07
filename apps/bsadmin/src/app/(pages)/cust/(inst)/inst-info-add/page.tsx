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
  Radio,
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
import SkeletonLoading from "../../../../components/SkeletonLoading";

import axios from "axios";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// 거래처에서 기관 모달과 다름
const LazyInstAddSearchModal = dynamic(() => import("../InstAddSearchModal"), {
  ssr: false,
});

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

  const [selectedOption, setSelectedOption] = useState("");
  const [reg1KorOption, setReg1KorOption] = useState([]); // 도시 데이터
  const [reg2KorOption, setReg2KorOption] = useState([]); // 도시에 따른 지역구 데이터
  const [selectReg1Option, setSelectReg1Option] = useState("seoul"); // 도시 선택 값
  const [selectReg2Option, setSelectReg2Option] = useState("w"); // 도시에 따른 지역구 선택 값

  // [ 기관 검색 ] 모달 오픈
  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // [ 기관 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  // 위치 값 선택 저장
  /*
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("위치 handleLocationChange", event.target.value);
    console.log(event.target.value == "BS_0200002" ? "국내" : "해외");
    //const methods = useFormContext();
    //const moreDetail = methods.watch("checkTest");
  };
  */

  const handleReg1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("국내 선택 01", event.target.value);
    setSelectReg1Option(event.target.value);
    //const methods = useFormContext();
    //const moreDetail = methods.watch("checkTest");
  };
  const handleReg2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("국내 선택 02", event.target.value);
    setSelectReg2Option(event.target.value);
  };

  // 첫번째 선택 ( 국내 lev1 )
  const { data: domesticData } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/code/list/shortly?topValue=domestic`,
    fetcher,
    {
      onSuccess: (data) => {
        console.log("in domesticData", data);
        //console.log("Returned data:", domesticData.data);
        const reg1KorOptionTemp = data.data.map((item: any) => ({
          value: item.codeValue,
          optionName: item.codeNm,
        }));

        console.log("--- reg1KorOptionTemp", reg1KorOptionTemp);
        setReg1KorOption(reg1KorOptionTemp);
      },
    }
  );

  // 두번째 선택 ( 국내 lev2 )
  const { data: domesticDataLv2 } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/code/list/shortly?topValue=domestic&midValue=` +
      selectReg1Option,
    fetcher,
    {
      onSuccess: (data) => {
        console.log("in domesticDataLv2", data);
        //console.log("Returned data:", domesticData.data);
        const reg2KorOptionTemp = data.data.map((item: any) => ({
          value: item.codeValue,
          optionName: item.codeNm,
        }));

        console.log("--- reg2KorOptionTemp", reg2KorOptionTemp);
        setReg2KorOption(reg2KorOptionTemp);
      },
    }
  );

  /*
  // 지역 1 선택에 따라 나오는 select box
  const setSelectLev02 = () => {
    const methods = useFormContext();
    const selectOption = methods.watch("region_1_gc");
    console.log("레벨 1 select", selectOption);
  };
  */

  // Common
  // [ 등록 ]
  const onSubmit = (data: any) => {
    console.log("[1-1] 등록 확인");
    console.log("data", data);
    console.log("region_1_gc", selectReg1Option);
    console.log("region_2_gc", selectReg2Option);

    let saveObj = {
      addr: data.addr,
      addrDetail: data.addrDetail,
      brno: data.brno,
      ftr: data.ftr,
      instTypeCc: data.inst_type_cc,
      instUniqueCodeMc: data.instUniqueCodeMc,
      itbsns: data.itbsns,
      lctnTypeCc: "BS_0200002",
      region1Gc: data.region_1_gc,
      region2Gc: data.region_2_gc,
      rprsNm: data.rprsNm,
      statusCodeCc: data.status_code_cc,
      tpbsns: data.tpbsns,
      zip: data.zip,
    };

    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));
    /*
    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/inst`; // Replace with your API URL
    axios
      .post(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          
          router.push("/cust/inst-info-list");
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
      });
      */
  };

  const defaultValues = {};

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="기관 등록" />
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
                {/* 
                <Radio
                  inputName="lctn_type_cc"
                  labelText="국내"
                  value="BS_0200002"
                  onChange={handleLocationChange}
                />
                <Radio
                  inputName="lctn_type_cc"
                  labelText="해외"
                  value="BS_0200001"
                  onChange={handleLocationChange}
                />
                */}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>기관명</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    disabled={true}
                    inputName="instUniqueCodeMc"
                    errorMessage="소속기관을 선택해 주세요."
                    placeholder="기관 코드"
                  />
                  <InputValidation
                    disabled={true}
                    inputName="instNm"
                    errorMessage="소속기관을 선택해 주세요."
                    placeholder="기관명"
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
                    errorMessage="업태 선택"
                    sx={{ width: 450 }}
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
                    errorMessage="업종 선택"
                    sx={{ width: 450 }}
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
                      errorMessage={false}
                      placeholder="zip code"
                    />
                    <PostCodeBtn />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      disabled={true}
                      sx={{ width: 450 }}
                      inputName="addr"
                      errorMessage={false}
                    />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 450 }}
                      inputName="addrDetail"
                      errorMessage={false}
                      placeholder="상세주소"
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>지역 1</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <SelectBox
                    inputName="region_1_gc"
                    options={reg1KorOption}
                    onChange={handleReg1Change}
                  />
                  <SelectBox
                    inputName="region_2_gc"
                    options={reg2KorOption}
                    onChange={handleReg2Change}
                    sx={{ ml: 10 }}
                  />
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
                  inputName="status_code_cc"
                  labelText="운영"
                  value="BS_0602001"
                />
                <Radio
                  inputName="status_code_cc"
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
    </Form>
  );
};

export default InstAdd;
