"use client";

import {
  Box,
  IconButton,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CheckboxGV,
  CheckboxSV,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  PostCodeBtn,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import React, { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { fetcherOrsh } from "api";
import { AddressDeleteButton } from "@components/AddressDeleteButton";
import { useFormContext } from "react-hook-form";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import MyIcon from "icon/MyIcon";
import AddEmailInput from "@app/(pages)/order/AddEmailInput";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
}));

const LazyEzbcIdSearchModal = dynamic(() => import("./CustSearchModal"), {
  ssr: false,
});

const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
  ssr: false,
});

const dataMailRcpnListGV = [
  { value: "agncLeaderRcpn", optionName: "연구책임자" },
  { value: "ordrAplcRcpn", optionName: "신청인" },
  { value: "etcRcpn", optionName: "추가 이메일(직접입력)" },
];

const DeleteComponent = () => {
  const { setValue, getValues } = useFormContext();
  const clearFormValue = () => {
    setValue("rstFileRcpnEmail", "");
  };

  return (
    <OutlinedButton
      size="small"
      buttonName="삭제"
      color={"error"}
      onClick={() => {
        clearFormValue();
      }}
    />
  );
};

export default function OrdererInfo(props: JSON) {

  // const {watch} = useFormContext();
  const defaultValues = {
    mailRcpnList: ["agncLeaderRcpn", "ordrAplcRcpn"],
  };

  const router = useRouter();

  const [showCustSearchModal, setShowCustSearchModal] =
    useState<boolean>(false);
  const custSearchModalOpen = () => {
    setShowCustSearchModal(true);
  };

  // 모달 닫기
  const custSearchModalClose = () => {
    setShowCustSearchModal(false);
  };

  const { data: custTemp } = useSWR(`/cust/info`, fetcherOrsh, {
    suspense: true,
  });

  const custData = custTemp.data;

  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    console.log("**************************************");
    // setIsLoading(true);
    console.log("Submit Data ==>>", data);
    const inputCustData = {
      addEmailList: data.addEmailList,
      agncAddr: data.addr,
      agncAddrDetail: data.addrDetail,
      agncNm: data.agncNm,
      agncZip: data.zip,
      ebcEmail: data.ebcEmail,
      instNm: data.instNm,
      mailRcpnList: data.mailRcpnList,
      ordrAplcEmail: data.ordrAplcEmail,
      ordrAplcNm: data.ordrAplcNm,
      ordrAplcTel: data.ordrAplcTel,
      rhpiId: data.rhpiId,
      rhpiNm: data.rhpiNm,
      rhpiTel: data.rhpiTel,
      rstFileRcpnEmail: data.rstFileRcpnEmail,
    };
    const termData = {
      isAgree: "Y",
      termId: data.termId,
    };
    const returnData = {
      custAgnc: inputCustData,
      term: termData,
    };
    props.addBodyData(returnData);
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
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
                  {/*<InputValidation*/}
                  {/*    sx={{ display: "none" }}*/}
                  {/*    inputName="agncId"*/}
                  {/*    required={true}*/}
                  {/*    defaultValue={custData.custAgnc.agncId ?? ""}*/}
                  {/*/>*/}
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
                  {/*<InputValidation*/}
                  {/*    sx={{ display: "none" }}*/}
                  {/*    inputName="instMc"*/}
                  {/*    required={false}*/}
                  {/*    defaultValue={custData.custAgnc.instMc ?? ""}*/}
                  {/*/>*/}
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

      <Stack direction="row" alignItems="center" spacing={1}>
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
                주소{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "80%" }} colSpan={5}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      // inputName="agncZip"
                      inputName="zip"
                      placeholder="우편번호"
                      required={true}
                      errorMessage="우편번호를 입력해 주세요."
                      defaultValue={custData.custAgnc.agncZip ?? ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <Box>
                      <PostCodeBtn />
                    </Box>
                    <Box>
                      <AddressDeleteButton />
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      // inputName="agncAddr"
                      inputName="addr"
                      required={true}
                      errorMessage="주소를 입력해 주세요."
                      sx={{ width: 600 }}
                      defaultValue={custData.custAgnc.agncAddr ?? ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      // inputName="agncAddrDetail"
                      inputName="addrDetail"
                      required={true}
                      errorMessage="상세주소를 입력해 주세요."
                      maxLength={50}
                      maxLengthErrMsg="50자 이내로 입력해주세요."
                      placeholder="상세주소"
                      sx={{ width: 600 }}
                      defaultValue={custData.custAgnc.agncAddrDetail ?? ""}
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>

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
                  <AddEmailInput />
                  {/*<InputValidation*/}
                  {/*  inputName="addEmailList"*/}
                  {/*  placeholder="example@gmail.com, example2@gmail.com"*/}
                  {/*  pattern={*/}
                  {/*    /^[\w\.-]+@[\w\.-]+\.\w+(,\s*[\w\.-]+@[\w\.-]+\.\w+)*$/*/}
                  {/*  }*/}
                  {/*  patternErrMsg="이메일 형식이 아닙니다."*/}
                  {/*  sx={{ width: 550 }}*/}
                  {/*/>*/}
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "20%" }}>
                결과파일 수신 계정 변경
                <LightTooltip
                  // title={"결과파일 수신 할 계정을 변경합니다. 변경 시 대표 계정이 아닌 등록한 계정에 업로드 됩니다."}
                  title={
                    <Typography variant="body2" sx={{}}>
                      결과파일 수신 할 계정을 변경합니다. 변경 시 대표 계정이
                      아닌 등록한 계정에 업로드 됩니다.
                    </Typography>
                  }
                  arrow
                >
                  <IconButton size="small">
                    <MyIcon icon="question-circle" size={20} />
                  </IconButton>
                </LightTooltip>
              </TH>
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
                  <DeleteComponent />
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

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <ContainedButton
          type="submit"
          buttonName="다음"
          // endIcon={
          //     isLoading ? (
          //         <LoadingSvg stroke="white" width={20} height={20} />
          //     ) : null
          // }
        />
      </Stack>

      <LazyEzbcIdSearchModal
        onClose={custSearchModalClose}
        open={showCustSearchModal}
        modalWidth={600}
        // setCodeDataChange={setCodeDataChange}
      />
    </Form>
  );
}
