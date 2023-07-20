"use client";

import dynamic from "next/dynamic";
import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  Checkbox,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  SkeletonLoading,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import * as React from "react";
import { useForm } from "react-hook-form";
import LoadingSvg from "public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";
import ServiceTypeSelectbox from "./ServiceTypeSelectbox";
import PlatformSelectbox from "./PlatformSelectbox";
const LazyCustSearchModal = dynamic(
  () => import("../../../components/CustSearchModal"),
  {
    ssr: false,
  }
);
const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
  ssr: false,
});

const LazyServiceTypeSelctbox = dynamic(
  () => import("./ServiceTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const LazyAnalysisTypeSelctbox = dynamic(
  () => import("./AnalysisTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const LazyPlatformSelctbox = dynamic(() => import("./PlatformSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

export default function Page() {
  const router = useRouter();
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const defaultValues = {
    srvcTypeMc: "BS_0100007004",
    anlsTypeMc: "BS_0100007004",
    platformMc: "BS_0100008001",
  };
  const methods = useForm();
  const {
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/order/extr`; // Replace with your API URL

    const bodyData = {
      addEmailList: "string",
      agncUkey: "string",
      anlsTypeMc: "string",
      custUkey: data.custUkey,
      isAgncLeaderRcpn: "N",
      isCheck16s: "N",
      isEtcRcpn: "N",
      isFastTrack: "N",
      isOrdrRcpn: "N",
      isReqReturnDna: "N",
      isReqReturnSample: "N",
      memo: "string",
      orderTypeCc: "string",
      ordrRcpnEmail: "string",
      ordrRcpnNm: "string",
      ordrRcpnTel: "string",
      platformMc: "string",
      price: 0,
      sampleCnt: 0,
      srvcTypeMc: "string",
      taxonACnt: 0,
      taxonBCnt: 0,
      taxonECnt: 0,
      userUkey: "string",
    };

    // await axios
    //   .post(apiUrl, bodyData)
    //   .then((response) => {
    //     console.log("PUT request successful:", response.data);
    //     if (response.data.success) {
    //       router.push("/order/order-list");
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("POST request failed:", error);
    //   });
  };
  // [ 고객 검색 ] 모달 오픈
  const handleCustSearchModalOpen = () => {
    setCustSearchModalOpen(true);
  };
  // [ 고객 검색 ] 모달 닫기
  const handleCustSearchModalClose = () => {
    setCustSearchModalOpen(false);
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="오더 등록" />
      </Box>

      <Typography variant="subtitle1" sx={{}}>
        연구책임자 정보
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>아이디(이메일)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    // disabled={true}
                    required={true}
                    inputName="ebcEmail"
                    errorMessage="연구책임자를 선택해주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="custUkey"
                    errorMessage="필수 값입니다."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="telList"
                    errorMessage={false}
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />

                  <OutlinedButton
                    size="small"
                    buttonName="아이디 검색"
                    onClick={handleCustSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    // disabled={true}
                    inputName="custNm"
                    errorMessage="연구책임자를 선택해주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>소속 거래처(PI)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="agncNm"
                    errorMessage="거래처(PI)를 입력해 주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "15%" }}>PI</TH>*/}
            {/*  <TD sx={{ width: "85%" }} colSpan={5}>*/}
            {/*    <Stack direction="row" spacing={0.5} alignItems="center">*/}
            {/*      <InputValidation*/}
            {/*        inputName="agncNm"*/}
            {/*        errorMessage="거래처(PI)를 입력해 주세요."*/}
            {/*        sx={{ width: 600 }}*/}
            {/*        InputProps={{*/}
            {/*          readOnly: true,*/}
            {/*        }}*/}
            {/*      />*/}
            {/*    </Stack>*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="subtitle1" sx={{}}>
          신청인 정보
        </Typography>
        <LazyQuickCopy />
      </Stack>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    // disabled={true}
                    inputName="ordrRcpnNm"
                    errorMessage="이름을 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>이메일</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="ordrRcpnEmail"
                    errorMessage="연구책임자를 선택해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>연락처</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="ordrRcpnTel"
                    errorMessage="거래처(PI)를 입력해 주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      type: "tel",
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">주문 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>메일 수신 설정(선택)</TH>
              <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                <Stack direction="row">
                  <Checkbox
                    inputName="isAgncLeaderRcpn"
                    labelText="연구책임자"
                    value="Y1"
                  />
                  <Checkbox
                    inputName="isAgncLeaderRcpn"
                    labelText="추가(직접입력)"
                    value="Y2"
                  />
                  <InputValidation
                    inputName="addEmailList"
                    errorMessage={false}
                    sx={{ width: 450 }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>서비스 타입</TH>
              <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyServiceTypeSelctbox />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>분석종류</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyAnalysisTypeSelctbox />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>플랫폼</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <PlatformSelectbox />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>샘플개수</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <InputValidation
                  required={true}
                  inputName="sampleCnt"
                  errorMessage="샘플개수를 입력하세요."
                  pattern={/^[0-9]+$/}
                  patternErrMsg="숫자만 입력 하세요."
                  sx={{ width: 100 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2" sx={{ color: "black" }}>
                          개
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>Taxon 개수</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="taxonBCnt"
                    errorMessage="숫자만 입력해 주세요."
                    pattern={/^[0-9]+$/}
                    sx={{ width: 100 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            variant="body2"
                            sx={{ color: "green", fontWeight: "600" }}
                          >
                            B
                          </Typography>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="body2" sx={{ color: "black" }}>
                            개
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <InputValidation
                    inputName="taxonECnt"
                    errorMessage="숫자만 입력해 주세요."
                    pattern={/^[0-9]+$/}
                    sx={{ width: 100 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            variant="body2"
                            sx={{ color: "blue", fontWeight: "600" }}
                          >
                            E
                          </Typography>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="body2" sx={{ color: "black" }}>
                            개
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <InputValidation
                    inputName="taxonACnt"
                    errorMessage="숫자만 입력해 주세요."
                    pattern={/^[0-9]+$/}
                    sx={{ width: 100 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            variant="body2"
                            sx={{ color: "red", fontWeight: "600" }}
                          >
                            A
                          </Typography>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="body2" sx={{ color: "black" }}>
                            개
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
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

        <ContainedButton
          type="submit"
          buttonName="저장"
          endIcon={
            isLoading ? (
              <LoadingSvg stroke="white" width={20} height={20} />
            ) : null
          }
        />
      </Stack>

      {/* 고객 검색 모달*/}
      <LazyCustSearchModal
        onClose={handleCustSearchModalClose}
        open={custSearchModalOpen}
        modalWidth={800}
      />
    </Form>
  );
}
