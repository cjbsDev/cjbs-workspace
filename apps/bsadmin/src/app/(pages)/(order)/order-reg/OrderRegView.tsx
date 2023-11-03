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
  styled,
  BoxProps,
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
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import * as React from "react";
import LoadingSvg from "public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";
import PlatformSelectbox from "./PlatformSelectbox";
import SampleTotal from "./SampleTotal";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import SixteenCheck from "./SixteenCheck";
import {
  emailReceiveSettingData,
  reqReturnListData,
} from "../../../data/inputDataLists";
import { useCallback, useState } from "react";
import MyIcon from "icon/MyIcon";
import { fetcher, POST } from "api";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Research from "../order-intn-reg/Research";
import Link from "next/link";

const apiUrl = `/order/extr`;

const LazyCustSearchModal = dynamic(
  () => import("../../../components/CustSearchModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySalesManagerSelctbox = dynamic(
  () => import("../../../components/SalesManagerSelectbox"),
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

const LazyOrderType = dynamic(() => import("../../../components/OrderType"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyProjectSearchModal = dynamic(() => import("./ProjectSearchModal"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyNGSManagerSelctbox = dynamic(
  () => import("../../../components/NGSAnlManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

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
      />
    );
  }
);

const OrderRegView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addEmailChck, setAddEmailChck] = useState<boolean>(false);

  // 주문서에서 오더 등록 할때
  // const from = searchParams.get("from");
  const orshUkey = searchParams.get("orshUkey");
  console.log("orshUkey", orshUkey);
  const orshType = searchParams.get("orshType");
  console.log("orshType", typeof orshType);
  const { data: orshExtrData } = useSWR(
    () => (orshUkey !== null ? `/orsh/bs/${orshType}/${orshUkey}` : null),
    fetcher,
    {
      suspense: true,
    }
  );

  console.log("orshExtrData", orshExtrData);

  // defaultValues
  const defaultValues = {
    srvcTypeMc: "BS_0100007004",
    anlsTypeMc: "BS_0100006004",
    pltfMc: "BS_0100008001",
    taxonBCnt: 0,
    taxonECnt: 0,
    taxonACnt: 0,
    mailRcpnList: ["agncLeaderRcpn", "ordrAplcRcpn"],
    orderTypeCc: "BS_0800001",
    isCheck16s: "Y",
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    if (data.mailRcpnList.includes("etcRcpn") && data.addEmailList === "") {
      setAddEmailChck(true);
    }

    const typeNumberPrice = Number(data.price.replace(",", ""));
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
      ordrAplcEmail: data.ordrAplcEmail,
      ordrAplcNm: data.ordrAplcNm,
      ordrAplcTel: data.ordrAplcTel,
      pltfMc: data.pltfMc,
      price: typeNumberPrice,
      reqReturnList: data.reqReturnList,
      srvcTypeMc: data.srvcTypeMc,
      taxonACnt: typeNumbertaxonACnt,
      taxonBCnt: typeNumbertaxonBCnt,
      taxonECnt: typeNumbertaxonECnt,
    };

    console.log("Body Data ==>>", bodyData);

    await POST(apiUrl, bodyData)
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          setIsLoading(false);
          router.push("/order-list");
        }
      })
      .catch((error) => {
        console.error("POST request failed:", error);
      });
  };
  // [ 고객 검색 ] 모달 오픈
  const handleCustSearchModalOpen = () => {
    setCustSearchModalOpen(true);
  };
  // [ 고객 검색 ] 모달 닫기
  const handleCustSearchModalClose = useCallback(() => {
    setCustSearchModalOpen(false);
  }, []);

  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // // [ 프로젝트 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  return (
    <>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1
            titleName={"오더 등록" + `${orshType === "intn" ? " (내부)" : ""}`}
          />
        </Box>

        <Typography variant="subtitle1">연구책임자 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>아이디(이메일)</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.2} alignItems="flex-start">
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

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ mb: 1 }}
        >
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
                      inputName="ordrAplcNm"
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
                      inputName="ordrAplcEmail"
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
                      inputName="ordrAplcTel"
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

        {/* intn */}
        <Typography
          variant="subtitle1"
          sx={{ display: orshType === "intn" ? "block" : "none" }}
        >
          과제 및 연구
        </Typography>
        <TableContainer
          sx={{ mb: 5, display: orshType === "intn" ? "block" : "none" }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>과제</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  <Stack direction="row" spacing={0.5} alignItems="flex-start">
                    <InputValidation
                      inputName="prjtCodeMc"
                      disabled={true}
                      required={true}
                      errorMessage="과제를 검색 & 선택해주세요."
                      placeholder="과제 코드"
                      sx={{ width: 200 }}
                    />
                    <InputValidation
                      inputName="prjcNm"
                      disabled={true}
                      required={true}
                      errorMessage="과제를 검색 & 선택해주세요."
                      placeholder="과제를 선택해주세요"
                      sx={{ width: 600 }}
                    />
                    <OutlinedButton
                      size="small"
                      buttonName="과제 검색"
                      onClick={agncSearchModalOpen}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>연구</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  <Research />
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
                <TH sx={{ width: "15%" }}>메일 수신 설정</TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <Stack direction="row" alignItems="center">
                    <CheckboxGV
                      data={emailReceiveSettingData}
                      inputName="mailRcpnList"
                      required={true}
                      errorMessage="메일 수신 설정을 선택해 주세요."
                    />
                    <InputValidation
                      required={addEmailChck}
                      errorMessage={
                        addEmailChck ? "이메일을 입력해 주세요." : null
                      }
                      inputName="addEmailList"
                      placeholder="example@gmail.com, example2@gmail.com"
                      sx={{ width: 450 }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              {/* intn */}
              <TableRow>
                <TH sx={{ width: "15%" }}>결과파일 수신 계정 변경</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      placeholder="example@gmail.com"
                      inputName="rstFileRcpnEmail"
                      required={true}
                      errorMessage="이메일을 입력해 주세요."
                      sx={{ width: 600 }}
                      InputProps={{
                        type: "email",
                      }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              {/*<TableRow>*/}
              {/*  <TH sx={{ width: "15%" }}>결과파일 수신 계정 변경</TH>*/}
              {/*  <TD sx={{ width: "85%" }} colSpan={5}>*/}
              {/*    <Stack direction="row" spacing={0.5} alignItems="center">*/}
              {/*      <InputValidation*/}
              {/*        placeholder="example@gmail.com"*/}
              {/*        inputName="rstFileRcpnEmail"*/}
              {/*        required={true}*/}
              {/*        errorMessage="이메일을 입력해 주세요."*/}
              {/*        sx={{ width: 600 }}*/}
              {/*        InputProps={{*/}
              {/*          type: "email",*/}
              {/*        }}*/}
              {/*      />*/}
              {/*    </Stack>*/}
              {/*  </TD>*/}
              {/*</TableRow>*/}

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
                          <InputAdornment position="start" sx={{ ml: -1 }}>
                            <MyIcon icon="B" size={20} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end" sx={{ mr: -0.5 }}>
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
                          <InputAdornment position="start" sx={{ ml: -1 }}>
                            <MyIcon icon="E" size={20} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end" sx={{ mr: -0.5 }}>
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
                          <InputAdornment position="start" sx={{ ml: -1 }}>
                            <MyIcon icon="A" size={20} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end" sx={{ mr: -0.5 }}>
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
                <TH sx={{ width: "15%" }}>반송 요청</TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <CheckboxGV
                    data={reqReturnListData}
                    inputName="reqReturnList"
                    // required={true}
                    // errorMessage="반송 요청을 선택해 주새요."
                  />
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
                <TH sx={{ width: "15%" }}>16s 확인</TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <SixteenCheck />
                  {/*<ErrorContainer FallbackComponent={Fallback}>*/}
                  {/*  <LazySixteenCheck />*/}
                  {/*</ErrorContainer>*/}
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
                    maxLength={500}
                    maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                  />
                </TD>
              </TableRow>

              {/* intn */}
              <TableRow>
                <TH sx={{ width: "15%" }}>
                  Fast Track<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <CheckboxSV
                    inputName="isFastTrack"
                    labelText="Fast Track으로 진행합니다"
                    value="Y"
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>영업 담당자</TH>
                <TD sx={{ width: "85%" }}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazySalesManagerSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>
                  Prep 담당자<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyNGSManagerSelctbox inputName="qcMngrUkey" />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>
                  Lib 담당자<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyNGSManagerSelctbox inputName="libMngrUkey" />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>
                  Seq 담당자<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyNGSManagerSelctbox inputName="seqMngrUkey" />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>
                  메모<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <InputValidation
                    fullWidth={true}
                    multiline
                    rows={4}
                    inputName="memo"
                    placeholder="메모"
                    maxLength={500}
                    maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                  />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 고객 검색 모달*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCustSearchModal
            onClose={handleCustSearchModalClose}
            open={custSearchModalOpen}
            modalWidth={800}
            type="order"
          />
        </ErrorContainer>

        {/* 프로젝트 검색 모달*/}
        <LazyProjectSearchModal
          onClose={agncSearchModalClose}
          open={showAgncSearchModal}
          modalWidth={1000}
        />

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="목록"
            onClick={() => router.push("/order-list")}
          />
          {/*<Link href={from !== null ? from : "/order-list"}>*/}
          {/*  <OutlinedButton size="small" buttonName="목록" />*/}
          {/*</Link>*/}

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
      </Form>
    </>
  );
};

export default OrderRegView;
const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
