"use client";

import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CheckboxGV,
  InputValidation,
  OutlinedButton,
  PostCodeBtn,
  RadioGV,
  TD,
  TH,
} from "cjbsDSTM";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { fetcherOrsh } from "api";
import { AddressDeleteButton } from "../../../components/AddressDeleteButton";
import { useFormContext } from "react-hook-form";

const LazyEzbcIdSearchModal = dynamic(() => import("./CustSearchModal"), {
  ssr: false,
});

const dataRadioGV = [
  { value: "Y", optionName: "요청함" },
  { value: "N", optionName: "요청안함" },
];

const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
  ssr: false,
});

const dataMailRcpnListGV = [
  { value: "agncLeaderRcpn", optionName: "연구책임자" },
  { value: "ordrAplcRcpn", optionName: "신청인" },
  { value: "etcRcpn", optionName: "추가 이메일(직접입력)" },
];

export default function OrdererInfo() {
  const methods = useFormContext();
  const { setValue, getValues } = methods;
  // const values = getValues(["rhpiNm", "ebcEmail", "rhpiTel"]);

  const [showCustSearchModal, setShowCustSearchModal] =
    useState<boolean>(false);
  const [prjcCode, setPrjcCode] = useState<string>("");

  // [ 프로젝트 검색 ] 모달 오픈
  const custSearchModalOpen = () => {
    setShowCustSearchModal(true);
  };

  // 모달 닫기
  const custSearchModalClose = () => {
    setShowCustSearchModal(false);
  };

  // const setCodeDataChange = (code: string) => {
  //   setPrjcCode(code);
  // };

  const { data: custTemp } = useSWR(`/cust/info`, fetcherOrsh, {
    suspense: true,
  });
  const custData = custTemp.data;

  console.log("CUST DATA ==>>", custData);

  const clearFormValue = () => {
    setValue("rstFileRcpnEmail", "");
  };

  // const onSubmit = async (data: any) => {
  //   console.log("**************************************");
  //   // setIsLoading(true);
  //   console.log("Submit Data ==>>", data);
  //   const inputCustData = {
  //     addEmailList: data.addEmailList,
  //     agncAddr: data.addr,
  //     agncAddrDetail: data.addrDetail,
  //     agncNm: data.agncNm,
  //     agncZip: data.zip,
  //     ebcEmail: data.ebcEmail,
  //     instNm: data.instNm,
  //     mailRcpnList: data.mailRcpnList,
  //     ordrAplcEmail: data.ordrAplcEmail,
  //     ordrAplcNm: data.ordrAplcNm,
  //     ordrAplcTel: data.ordrAplcTel,
  //     rhpiId: data.rhpiId,
  //     rhpiNm: data.rhpiNm,
  //     rhpiTel: data.rhpiTel,
  //   };
  //   const termData = {
  //     isAgree: 'Y',
  //     termId: data.termId
  //   }
  //   const returnData = {
  //     custAgnc: inputCustData,
  //     term: termData
  //   };
  //   props.addBodyData(returnData);
  // };

  return (
    // <Form onSubmit={onSubmit} defaultValues={defaultValues}>
    <>
      <Typography variant="subtitle1">주문자 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>Ezbiocloud 계정</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <Typography variant="body2" sx={{}}>
                    {custData.custAgnc.ebcEmail ?? ""}
                    &nbsp;
                    <Box
                      sx={{ color: "#006ECD", fontSize: 12 }}
                      component="span"
                    >
                      해당 계정으로 결과가 업로드 됩니다.
                    </Box>
                  </Typography>
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="ebcEmail"
                    required={true}
                    defaultValue={custData.custAgnc.ebcEmail ?? ""}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="termId"
                    required={true}
                    defaultValue={custData.term.termId}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "20%" }}>
                연구책임자{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "30%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="rhpiNm"
                    required={true}
                    errorMessage="연구책임자 이름을 입력해 주세요."
                    placeholder="연구책임자 이름을 입력해 주세요."
                    sx={{ width: 306 }}
                    defaultValue={custData.custAgnc.rhpiNm ?? ""}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="rhpiId"
                    required={false}
                    defaultValue={custData.custAgnc.rhpiId ?? ""}
                  />
                </Stack>
              </TD>
              <TH sx={{ width: "20%" }}>연락처</TH>
              <TD sx={{ width: "30%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="rhpiTel"
                    required={false}
                    // errorMessage="이름을 입력해 주세요."
                    pattern={/^[0-9,]*$/}
                    patternErrMsg="숫자, ,(콤마)만 입력 가능합니다."
                    placeholder="숫자만 입력해 주세요."
                    sx={{ width: 306 }}
                    defaultValue={custData.custAgnc.rhpiTel ?? ""}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "20%" }}>
                기관{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "30%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="instNm"
                    required={true}
                    errorMessage="기관명을 입력해 주세요."
                    placeholder="기관명을 입력해 주세요."
                    sx={{ width: 306 }}
                    defaultValue={custData.custAgnc.instNm ?? ""}
                  />
                </Stack>
              </TD>
              <TH sx={{ width: "20%" }}>
                연구 부서{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "30%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="agncNm"
                    required={true}
                    errorMessage="연구 부서를 입력해 주세요."
                    placeholder="연구 부서를 입력해 주세요."
                    sx={{ width: 306 }}
                    InputProps={
                      {
                        // readOnly: true,
                      }
                    }
                    defaultValue={custData.custAgnc.agncNm ?? ""}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="subtitle1">신청인 정보</Typography>
        <LazyQuickCopy />
      </Stack>

      <TableContainer sx={{ mb: 5, mt: 1 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "20%" }}>
                신청인{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "30%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="ordrAplcNm"
                    required={true}
                    errorMessage="신청인 이름을 입력해 주세요."
                    placeholder="신청인 이름을 입력해 주세요."
                    sx={{ width: 306 }}
                    InputProps={
                      {
                        // readOnly: true,
                      }
                    }
                  />
                </Stack>
              </TD>
              <TH sx={{ width: "20%" }}>
                신청인 이메일{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "30%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="ordrAplcEmail"
                    required={true}
                    errorMessage="이메일을 입력해 주세요."
                    placeholder="이메일을 입력해 주세요."
                    pattern={
                      /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    }
                    patternErrMsg="이메일 형식이 아닙니다."
                    sx={{ width: 306 }}
                    InputProps={
                      {
                        // readOnly: true,
                      }
                    }
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "20%" }}>
                연락처{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "80%" }} colSpan={3}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="ordrAplcTel"
                    required={true}
                    errorMessage="연락처를 입력해 주세요."
                    pattern={/^[0-9,]*$/}
                    patternErrMsg="숫자, ,(콤마)만 입력 가능합니다."
                    placeholder="연락처를 입력해 주세요."
                    sx={{ width: 306 }}
                    InputProps={
                      {
                        // readOnly: true,
                      }
                    }
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" sx={{}}>
        부가 정보
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "20%" }}>
                진행사항 메일 수신 설정{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "80%" }} colSpan={5}>
                <Stack direction="row">
                  <CheckboxGV
                    data={dataMailRcpnListGV}
                    inputName="mailRcpnList"
                    required={true}
                    errorMessage="진행사항 메일 수신 설정 항목은 필수 입니다."
                  />
                  <InputValidation
                    inputName="addEmailList"
                    // placeholder="여러개 입력시','로 구분하세요."
                    placeholder="example@gmail.com, example2@gmail.com"
                    sx={{ width: 550 }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "20%" }}>결과파일 수신 계정 변경</TH>
              <TD sx={{ width: "80%" }} colSpan={5}>
                <Stack direction="row" spacing={1}>
                  <InputValidation
                    inputName="rstFileRcpnEmail"
                    placeholder="example@cj.net"
                    sx={{ width: 306 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <OutlinedButton
                    size="small"
                    buttonName="계정 등록"
                    onClick={() => {
                      custSearchModalOpen();
                    }}
                  />
                  <OutlinedButton
                    size="small"
                    buttonName="삭제"
                    color={"error"}
                    onClick={() => {
                      clearFormValue();
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "20%" }}>16S 확인 요청 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>*/}
            {/*  <TD sx={{ width: "80%" }} colSpan={5}>*/}
            {/*    <Stack direction="row" spacing={1}>*/}
            {/*      <RadioGV*/}
            {/*        data={dataRadioGV}*/}
            {/*        inputName="isRdnaIdnt16S"*/}
            {/*        required={true}*/}
            {/*        errorMessage="선택 해주세요"*/}
            {/*      />*/}
            {/*    </Stack>*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
            <TableRow>
              <TH sx={{ width: "20%" }}>
                샘플 반송 요청{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "80%" }} colSpan={5}>
                <Stack direction="row" spacing={1}>
                  <RadioGV
                    data={dataRadioGV}
                    inputName="isRtrnRasn"
                    required={true}
                    errorMessage="선택 해주세요"
                  />
                </Stack>
              </TD>
            </TableRow>
            {/*<TableRow>*/}
            {/*    <TH sx={{ width: "20%" }}>영업담당자 (선택)</TH>*/}
            {/*    <TD sx={{ width: "80%" }} colSpan={5}>*/}
            {/*        <ErrorContainer FallbackComponent={Fallback}>*/}
            {/*            <LazySalesManagerSelctbox />*/}
            {/*        </ErrorContainer>*/}
            {/*    </TD>*/}
            {/*</TableRow>*/}
          </TableBody>
        </Table>
      </TableContainer>

      <LazyEzbcIdSearchModal
        onClose={custSearchModalClose}
        open={showCustSearchModal}
        modalWidth={600}
        // setCodeDataChange={setCodeDataChange}
      />
    </>
    // </Form>
  );
}
