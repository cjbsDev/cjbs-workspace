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
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import {
  Checkbox,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  NewRadio,
  SkeletonLoading,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import LoadingSvg from "public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";
import ServiceTypeSelectbox from "./ServiceTypeSelectbox";
import PlatformSelectbox from "./PlatformSelectbox";
import SampleTotal from "./SampleTotal";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import axios from "axios";
import SixteenRadio from "./SixteenRadio";

const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/order/extr`;

const LazyCustSearchModal = dynamic(
  () => import("../../../components/CustSearchModal"),
  {
    ssr: false,
  }
);
const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
  ssr: false,
});

const LazySalesManagerSelctbox = dynamic(
  () => import("./SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

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

const LazyOrderType = dynamic(() => import("./OrderType"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySixteenCheck = dynamic(() => import("./SixteenCheck"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        // prefix="W"
      />
    );
  }
);

export default function Page() {
  const router = useRouter();
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const defaultValues = {
    srvcTypeMc: "BS_0100007004",
    anlsTypeMc: "BS_0100006004",
    platformMc: "BS_0100008001",
  };
  const methods = useForm();
  const {
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);
    const typeNumberPrice = Number(data.price);
    const typeNumbertaxonACnt = Number(data.taxonACnt);
    const typeNumbertaxonBCnt = Number(data.taxonBCnt);
    const typeNumbertaxonECnt = Number(data.taxonECnt);

    const bodyData = {
      addEmailList: data.addEmailList,
      agncUkey: data.agncUkey,
      anlsTypeMc: data.anlsTypeMc,
      bsnsMngrUkey: data.bsnsMngrUkey,
      custUkey: data.custUkey,
      isCheck16s: data.isCheck16s,
      mailRcpnList: data.mailRcpnList,
      memo: data.memo,
      orderTypeCc: data.orderTypeCc,
      ordrRcpnEmail: data.ordrRcpnEmail,
      ordrRcpnNm: data.ordrRcpnNm,
      ordrRcpnTel: data.ordrRcpnTel,
      platformMc: data.platformMc,
      price: typeNumberPrice,
      reqReturnList: data.reqReturnList,
      srvcTypeMc: data.srvcTypeMc,
      taxonACnt: typeNumbertaxonACnt,
      taxonBCnt: typeNumbertaxonBCnt,
      taxonECnt: typeNumbertaxonECnt,
    };

    console.log("Body Data ==>>", bodyData);

    // await axios
    //   .post(apiUrl, bodyData)
    //   .then((response) => {
    //     console.log("POST request successful:", response.data);
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
                    inputName="ebcEmail"
                    required={true}
                    errorMessage="아이디(이메일) 입력해 주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="custUkey"
                    required={true}
                    // errorMessage="키값 입력하세요."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="agncUkey"
                    required={true}
                    // errorMessage="키값 입력하세요."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="telList"
                    required={true}
                    // errorMessage="전화번호 입력하세요."
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
                    inputName="custNm"
                    required={true}
                    errorMessage="이름을 입력해 주세요."
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
                    required={true}
                    errorMessage="소속 거래처(PI)를 입력해 주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="subtitle1">신청인 정보</Typography>
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
                    inputName="ordrRcpnNm"
                    required={true}
                    errorMessage="이름을 입력해 주세요."
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
                    required={true}
                    errorMessage="이메일을 입력해 주세요."
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
                    required={true}
                    errorMessage="연락처 입력해 주세요."
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
              <TH sx={{ width: "15%" }}>메일 수신 설정[선택]</TH>
              <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                <Stack direction="row">
                  <Checkbox
                    inputName="mailRcpnList"
                    labelText="연구책임자"
                    value="agncLeaderRcpn"
                  />
                  <Checkbox
                    inputName="mailRcpnList"
                    labelText="신청인"
                    value="ordrRcpn"
                  />
                  <Checkbox
                    inputName="mailRcpnList"
                    labelText="추가(직접입력)"
                    value="etcRcpn"
                  />
                  <InputValidation
                    inputName="addEmailList"
                    placeholder="여러개 입력시','로 구분하세요."
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
              <TH sx={{ width: "15%" }}>Taxon 개수</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="taxonBCnt"
                    required={true}
                    errorMessage="개수를 입력해 주세요."
                    pattern={/^[0-9]+$/}
                    patternErrMsg="숫자만 입력해 주세요."
                    sx={{
                      width: 100,
                      ".MuiOutlinedInput-input": {
                        textAlign: "end",
                      },
                    }}
                    inputMode="numeric"
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
                    required={true}
                    errorMessage="개수를 입력해 주세요."
                    pattern={/^[0-9]+$/}
                    patternErrMsg="숫자만 입력해 주세요."
                    sx={{
                      width: 100,
                      ".MuiOutlinedInput-input": {
                        textAlign: "end",
                      },
                    }}
                    inputMode="numeric"
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
                    required={true}
                    errorMessage="개수를 입력해 주세요."
                    pattern={/^[0-9]+$/}
                    patternErrMsg="숫자만 입력해 주세요."
                    sx={{
                      width: 100,
                      ".MuiOutlinedInput-input": {
                        textAlign: "end",
                      },
                    }}
                    inputMode="numeric"
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
            <TableRow>
              <TH sx={{ width: "15%" }}>샘플개수</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <SampleTotal />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>오더 타입</TH>
              <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyOrderType />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>반송 요청[선택]</TH>
              <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                <Stack direction="row">
                  <Checkbox
                    inputName="reqReturnList"
                    labelText="DNA 반송 요청"
                    value="dnaReturnReq"
                  />
                  <Checkbox
                    inputName="reqReturnList"
                    labelText="샘플 반송 요청"
                    value="sampleReturnReq"
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">추가 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>16s 확인 요청</TH>
              <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                {/*<ErrorContainer FallbackComponent={Fallback}>*/}
                {/*  <LazySixteenCheck />*/}
                {/*</ErrorContainer>*/}

                {/*<SixteenRadio />*/}

                {/*<Stack direction="row">*/}
                {/*  <NewRadio*/}
                {/*    required={true}*/}
                {/*    inputName="isCheck16s"*/}
                {/*    labelText="요청함"*/}
                {/*    value="Y"*/}
                {/*  />*/}
                {/*  <NewRadio*/}
                {/*    required={true}*/}
                {/*    inputName="isCheck16s"*/}
                {/*    labelText="요청안함"*/}
                {/*    value="N"*/}
                {/*  />*/}
                {/*</Stack>*/}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>오더 금액</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="price"
                    required={true}
                    errorMessage="오더 금액을 입력해 주세요."
                    // pattern={/\B(?=(\d{3})+(?!\d))/g}
                    // patternErrMsg="숫자만 입력해 주세요."
                    sx={{
                      width: 160,
                      ".MuiOutlinedInput-input": {
                        textAlign: "end",
                      },
                    }}
                    inputMode="numeric"
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="body2" sx={{ color: "black" }}>
                            원
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>영업 담당자</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazySalesManagerSelctbox />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>메모[선택]</TH>
              <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="memo"
                  placeholder="메모"
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