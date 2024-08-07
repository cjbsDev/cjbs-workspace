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
import { LoadingButton } from "@mui/lab";
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
import { fetcher, POST } from "api";
import { useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
import { getDefaultValues } from "./getDefaultValues";
import { cjbsTheme } from "cjbsDSTM/themes";
import AnalysisSampleDynamicTable from "./AnalysisSampleDynamicTable";
import { useRecoilState } from "recoil";
import { groupListDataAtom } from "../../../../../recoil/atoms/groupListDataAtom";
import { toggledClearRowsAtom } from "../../../../../recoil/atoms/toggled-clear-rows-atom";
import dayjs from "dayjs";
import { addDays, subDays } from "date-fns";
import DynamicTableAnalysis from "../../../../../components/DynamicTableAnalysis";
import DynamicSumTableAnalysis from "../../../../../components/DynamicSumTableAnalysis";
import RemainingAmount from "./RemainingAmount";
import EtcContainer from "./EtcContainer";
import SettlementContainer from "./SettlementContainer";
import SubmitContainer from "./SubmitContainer";
import RmnPrePymPrice from "./RmnPrePymPrice";

const LazyOrderSearchModal = dynamic(
  () => import("../../../../../components/OrderSearchModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
// const LazyAnalysisListModal = dynamic(
//   () => import("../../../../../components/AnalysisListModal"),
//   {
//     ssr: false,
//     loading: () => <Typography variant="body2">Loading...</Typography>,
//   },
// );

const LazySalesManagerSelectbox = dynamic(
  () => import("../../../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const AnalysisRegView = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const orderUkey = searchParams.get("orderUkey");
  // const sampleUkeyList = searchParams.get("sampleUkeyList");
  // console.log("searchParams Value ==>>", orderUkey, sampleUkeyList);

  // const { data } = useSWR(
  //   `/anls/itst/${orderUkey}/sample?sampleUkeyList=${sampleUkeyList}`,
  //   fetcher,
  //   {
  //     suspense: true,
  //   },
  // );
  // const { anlsItstCostDetailList, anlsItstCustInfo, anlsItstInfo } = data;

  const { mutate } = useSWRConfig();

  const [showAnalysisSearchModal, setShowAnalysisSearchModal] =
    useState<boolean>(false);
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderSelectChk, setOrderSelectChk] = useState<boolean>(false);
  const [ukeyValue, setUkeyValue] = useState<string>(null);

  const [isSampleSelected, setIsSampleSelected] = useState<boolean>(false);
  const [settlement, setSettlement] = useState<boolean>(false);
  const [selectSampleList, setSelectSampleList] =
    useRecoilState(groupListDataAtom);
  const [clearRowsAtom, setClearRowsAtom] =
    useRecoilState(toggledClearRowsAtom);
  const [selectSampleListData, setSelectSampleListData] = useState<any>({});

  // defaultValues 세팅
  // const defaultValues = getDefaultValues(orshType, orshExtrData);
  const defaultValues = {
    // ...commonValues,
    srvcCtgrMc: "BS_0100005001",
  };
  // console.log("DefaultValues ==>>", defaultValues);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    if (data.costList.length <= 0) {
      toast("해당 오더에 포함된 분석 내역이 없습니다.");
      return false;
    }

    // costList에 들어 있는 vat타입을 숫자로 변경
    // data.costList.map((item) => {
    //   item.vat = Number(item.vat.replace(/,/g, ""));
    //   // item.sampleUkey = [];
    // });

    // if (data.sample.length <= 0) {
    //   toast("해당 오더에 포함된 분석 내역이 없습니다.");
    //   return false;
    // }

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", selectSampleListData);

    // const sampleUkeyList = () => {
    //   let sampleList = data.sample;
    //
    //   sampleList.map((item: any, index: any) => {
    //     console.log("item", item);
    //     // console.log("selectSampleListData.hasOwnProperty(item.srvcTypeMc)", selectSampleListData.hasOwnProperty(item.srvcTypeMc));
    //     if (selectSampleListData.hasOwnProperty(item.srvcTypeMc)) {
    //       console.log(
    //         "selectSampleListData",
    //         selectSampleListData[item.srvcTypeMc]["sampleUkey"],
    //       );
    //       sampleList[index]["sampleUkey"] =
    //         selectSampleListData[item.srvcTypeMc]["sampleUkey"];
    //     } else {
    //       sampleList[index]["sampleUkey"] = [];
    //     }
    //     // sampleList[index]["sampleUkey"] = selectSampleListData[item.srvcTypeMc]["sampleUkey"];
    //     sampleList[index]["stndPrice"] = Number(
    //       sampleList[index]["stndPrice"].replaceAll(",", ""),
    //     );
    //     sampleList[index]["supplyPrice"] = Number(
    //       sampleList[index]["supplyPrice"].replaceAll(",", ""),
    //     );
    //     sampleList[index]["unitPrice"] = Number(
    //       sampleList[index]["unitPrice"].replaceAll(",", ""),
    //     );
    //     sampleList[index]["vat"] = Number(
    //       sampleList[index]["vat"].replaceAll(",", ""),
    //     );
    //   });
    //   return sampleList;
    // };

    const bodyData = {
      agncUkey: data.agncUkey,
      anlsDttm: dayjs(data.anlsDttm).format("YYYY-MM-DD"),
      anlsTypeMc: data.anlsTypeMc,
      bsnsMngrUkey: data.bsnsMngrUkey,
      // costList: sampleUkeyList(),
      costList: data.costList,
      depthMc: data.depthMc,
      memo: data.memo,
      orderUkey: data.orderUkey,
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

  const analysisSearchModalOpen = () => {
    setShowAnalysisSearchModal(true);
  };
  const analysisSearchModalClose = () => {
    setShowAnalysisSearchModal(false);
  };

  const handleOrderChange = (orderUkey: string) => {
    setOrderSelectChk(true);
    setUkeyValue(orderUkey);
    setSelectSampleList({});
    setClearRowsAtom(true);
  };

  const handleAddSampleList = (selectSampleData: any) => {
    console.log("selectSampleData : ", selectSampleData);
    setSelectSampleList(selectSampleData);
    if (selectSampleData.length > 0) {
      setIsSampleSelected(true);
    } else {
      setIsSampleSelected(false);
    }
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
                  {/*<ErrorContainer FallbackComponent={Fallback}>*/}
                  {/*  <LazyServiceCategoryType handleOnChange={handleOnChange} />*/}
                  {/*</ErrorContainer>*/}
                  <Typography variant="body2">Analysis</Typography>
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
                <TH sx={{ width: "15%" }}>오더</TH>
                <TD sx={{ width: "85%" }}>
                  <Stack direction="row" spacing={0.3} alignItems="center">
                    <InputValidation
                      inputName="orderId"
                      required={true}
                      errorMessage="오더를 입력해 주세요."
                      sx={{ width: 100 }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <InputValidation
                      sx={{ display: "none" }}
                      inputName="orderUkey"
                      required={true}
                      InputProps={{
                        readOnly: true,
                        hidden: true,
                      }}
                    />
                    <InputValidation
                      sx={{ display: "none" }}
                      inputName="agncUkey"
                      required={true}
                      InputProps={{
                        readOnly: true,
                        hidden: true,
                      }}
                    />
                    <OutlinedButton
                      size="small"
                      buttonName="오더 검색"
                      onClick={handleCustSearchModalOpen}
                    />
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>

          {orderSelectChk == true && (
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%", borderTop: 0 }}>플랫폼</TH>
                  <TD sx={{ width: "35%", borderTop: 0, textAlign: "left" }}>
                    <InputValidation
                      inputName="pltfValueView"
                      required={false}
                      sx={{ width: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <InputValidation
                      sx={{ display: "none" }}
                      inputName="pltfMc"
                      // required={true}
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
                  </TD>
                  <TH sx={{ width: "15%", borderTop: 0 }}>생산량</TH>
                  <TD sx={{ width: "35%", borderTop: 0, textAlign: "left" }}>
                    <InputValidation
                      inputName="depthVal"
                      // required={true}
                      // errorMessage="오더를 입력해 주세요."
                      sx={{ width: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <InputValidation
                      inputName="depthMc"
                      // required={true}
                      // errorMessage="오더를 입력해 주세요."
                      sx={{ width: "100%", display: "none" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {orderSelectChk == false && (
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
                Analysis의 경우,등록된 오더를 먼저 입력해주세요.
              </Typography>
              <Typography variant="body2">
                이렇게 하면 오더에 등록된 고객정보와 분석내역을 자동으로 가져올
                수 있습니다.
              </Typography>
            </Stack>
          </Stack>
        )}
        {orderSelectChk == true && (
          <>
            <Typography variant="subtitle1">고객정보</Typography>
            <TableContainer sx={{ mb: 5 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                    <TD sx={{ width: "35%" }}>
                      <InputValidation
                        inputName="agncNm"
                        required={false}
                        // errorMessage="소속 거래처(PI)를 입력해 주세요."
                        sx={{ width: "100%" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </TD>
                    <TH sx={{ width: "15%" }}>연구책임자</TH>
                    <TD sx={{ width: "35%" }}>
                      <InputValidation
                        inputName="custNm"
                        // required={false}
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
                      {/*  errorMessage="영업 담당자 입력해 주세요."*/}
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
                      <RmnPrePymPrice />
                      {/*<InputValidation*/}
                      {/*  inputName="rmnPrePymtPrice"*/}
                      {/*  required={true}*/}
                      {/*  errorMessage="선결제 금액 입력해 주세요."*/}
                      {/*  sx={{ width: "100%" }}*/}
                      {/*  InputProps={{*/}
                      {/*    readOnly: true,*/}
                      {/*  }}*/}
                      {/*/>*/}
                    </TD>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <DynamicTableAnalysis />
            <DynamicSumTableAnalysis />
            <SettlementContainer />
            <EtcContainer />
            <SubmitContainer />

            {/*{isSampleSelected === false && (*/}
            {/*  <Stack*/}
            {/*    spacing={1}*/}
            {/*    justifyContent="center"*/}
            {/*    alignItems="center"*/}
            {/*    sx={{*/}
            {/*      border: `1px solid ${cjbsTheme.palette.grey.A400}`,*/}
            {/*      mb: 3,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <Stack*/}
            {/*      spacing={1}*/}
            {/*      justifyContent="center"*/}
            {/*      alignItems="center"*/}
            {/*      sx={{ width: "100%" }}*/}
            {/*    >*/}
            {/*      <LinkButton*/}
            {/*        buttonName="해당 영역을 클릭하면 선택한 주문의 서비스 유형별 분석 정보를 가져올 수 있습니다."*/}
            {/*        sx={{ width: "100%", height: "100px" }}*/}
            {/*        onClick={analysisSearchModalOpen}*/}
            {/*      />*/}
            {/*    </Stack>*/}
            {/*  </Stack>*/}
            {/*)}*/}
            {/*<Box*/}
            {/*  sx={{ display: isSampleSelected === false ? "none" : "block" }}*/}
            {/*>*/}
            {/*  <AnalysisSampleDynamicTable*/}
            {/*    analysisSearchModalOpen={analysisSearchModalOpen}*/}
            {/*    setSettlement={setSettlement}*/}
            {/*    setSelectSampleListData={setSelectSampleListData}*/}
            {/*  />*/}

            {/*  <TableContainer sx={{ mb: 5 }}>*/}
            {/*    <Table>*/}
            {/*      <TableBody>*/}
            {/*        <TableRow>*/}
            {/*          <TH sx={{ width: "15%" }}>분석일</TH>*/}
            {/*          <TD sx={{ width: "35%" }}>*/}
            {/*            <SingleDatePicker*/}
            {/*              inputName="anlsDttm"*/}
            {/*              required={true}*/}
            {/*              includeDateIntervals={standDate()}*/}
            {/*            />*/}
            {/*          </TD>*/}
            {/*          <TH sx={{ width: "15%" }}>총 수량</TH>*/}
            {/*          <TD sx={{ width: "35%" }}>*/}
            {/*            <InputValidation*/}
            {/*              inputName="totalCnt"*/}
            {/*              required={true}*/}
            {/*              // errorMessage="연구책임자를 입력해 주세요."*/}
            {/*              sx={{*/}
            {/*                width: "100%",*/}
            {/*                ".MuiOutlinedInput-input": {*/}
            {/*                  textAlign: "end",*/}
            {/*                },*/}
            {/*              }}*/}
            {/*              InputProps={{*/}
            {/*                readOnly: true,*/}
            {/*              }}*/}
            {/*            />*/}
            {/*          </TD>*/}
            {/*        </TableRow>*/}
            {/*        <TableRow>*/}
            {/*          <TH sx={{ width: "15%" }}>총 공급가액</TH>*/}
            {/*          <TD sx={{ width: "35%" }}>*/}
            {/*            <InputValidation*/}
            {/*              inputName="totalSupplyPriceVal"*/}
            {/*              required={true}*/}
            {/*              sx={{*/}
            {/*                width: "100%",*/}
            {/*                ".MuiOutlinedInput-input": {*/}
            {/*                  textAlign: "end",*/}
            {/*                },*/}
            {/*                "&.MuiTextField-root": {*/}
            {/*                  backgroundColor: "#F1F3F5",*/}
            {/*                },*/}
            {/*              }}*/}
            {/*              InputProps={{*/}
            {/*                readOnly: true,*/}
            {/*                endAdornment: (*/}
            {/*                  <InputAdornment position="end">*/}
            {/*                    <Typography*/}
            {/*                      variant="body2"*/}
            {/*                      sx={{ color: "black" }}*/}
            {/*                    >*/}
            {/*                      원*/}
            {/*                    </Typography>*/}
            {/*                  </InputAdornment>*/}
            {/*                ),*/}
            {/*              }}*/}
            {/*            />*/}
            {/*            <InputValidation*/}
            {/*              inputName="totalSupplyPrice"*/}
            {/*              required={true}*/}
            {/*              // errorMessage="아이디(이메일) 입력해 주세요."*/}
            {/*              sx={{ width: "100%", display: "none" }}*/}
            {/*            />*/}
            {/*          </TD>*/}
            {/*          <TH sx={{ width: "15%" }}>부가세</TH>*/}
            {/*          <TD sx={{ width: "35%" }}>*/}
            {/*            <InputValidation*/}
            {/*              inputName="vatVal"*/}
            {/*              required={true}*/}
            {/*              sx={{*/}
            {/*                width: "100%",*/}
            {/*                ".MuiOutlinedInput-input": {*/}
            {/*                  textAlign: "end",*/}
            {/*                },*/}
            {/*                "&.MuiTextField-root": {*/}
            {/*                  backgroundColor: "#F1F3F5",*/}
            {/*                },*/}
            {/*              }}*/}
            {/*              InputProps={{*/}
            {/*                readOnly: true,*/}
            {/*                endAdornment: (*/}
            {/*                  <InputAdornment position="end">*/}
            {/*                    <Typography*/}
            {/*                      variant="body2"*/}
            {/*                      sx={{ color: "black" }}*/}
            {/*                    >*/}
            {/*                      원*/}
            {/*                    </Typography>*/}
            {/*                  </InputAdornment>*/}
            {/*                ),*/}
            {/*              }}*/}
            {/*            />*/}
            {/*            <InputValidation*/}
            {/*              inputName="vat"*/}
            {/*              required={true}*/}
            {/*              // errorMessage="아이디(이메일) 입력해 주세요."*/}
            {/*              sx={{*/}
            {/*                width: "100%",*/}
            {/*                // display: "none"*/}
            {/*              }}*/}
            {/*            />*/}
            {/*          </TD>*/}
            {/*        </TableRow>*/}
            {/*        <TableRow>*/}
            {/*          <TH sx={{ width: "15%" }}>합계금액</TH>*/}
            {/*          <TD sx={{ width: "85%" }} colSpan={3}>*/}
            {/*            <InputValidation*/}
            {/*              inputName="totalPriceVal"*/}
            {/*              required={true}*/}
            {/*              sx={{*/}
            {/*                width: "100%",*/}
            {/*                ".MuiOutlinedInput-input": {*/}
            {/*                  textAlign: "end",*/}
            {/*                },*/}
            {/*                "&.MuiTextField-root": {*/}
            {/*                  backgroundColor: "#F1F3F5",*/}
            {/*                },*/}
            {/*              }}*/}
            {/*              InputProps={{*/}
            {/*                readOnly: true,*/}
            {/*                endAdornment: (*/}
            {/*                  <InputAdornment position="end">*/}
            {/*                    <Typography*/}
            {/*                      variant="body2"*/}
            {/*                      sx={{ color: "black" }}*/}
            {/*                    >*/}
            {/*                      원*/}
            {/*                    </Typography>*/}
            {/*                  </InputAdornment>*/}
            {/*                ),*/}
            {/*              }}*/}
            {/*            />*/}
            {/*            <InputValidation*/}
            {/*              inputName="totalPrice"*/}
            {/*              required={true}*/}
            {/*              // errorMessage="아이디(이메일) 입력해 주세요."*/}
            {/*              sx={{ width: "100%", display: "none" }}*/}
            {/*            />*/}
            {/*          </TD>*/}
            {/*        </TableRow>*/}
            {/*      </TableBody>*/}
            {/*    </Table>*/}
            {/*  </TableContainer>*/}

            {/*  <Typography variant="subtitle1">정산</Typography>*/}
            {/*  <TableContainer sx={{ mb: 5 }}>*/}
            {/*    <Table>*/}
            {/*      <TableBody>*/}
            {/*        <TableRow>*/}
            {/*          <TH sx={{ width: "15%" }}>남은금액</TH>*/}
            {/*          <TD sx={{ width: "85%" }}>*/}
            {/*            <RemainingAmount />*/}
            {/*          </TD>*/}
            {/*        </TableRow>*/}
            {/*        {settlement === true && (*/}
            {/*          <TableRow>*/}
            {/*            <TH sx={{ width: "15%" }}>정산이력</TH>*/}
            {/*            <TD sx={{ width: "85%" }}>*/}
            {/*              <TableContainer sx={{ mb: 1 }}>*/}
            {/*                <Table>*/}
            {/*                  <TableBody>*/}
            {/*                    <TableRow>*/}
            {/*                      <TH sx={{ width: "25%" }}>방법</TH>*/}
            {/*                      <TH sx={{ width: "25%" }}>구분</TH>*/}
            {/*                      <TH sx={{ width: "25%" }}>비용</TH>*/}
            {/*                      <TH sx={{ width: "25%" }}>비고</TH>*/}
            {/*                    </TableRow>*/}
            {/*                    <TableRow>*/}
            {/*                      <TD sx={{ width: "25%" }}>선결제</TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>자동 정산 예정</TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>*/}
            {/*                        <InputValidation*/}
            {/*                          inputName="settlementCost"*/}
            {/*                          required={true}*/}
            {/*                          sx={{*/}
            {/*                            width: "100%",*/}
            {/*                            ".MuiOutlinedInput-input": {*/}
            {/*                              textAlign: "end",*/}
            {/*                            },*/}
            {/*                            "&.MuiTextField-root": {*/}
            {/*                              backgroundColor: "#F1F3F5",*/}
            {/*                            },*/}
            {/*                          }}*/}
            {/*                          InputProps={{*/}
            {/*                            readOnly: true,*/}
            {/*                            endAdornment: (*/}
            {/*                              <InputAdornment position="end">*/}
            {/*                                <Typography*/}
            {/*                                  variant="body2"*/}
            {/*                                  sx={{ color: "black" }}*/}
            {/*                                >*/}
            {/*                                  원*/}
            {/*                                </Typography>*/}
            {/*                              </InputAdornment>*/}
            {/*                            ),*/}
            {/*                          }}*/}
            {/*                        />*/}
            {/*                      </TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>-</TD>*/}
            {/*                    </TableRow>*/}
            {/*                  </TableBody>*/}
            {/*                </Table>*/}
            {/*              </TableContainer>*/}
            {/*              <TableContainer sx={{ display: "none" }}>*/}
            {/*                <Table>*/}
            {/*                  <TableBody>*/}
            {/*                    <TableRow>*/}
            {/*                      <TH sx={{ width: "25%" }}>정산방법</TH>*/}
            {/*                      <TH sx={{ width: "25%" }}>구분</TH>*/}
            {/*                      <TH sx={{ width: "25%" }}>정산비용</TH>*/}
            {/*                      <TH sx={{ width: "25%" }}>비고</TH>*/}
            {/*                    </TableRow>*/}
            {/*                    <TableRow>*/}
            {/*                      <TD sx={{ width: "25%" }}>선결제</TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>자동 정산</TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>-1,000,000</TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>*/}
            {/*                        <ContainedButton*/}
            {/*                          size="small"*/}
            {/*                          // type="submit"*/}
            {/*                          color="secondary"*/}
            {/*                          buttonName="정산내역"*/}
            {/*                        />*/}
            {/*                      </TD>*/}
            {/*                    </TableRow>*/}
            {/*                    <TableRow>*/}
            {/*                      <TD sx={{ width: "25%" }}>세금계산서</TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>카드</TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>-50,000</TD>*/}
            {/*                      <TD sx={{ width: "25%" }}>123445</TD>*/}
            {/*                    </TableRow>*/}
            {/*                  </TableBody>*/}
            {/*                </Table>*/}
            {/*              </TableContainer>*/}
            {/*            </TD>*/}
            {/*          </TableRow>*/}
            {/*        )}*/}
            {/*      </TableBody>*/}
            {/*    </Table>*/}
            {/*  </TableContainer>*/}

            {/*  <Typography variant="subtitle1">기타정보</Typography>*/}
            {/*  <TableContainer sx={{ mb: 5 }}>*/}
            {/*    <Table>*/}
            {/*      <TableBody>*/}
            {/*        <TableRow>*/}
            {/*          <TH sx={{ width: "15%" }}>*/}
            {/*            메모<NotRequired>[선택]</NotRequired>*/}
            {/*          </TH>*/}
            {/*          <TD sx={{ width: "85%", textAlign: "left" }}>*/}
            {/*            <InputValidation*/}
            {/*              fullWidth={true}*/}
            {/*              multiline*/}
            {/*              rows={4}*/}
            {/*              inputName="memo"*/}
            {/*              placeholder="메모"*/}
            {/*              maxLength={500}*/}
            {/*              maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"*/}
            {/*            />*/}
            {/*          </TD>*/}
            {/*        </TableRow>*/}
            {/*      </TableBody>*/}
            {/*    </Table>*/}
            {/*  </TableContainer>*/}

            {/*  <Stack direction="row" spacing={0.5} justifyContent="center">*/}
            {/*    <Link href="/ledger-analysis-report-list">*/}
            {/*      <OutlinedButton size="small" buttonName="목록" />*/}
            {/*    </Link>*/}

            {/*    <ContainedButton*/}
            {/*      size="small"*/}
            {/*      type="submit"*/}
            {/*      buttonName="저장2"*/}
            {/*      // endIcon={isLoading ? <LoadingWhiteSvg /> : null}*/}
            {/*    />*/}
            {/*  </Stack>*/}
            {/*</Box>*/}
          </>
        )}
        {/* 오더 검색 모달*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyOrderSearchModal
            onClose={handleCustSearchModalClose}
            handleOrderChange={handleOrderChange}
            open={custSearchModalOpen}
            modalWidth={1400}
            type="order"
          />
        </ErrorContainer>
        {/* 분석내역 검색 모달 */}
        {/*<ErrorContainer FallbackComponent={Fallback}>*/}
        {/*  <LazyAnalysisListModal*/}
        {/*    onClose={analysisSearchModalClose}*/}
        {/*    // handleSelectedRowChange={handleSelectedRowChange}*/}
        {/*    handleAddSampleList={handleAddSampleList}*/}
        {/*    open={showAnalysisSearchModal}*/}
        {/*    getOrderUkey={ukeyValue}*/}
        {/*    selectSampleList={selectSampleList}*/}
        {/*    modalWidth={1400}*/}
        {/*  />*/}
        {/*</ErrorContainer>*/}
      </>
    </Form>
  );
};

export default AnalysisRegView;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
