/**
 * 기관 수정
 * 1. 해당 페이지 기능들 파악
 *  - 수정
 *
 *
 */

"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
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
import LogUpdateTitle from "../../../../components/LogUpdateTitle";

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

import SkeletonLoading from "../../../../components/SkeletonLoading";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";

/*
const LazyAgncModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  }
);
*/

/*
instUkey : "KN6arzg1lO",
douzoneCode : "00107",
instUniqueCodeMc : "BS_0100004005",
lctnTypeCc : "BS_0200002",
lctnTypeVal : "국내",
instNm : "분당서울대학교 병원",
brno : 1212312343,
rprsNm : "대표자이름입니다.",
tpbsns : "업종입니다.",
itbsns : "업태입니다.",
zip : 12345,
addr : "서울시 중구",
addrDetail : "세종대로 랄랄라",
region1Gc : "11000",
region1Val : "서울특별시",
region2Gc : "11440",
region2Val : "마포구",
instTypeCc : "BS_0600001",
instTypeVal : "학교",
ftr : "사용자가 입력한 특성입니다.",
statusCodeCc : "BS_0602001",
statusCodeVal : "운영"
*/

/*
instUkey : string,
douzoneCode : string,
instUniqueCodeMc : string,
lctnTypeCc : string,
lctnTypeVal : string,
instNm : string,
brno? : number,
rprsNm? : string,
tpbsns? : string,
itbsns? : string,
zip? : number,
addr? : string,
addrDetail? : string,
region1Gc? : string,
region1Val? : string,
region2Gc? : string,
region2Val? : string,
instTypeCc? : string,
instTypeVal? : string,
ftr? : string,
statusCodeCc? : string,
statusCodeVal? : string

{
  "addr": "서울시 중구",
  "addrDetail": "세종대로 랄랄라",
  "brno": 1212312345,
  "ftr": "사용자가 입력한 특성",
  "instTypeCc": "B0000000",
  "instUkey": "instUkey",
  "itbsns": "업태",
  "lctnTypeCc": "B0000000",
  "region1Gc": "B0000000",
  "region2Gc": "B0000000",
  "rprsNm": "대표자이름",
  "statusCodeCc": "B0000000",
  "tpbsns": "업종",
  "zip": 12345
}

*/

interface FormData {
  instUkey: string;
  douzoneCode: string;

  addr?: string;
  addrDetail?: string;
  zip?: string;
  bsnsManagedByUkey?: string;
  custDetail?: string[];
  isSpecialMng?: any;
  isSpecialMngFlag?: boolean;
  memo?: string;
}

export default function AgncPIModifyPage() {
  const searchParams = useSearchParams();
  const params = searchParams.get("agncUkey");
  const uKey = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const methods = useForm<FormData>({
    defaultValues: () => {
      return fetch(
        `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/inst/${uKey}`
      )
        .then((res) => res.json())
        .then((getData) => {
          const data = getData.data;

          return {
            instNm: data.instNm,
            agncId: data.agncId,
            agncNm: data.agncNm,
            agncUkey: data.agncUkey,
            addr: data.addr,
            addrDetail: data.addrDetail,
            bsnsManagedByNm: data.bsnsManagedByNm,
            bsnsManagedByUkey: data.bsnsManagedByUkey,
            zip: data.zip,
            isSpecialMng: data.isSpecialMng,
            isSpecialMngFlag: data.isSpecialMng === "Y",
            memo: data.memo,
            pymnPrice: data.pymnPrice,
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

  // [ 수정 ]
  const onSubmit = (data: any) => {
    //console.log("selectedMembers", selectedMembers);

    let saveMemberList = selectedMembers.map(({ custUkey, isLeader }) => ({
      custUkey,
      isLeader,
    }));
    let isSpecialMngFlag = getValues("isSpecialMngFlag");
    let bsnsManagedByUkey = getValues("bsnsManagedByUkey");

    let saveObj = {
      addr: data.addr,
      addrDetail: data.addrDetail,
      agncNm: data.agncNm,
      agncUkey: data.agncUkey, // 수정에서 생김
      bsnsManagedByUkey,
      custDetailList: saveMemberList,
      zip: data.zip,
      isSpecialMng: isSpecialMngFlag == true ? "Y" : "N",
      memo: data.memo,
    };
    //console.log("==modify", saveObj);
    //console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc`; // Replace with your API URL

    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          //router.push("/cust/cust-list/" + slug);
          router.push("/cust/agnc-pi-list/" + uKey);
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
                  <TD sx={{ width: "85%" }}>
                    <InputValidation
                      inputName="instNm"
                      errorMessage={false}
                      disabled={true}
                    />
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>거래처(PI)명</TH>

                  <TD sx={{ width: "85%" }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        error={errors.agncNm ? true : false}
                        inputName="agncNm"
                        errorMessage={
                          errors.agncNm
                            ? "중복된 거래처명이 있습니다."
                            : "거래처(PI)를 입력해 주세요."
                        }
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
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
            운영 관리 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>상태</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Checkbox
                      inputName="isSpecialMngFlag"
                      labelText="특별 관리(SP)하는 거래처 입니다"
                      value=""
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>영업 담당자</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <SelectBox
                      inputName="bsnsManagedByUkey"
                      options={[
                        { value: "user656014", optionName: "키웨스트" },
                        { value: "user483349", optionName: "라이언" },
                        { value: "user369596", optionName: "모씨" },
                        { value: "user809094", optionName: "LINK" },
                        { value: "user623719", optionName: "코로그" },
                      ]}
                    />
                  </TD>
                </TableRow>
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
              onClick={() => router.push("/cust/agnc-pi-list")}
            />
            <ContainedButton buttonName="수정" type="submit" />
          </Stack>
        </Box>

        {/* 
        <Box sx={{ mb: 5 }}>
          <LogUpdateTitle logTitle="거래처(PI)" />
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyAgncModifyLog apiName="agnc" uKey={uKey} />
          </ErrorContainer>
        </Box>
*/}
      </Container>
    </FormProvider>
  );
}
