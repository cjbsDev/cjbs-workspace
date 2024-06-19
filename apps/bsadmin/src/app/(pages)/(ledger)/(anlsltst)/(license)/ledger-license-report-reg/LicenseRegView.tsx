"use client";
import * as React from "react";
import { useCallback, useState, useRef } from "react";

import dynamic from "next/dynamic";
import {
  Box,
  BoxProps,
  InputAdornment,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  LinkButton,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import LoadingWhiteSvg from "../../../../../components/LoadingWhiteSvg";
import { useRouter } from "next-nprogress-bar";
import { GET, POST } from "api";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
import { getDefaultValues } from "./getDefaultValues";
import { cjbsTheme } from "cjbsDSTM/themes";

import { useRecoilState } from "recoil";
import { groupListDataAtom } from "../../../../../recoil/atoms/groupListDataAtom";
import { toggledClearRowsAtom } from "../../../../../recoil/atoms/toggled-clear-rows-atom";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import MonthlyList from "./MonthlyList";
import { addDays, subDays } from "date-fns";
import DynamicLiceseSumTable from "./DynamicLicenseSumTable";
import SalesManagerSelectbox from "../../../../../components/SalesManagerSelectbox";
import TotalPrice from "./TotalPrice";
import AnalysisSampleDynamicTable from "./LicenseSampleDynamicTable";
import DynamicTableLicense from "../../../../../components/DynamicTableLicense";
import DynamicSumTableLicense from "../../../../../components/DynamicSumTableLicense";

// 플랫폼 모달
const LazyLicenseListModal = dynamic(
  () => import("../../../../../components/LicenseListModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

// 거래처 검색
const LazyAgncSearchAnlsltstModal = dynamic(
  () => import("../../../../../components/AgncSearchAnlsltstModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyAnalysisListModal = dynamic(
  () => import("../../../../../components/AnalysisListModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazySalesManagerSelectbox = dynamic(
  () => import("../../../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LicenseRegView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();
  // const { getValues, setValue} = useFormContext();

  const [showAnalysisSearchModal, setShowAnalysisSearchModal] =
    useState<boolean>(false);
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [platformSelectChk, setPlatformSelectChk] = useState<boolean>(false);
  // const [ukeyValue, setUkeyValue] = useState<string>(null);

  // const [isSampleSelected, setIsSampleSelected] = useState<boolean>(false);
  const [settlement, setSettlement] = useState<boolean>(false);
  // const [selectSampleList, setSelectSampleList] = useRecoilState(groupListDataAtom);
  // const [clearRowsAtom, setClearRowsAtom] = useRecoilState(toggledClearRowsAtom);
  const [selectSampleListData, setSelectSampleListData] = useState<any>({});
  // [기관 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  // defaultValues 세팅
  // const defaultValues = getDefaultValues(orshType, orshExtrData);
  const defaultValues = {
    // ...commonValues,
    srvcCtgrMc: "BS_0100005002",
  };
  // console.log("DefaultValues ==>>", defaultValues);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    if (data.sample.length <= 0) {
      toast("해당 오더에 포함된 분석 내역이 없습니다.");
      return false;
    }

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", selectSampleListData);

    const sampleUkeyList = () => {
      let sampleList = data.sample;

      sampleList.map((item: any, index: any) => {
        console.log("item", item);
        // console.log("selectSampleListData.hasOwnProperty(item.srvcTypeMc)", selectSampleListData.hasOwnProperty(item.srvcTypeMc));
        if (selectSampleListData.hasOwnProperty(item.srvcTypeMc)) {
          console.log(
            "selectSampleListData",
            selectSampleListData[item.srvcTypeMc]["sampleUkey"],
          );
          sampleList[index]["sampleUkey"] =
            selectSampleListData[item.srvcTypeMc]["sampleUkey"];
        } else {
          sampleList[index]["sampleUkey"] = [];
        }
        // sampleList[index]["sampleUkey"] = selectSampleListData[item.srvcTypeMc]["sampleUkey"];
        sampleList[index]["stndPrice"] =
          typeof sampleList[index]["stndPrice"] === "string"
            ? sampleList[index]["stndPrice"]
            : Number(sampleList[index]["stndPrice"].replaceAll(",", ""));
        sampleList[index]["supplyPrice"] = Number(
          sampleList[index]["supplyPrice"].replaceAll(",", ""),
        );
        sampleList[index]["unitPrice"] = Number(
          sampleList[index]["unitPrice"].replaceAll(",", ""),
        );
        sampleList[index]["vat"] = Number(
          sampleList[index]["vat"].replaceAll(",", ""),
        );
      });
      return sampleList;
    };

    const bodyData = {
      agncUkey: data.agncUkey,
      anlsDttm: dayjs(data.anlsDttm).format("YYYY-MM-DD"),
      anlsTypeMc: data.anlsTypeMc,
      costList: sampleUkeyList(),
      depthMc: "BS_0100010001",
      memo: data.memo,
      orderUkey: null,
      pltfMc: data.pltfMc,
      srvcCtgrMc: data.srvcCtgrMc,
      totalCnt: data.totalCnt,
      totalPrice: data.totalPrice,
      totalSupplyPrice: data.totalSupplyPrice,
      vat: data.vat,
    };

    console.log("bodyData", bodyData);

    const apiUrl: string = `/anls/itst`;
    await POST(apiUrl, bodyData)
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          toast("등록 되었습니다.");
          setIsLoading(false);
          mutate(apiUrl);
          router.push("/ledger-analysis-report-list");
        } else {
          toast(response.message);
        }
      })
      .catch((error) => {
        console.error("POST request failed:", error);
        // toast(error.)
      })
      .finally(() => {
        setIsLoading(false);
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

  // [ 기관 검색 ] 모달 오픈
  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };
  // [ 기관 검색 ] 모달 close
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
    // console.log("getInstNm", getValues("instNm"));
    // console.log("getAgncNm", getValues("agncNm"));
  };

  const handlePlatformChange = (orderUkey: string) => {
    setPlatformSelectChk(true);
    // setUkeyValue(orderUkey);
    // setSelectSampleList({});
    // setClearRowsAtom(true);
  };

  const standDate = () => {
    // const now = new Date("2024-03-01");
    const now = new Date();
    const nowDate: number = now.getDate();
    let startDate;
    let endDate;
    // const nowDate= 5;
    console.log("nowDate : ", nowDate);
    let startMonth: number = 0;
    let endMonth: number = 0;
    if (nowDate < 6) {
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      startMonth = startDate.getMonth();
      endDate = new Date(now.setMonth(now.getMonth() + 2));
      endMonth = endDate.getMonth();
    } else {
      startDate = new Date(now);
      startMonth = startDate.getMonth();
      endDate = new Date(now.setMonth(now.getMonth() + 1));
      endMonth = endDate.getMonth();
    }
    console.log("startMonth : ", startMonth);
    console.log("endMonth : ", endMonth);

    return [
      {
        start: subDays(new Date(startDate.setDate(1)), 1),
        end: addDays(new Date(endDate.setDate(5)), 0),
      },
    ];
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="분석 내역서 등록" />
        </Box>

        <Typography variant="subtitle1">기본정보</Typography>
        <TableContainer sx={{ mb: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>서비스 분류</TH>
                <TD sx={{ width: "85%", textAlign: "left" }}>
                  License
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="srvcCtgrMc"
                    required={true}
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>플랫폼</TH>
                <TD sx={{ width: "85%" }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {/*<InputValidation*/}
                    {/*  inputName="orderId"*/}
                    {/*  required={true}*/}
                    {/*  errorMessage="플랫폼을 입력해 주세요."*/}
                    {/*  sx={{ width: 500 }}*/}
                    {/*  InputProps={{*/}
                    {/*    readOnly: true,*/}
                    {/*  }}*/}
                    {/*/>*/}
                    {/*<InputValidation*/}
                    {/*  sx={{ display: "none" }}*/}
                    {/*  inputName="orderUkey"*/}
                    {/*  required={true}*/}
                    {/*  InputProps={{*/}
                    {/*    readOnly: true,*/}
                    {/*    hidden: true,*/}
                    {/*  }}*/}
                    {/*/>*/}
                    {/*<InputValidation*/}
                    {/*  sx={{ display: "none" }}*/}
                    {/*  inputName="agncUkey"*/}
                    {/*  required={true}*/}
                    {/*  InputProps={{*/}
                    {/*    readOnly: true,*/}
                    {/*    hidden: true,*/}
                    {/*  }}*/}
                    {/*/>*/}
                    <InputValidation
                      inputName="pltfValueView"
                      required={true}
                      errorMessage="플랫폼을 입력해 주세요."
                      sx={{ width: "500px" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <InputValidation
                      sx={{ display: "none" }}
                      inputName="pltfMc"
                      required={true}
                      InputProps={{
                        readOnly: true,
                        hidden: true,
                      }}
                    />
                    <InputValidation
                      sx={{ display: "none" }}
                      inputName="anlsTypeMc"
                      required={true}
                      InputProps={{
                        readOnly: true,
                        hidden: true,
                      }}
                    />
                    <OutlinedButton
                      size="small"
                      buttonName="플랫폼 검색"
                      onClick={handleCustSearchModalOpen}
                    />
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>

          {/*{platformSelectChk == true && (*/}
          {/*  <Table>*/}
          {/*    <TableBody>*/}
          {/*      <TableRow>*/}
          {/*        <TH sx={{ width: "15%", borderTop: 0 }}>플랫폼</TH>*/}
          {/*        <TD sx={{ width: "35%", borderTop: 0, textAlign: "left" }}>*/}
          {/*          <InputValidation*/}
          {/*            inputName="pltfValueView"*/}
          {/*            required={true}*/}
          {/*            errorMessage="플랫폼을 입력해 주세요."*/}
          {/*            sx={{ width: "100%" }}*/}
          {/*            InputProps={{*/}
          {/*              readOnly: true,*/}
          {/*            }}*/}
          {/*          />*/}
          {/*          <InputValidation*/}
          {/*            // sx={{ display: "none" }}*/}
          {/*            inputName="pltfMc"*/}
          {/*            required={true}*/}
          {/*            InputProps={{*/}
          {/*              readOnly: true,*/}
          {/*              hidden: true,*/}
          {/*            }}*/}
          {/*          />*/}
          {/*          <InputValidation*/}
          {/*            // sx={{ display: "none" }}*/}
          {/*            inputName="anlsTypeMc"*/}
          {/*            required={true}*/}
          {/*            InputProps={{*/}
          {/*              readOnly: true,*/}
          {/*              hidden: true,*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </TD>*/}
          {/*        <TH sx={{ width: "15%", borderTop: 0 }}>생산량</TH>*/}
          {/*        <TD sx={{ width: "35%", borderTop: 0, textAlign: "left" }}>*/}
          {/*          <InputValidation*/}
          {/*            inputName="depthVal"*/}
          {/*            // required={true}*/}
          {/*            // errorMessage="오더를 입력해 주세요."*/}
          {/*            sx={{ width: "100%" }}*/}
          {/*            InputProps={{*/}
          {/*              readOnly: true,*/}
          {/*            }}*/}
          {/*          />*/}
          {/*          <InputValidation*/}
          {/*            inputName="depthMc"*/}
          {/*            // required={true}*/}
          {/*            // errorMessage="오더를 입력해 주세요."*/}
          {/*            sx={{ width: "100%", display: "none" }}*/}
          {/*            InputProps={{*/}
          {/*              readOnly: true,*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </TD>*/}
          {/*      </TableRow>*/}
          {/*    </TableBody>*/}
          {/*  </Table>*/}
          {/*)}*/}
        </TableContainer>

        {platformSelectChk == false && (
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              border: `1px solid ${cjbsTheme.palette.grey.A400}`,
              mb: 5,
              p: 5,
            }}
          >
            <Stack spacing={1} justifyContent="center" alignItems="center">
              <Typography variant="body2">
                License의 경우, 플랫폼을 먼저 입력해주세요.
              </Typography>
              <Typography variant="body2">
                이렇게 하면 추가 정보(고객정보와 분석내역 등)를 입력할 수
                있습니다.
              </Typography>
            </Stack>
          </Stack>
        )}

        {platformSelectChk == true && (
          <>
            <Typography variant="subtitle1">고객정보</Typography>
            <TableContainer sx={{ mb: 5 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                    <TD sx={{ width: "35%" }}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <InputValidation
                          inputName="agncNm"
                          required={false}
                          // errorMessage="소속 거래처(PI)를 입력해 주세요."
                          sx={{ width: "530px" }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <OutlinedButton
                          size="small"
                          buttonName="거래처 검색"
                          onClick={agncSearchModalOpen}
                        />
                      </Stack>
                    </TD>
                    <TH sx={{ width: "15%" }}>연구책임자</TH>
                    <TD sx={{ width: "35%" }}>
                      <InputValidation
                        inputName="custNm"
                        required={false}
                        // errorMessage="연구책임자를 입력해 주세요."
                        sx={{ width: "100%" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>영업 담당자</TH>
                    <TD sx={{ width: "35%" }}>
                      {/*<InputValidation*/}
                      {/*  inputName="bsnsMngrVal"*/}
                      {/*  required={true}*/}
                      {/*  errorMessage="영엄 담당자 선택해 주세요"*/}
                      {/*  sx={{ width: "100%" }}*/}
                      {/*  InputProps={{*/}
                      {/*    readOnly: true,*/}
                      {/*  }}*/}
                      {/*/>*/}

                      <ErrorContainer FallbackComponent={Fallback}>
                        <LazySalesManagerSelectbox />
                      </ErrorContainer>
                    </TD>
                    <TH sx={{ width: "15%" }}>선결제 금액</TH>
                    <TD sx={{ width: "35%" }}>
                      <InputValidation
                        inputName="rmnPrePymtPrice"
                        required={true}
                        errorMessage="이름을 입력해 주세요."
                        sx={{ width: "100%" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </TD>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box>
              {/* 신규 작업중... */}
              {/*<DynamicTableLicense />*/}
              {/*<DynamicSumTableLicense />*/}

              <AnalysisSampleDynamicTable setSettlement={setSettlement} />

              <TableContainer sx={{ mb: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TH sx={{ width: "15%" }}>분석일</TH>
                      <TD sx={{}}>
                        <SingleDatePicker
                          inputName="anlsDttm"
                          required={true}
                          includeDateIntervals={standDate()}
                        />
                      </TD>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <TableContainer sx={{ mb: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      {/*<TH sx={{ width: "15%" }}>분석일</TH>*/}
                      {/*<TD sx={{ width: "35%" }}>*/}
                      {/*  <SingleDatePicker*/}
                      {/*    inputName="anlsDttm"*/}
                      {/*    required={true}*/}
                      {/*    includeDateIntervals={standDate()}*/}
                      {/*  />*/}
                      {/*</TD>*/}
                      {/*<TH sx={{ width: "15%" }}>총 수량</TH>*/}
                      {/*<TD sx={{ width: "35%" }}>*/}
                      {/*  <InputValidation*/}
                      {/*    inputName="totalCnt"*/}
                      {/*    required={true}*/}
                      {/*    // errorMessage="연구책임자를 입력해 주세요."*/}
                      {/*    sx={{*/}
                      {/*      width: "100%",*/}
                      {/*      ".MuiOutlinedInput-input": {*/}
                      {/*        textAlign: "end",*/}
                      {/*      },*/}
                      {/*    }}*/}
                      {/*    InputProps={{*/}
                      {/*      readOnly: true,*/}
                      {/*    }}*/}
                      {/*  />*/}
                      {/*</TD>*/}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <TableContainer sx={{ mb: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TH sx={{ width: "15%" }}>총 수량</TH>
                      <TD sx={{}}>
                        <InputValidation
                          inputName="totalCnt"
                          required={true}
                          // errorMessage="연구책임자를 입력해 주세요."
                          sx={{
                            width: "100%",
                            ".MuiOutlinedInput-input": {
                              textAlign: "end",
                            },
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </TD>
                      <TH sx={{ width: "15%" }}>총 공급가액</TH>
                      <TD sx={{}}>
                        <InputValidation
                          inputName="totalSupplyPriceVal"
                          required={true}
                          sx={{
                            width: "100%",
                            ".MuiOutlinedInput-input": {
                              textAlign: "end",
                            },
                            "&.MuiTextField-root": {
                              backgroundColor: "#F1F3F5",
                            },
                          }}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography
                                  variant="body2"
                                  sx={{ color: "black" }}
                                >
                                  원
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <InputValidation
                          inputName="totalSupplyPrice"
                          required={true}
                          // errorMessage="아이디(이메일) 입력해 주세요."
                          sx={{ width: "100%", display: "none" }}
                        />
                      </TD>
                      <TH sx={{ width: "15%" }}>부가세</TH>
                      <TD sx={{}}>
                        <InputValidation
                          inputName="vatVal"
                          required={true}
                          sx={{
                            width: "100%",
                            ".MuiOutlinedInput-input": {
                              textAlign: "end",
                            },
                            "&.MuiTextField-root": {
                              backgroundColor: "#F1F3F5",
                            },
                          }}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography
                                  variant="body2"
                                  sx={{ color: "black" }}
                                >
                                  원
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <InputValidation
                          inputName="vat"
                          required={true}
                          // errorMessage="아이디(이메일) 입력해 주세요."
                          sx={{
                            width: "100%",
                            display: "none",
                          }}
                        />
                      </TD>
                    </TableRow>
                    <TableRow>
                      <TH sx={{ width: "15%" }}>합계금액</TH>
                      <TD sx={{ width: "85%" }} colSpan={5}>
                        <InputValidation
                          inputName="totalPriceVal"
                          required={true}
                          sx={{
                            width: "100%",
                            ".MuiOutlinedInput-input": {
                              textAlign: "end",
                            },
                            "&.MuiTextField-root": {
                              backgroundColor: "#F1F3F5",
                            },
                          }}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography
                                  variant="body2"
                                  sx={{ color: "black" }}
                                >
                                  원
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <InputValidation
                          inputName="totalPrice"
                          required={true}
                          // errorMessage="아이디(이메일) 입력해 주세요."
                          sx={{ width: "100%", display: "none" }}
                        />
                      </TD>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <MonthlyList />

              <Typography variant="subtitle1">정산</Typography>
              <TableContainer sx={{ mb: 5 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TH sx={{ width: "15%" }}>남은금액</TH>
                      <TD sx={{ width: "85%" }}>
                        <InputValidation
                          inputName="remainingAmount"
                          required={true}
                          sx={{
                            width: "100%",
                            ".MuiOutlinedInput-input": {
                              textAlign: "end",
                            },
                            "&.MuiTextField-root": {
                              backgroundColor: "#F1F3F5",
                            },
                          }}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography
                                  variant="body2"
                                  sx={{ color: "black" }}
                                >
                                  원
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </TD>
                    </TableRow>
                    {settlement === true && (
                      <TableRow>
                        <TH sx={{ width: "15%" }}>정산이력</TH>
                        <TD sx={{ width: "85%" }}>
                          <TableContainer sx={{ mb: 1 }}>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TH sx={{ width: "25%" }}>방법</TH>
                                  <TH sx={{ width: "25%" }}>구분</TH>
                                  <TH sx={{ width: "25%" }}>비용</TH>
                                  <TH sx={{ width: "25%" }}>비고</TH>
                                </TableRow>
                                <TableRow>
                                  <TD sx={{ width: "25%" }}>선결제</TD>
                                  <TD sx={{ width: "25%" }}>자동 정산 예정</TD>
                                  <TD sx={{ width: "25%" }}>
                                    <InputValidation
                                      inputName="settlementCost"
                                      required={true}
                                      sx={{
                                        width: "100%",
                                        ".MuiOutlinedInput-input": {
                                          textAlign: "end",
                                        },
                                        "&.MuiTextField-root": {
                                          backgroundColor: "#F1F3F5",
                                        },
                                      }}
                                      InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <Typography
                                              variant="body2"
                                              sx={{ color: "black" }}
                                            >
                                              원
                                            </Typography>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </TD>
                                  <TD sx={{ width: "25%" }}>-</TD>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TableContainer sx={{ display: "none" }}>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TH sx={{ width: "25%" }}>정산방법</TH>
                                  <TH sx={{ width: "25%" }}>구분</TH>
                                  <TH sx={{ width: "25%" }}>정산비용</TH>
                                  <TH sx={{ width: "25%" }}>비고</TH>
                                </TableRow>
                                <TableRow>
                                  <TD sx={{ width: "25%" }}>선결제</TD>
                                  <TD sx={{ width: "25%" }}>자동 정산</TD>
                                  <TD sx={{ width: "25%" }}>-1,000,000</TD>
                                  <TD sx={{ width: "25%" }}>
                                    <ContainedButton
                                      size="small"
                                      // type="submit"
                                      color="secondary"
                                      buttonName="정산내역"
                                    />
                                  </TD>
                                </TableRow>
                                <TableRow>
                                  <TD sx={{ width: "25%" }}>세금계산서</TD>
                                  <TD sx={{ width: "25%" }}>카드</TD>
                                  <TD sx={{ width: "25%" }}>-50,000</TD>
                                  <TD sx={{ width: "25%" }}>123445</TD>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </TD>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="subtitle1">기타정보</Typography>
              <TableContainer sx={{ mb: 5 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TH sx={{ width: "15%" }}>
                        메모<NotRequired>[선택]</NotRequired>
                      </TH>
                      <TD sx={{ width: "85%", textAlign: "left" }}>
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

              <Stack direction="row" spacing={0.5} justifyContent="center">
                <Link href="/ledger-analysis-report-list">
                  <OutlinedButton size="small" buttonName="목록" />
                </Link>

                <ContainedButton
                  size="small"
                  type="submit"
                  buttonName="저장"
                  endIcon={isLoading ? <LoadingWhiteSvg /> : null}
                />
              </Stack>
            </Box>
          </>
        )}

        {/* 플랫폼 검색 모달*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyLicenseListModal
            onClose={handleCustSearchModalClose}
            handlePlatformChange={handlePlatformChange}
            open={custSearchModalOpen}
            modalWidth={1200}
            type="license"
          />
        </ErrorContainer>

        {/* 거래처 검색 모달*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncSearchAnlsltstModal
            onClose={agncSearchModalClose}
            open={showAgncSearchModal}
            modalWidth={800}
            type="order"
          />
        </ErrorContainer>
      </>
    </Form>
  );
};

export default LicenseRegView;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
