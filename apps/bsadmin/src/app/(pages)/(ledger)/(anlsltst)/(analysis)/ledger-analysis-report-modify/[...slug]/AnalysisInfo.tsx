"use client";
import * as React from "react";
import { useCallback, useState, useRef, useEffect } from "react";

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
import LoadingWhiteSvg from "../../../../../../components/LoadingWhiteSvg";
import { useRouter } from "next-nprogress-bar";
import { fetcher, POST } from "api";
import { useParams, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
import { getDefaultValues } from "./getDefaultValues";
import { cjbsTheme } from "cjbsDSTM/themes";
import AnalysisSampleDynamicTable from "./AnalysisSampleDynamicTable";
import { useRecoilState } from "recoil";
import { groupListDataAtom } from "../../../../../../recoil/atoms/groupListDataAtom";
import { toggledClearRowsAtom } from "../../../../../../recoil/atoms/toggled-clear-rows-atom";
import dayjs from "dayjs";
import { addDays, subDays, subMonths } from "date-fns";
import DynamicTableAnalysis from "../../../../../../components/DynamicTableAnalysis";
import DynamicSumTableAnalysis from "../../../../../../components/DynamicSumTableAnalysis";

const LazyAnalysisListModal = dynamic(
  () => import("../../../../../../components/AnalysisListModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const AnalysisInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const anlsItstUkey = params.slug;

  const { data } = useSWR(`/anls/itst/${anlsItstUkey}`, fetcher, {
    suspense: true,
  });
  const { mutate } = useSWRConfig();
  // console.log("response", data);

  const [showAnalysisSearchModal, setShowAnalysisSearchModal] =
    useState<boolean>(false);
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderSelectChk, setOrderSelectChk] = useState<boolean>(true);
  const [ukeyValue, setUkeyValue] = useState<string>(null);
  const [isSampleSelected, setIsSampleSelected] = useState<boolean>(true);
  const [settlement, setSettlement] = useState<boolean>(true);
  const [selectSampleList, setSelectSampleList] =
    useRecoilState(groupListDataAtom);
  const [clearRowsAtom, setClearRowsAtom] =
    useRecoilState(toggledClearRowsAtom);
  const [selectSampleListData, setSelectSampleListData] = useState<any>({});
  const [isEdit, setIsEdit] = useState<string>("Y");
  const [viewPage, setViewPage] = useState<boolean>(true);

  const defaultValues = {
    srvcCtgrMc: data.anlsItstInfo.srvcCtgrMc,
    agncUkey: data.anlsItstCustInfo.agncUkey,
    orderId: data.anlsItstInfo.orderId,
    orderUkey: data.anlsItstInfo.orderUkey,
    pltfValueView:
      data.anlsItstInfo.anlsTypeVal + " > " + data.anlsItstInfo.pltfVal,
    pltfMc: data.anlsItstInfo.pltfMc,
    anlsTypeMc: data.anlsItstInfo.anlsTypeMc,
    depthVal: data.anlsItstInfo.depthVal,
    depthMc: data.anlsItstInfo.depthMc,
    agncNm:
      data.anlsItstCustInfo.agncNm + "(" + data.anlsItstCustInfo.instNm + ")",
    custNm:
      data.anlsItstCustInfo.rhpiNm +
      "(" +
      data.anlsItstCustInfo.rhpiEbcEmail +
      ")",
    bsnsMngrVal: data.anlsItstCustInfo.bsnsMngrVal,
    rmnPrePymtPrice: data.anlsItstCustInfo.rmnPrePymtPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    memo: data.memo,
    anlsDttm: new Date(data.anlsItstCostInfo.anlsDttm),
    sample: data.anlsItstCostInfo.anlsItstCostList,
    costList: data.anlsItstCostInfo.anlsItstCostList,
    totalCnt: data.anlsItstCostInfo.totalCnt,
    totalSupplyPriceVal: data.anlsItstCostInfo.totalSupplyPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    totalSupplyPrice: data.anlsItstCostInfo.totalSupplyPrice,
    vatVal: data.anlsItstCostInfo.totalVat
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    vat: data.anlsItstCostInfo.totalVat,
    totalPriceVal: data.anlsItstCostInfo.totalPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    totalPrice: data.anlsItstCostInfo.totalPrice,
    remainingAmount: data.anlsItstCostInfo.remainingAmount,
  };

  let dataGetCnt = 0;
  useEffect(() => {
    if (data && dataGetCnt < 1) {
      dataGetCnt++;
      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        data.anlsItstInfo.orderUkey,
      );
      setUkeyValue(data.anlsItstInfo.orderUkey);
      setSelectSampleList(data.anlsItstCostInfo.anlsItstCostList);
      // console.log("defaultValues ==>>>>", defaultValues)
      if (data.isEdit === "N") {
        setIsEdit(data.isEdit);
      }
    }
  }, [data]);

  // defaultValues 세팅
  // const defaultValues = getDefaultValues(orshType, orshExtrData);
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
        sampleList[index]["stndPrice"] = Number(
          sampleList[index]["stndPrice"].replaceAll(",", ""),
        );
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

    const apiUrl: string = `/anls/itst/${anlsItstUkey}`;

    await POST(apiUrl, bodyData)
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          toast("수정 되었습니다.");
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

  const analysisSearchModalOpen = () => {
    setShowAnalysisSearchModal(true);
  };
  const analysisSearchModalClose = () => {
    setShowAnalysisSearchModal(false);
  };

  const handleAddSampleList = (selectSampleData: any) => {
    console.log("selectSampleData : ", selectSampleData);
    setClearRowsAtom(true);
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

  const changeUpdatePage = () => {
    setViewPage(false);
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="분석 내역서 수정" />
        </Box>
        <Typography variant="subtitle1">기본정보</Typography>
        <TableContainer sx={{ mb: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>서비스 분류</TH>
                <TD sx={{ width: "85%", textAlign: "left" }}>
                  <Typography variant="body2" sx={{ pl: "0px" }}>
                    Analysis
                  </Typography>
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
                  <Stack direction="row" spacing={1} alignItems="center">
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
                    {/*<OutlinedButton*/}
                    {/*  size="small"*/}
                    {/*  buttonName="오더 검색"*/}
                    {/*  onClick={handleCustSearchModalOpen}*/}
                    {/*/>*/}
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>

          {/*{ orderSelectChk == true && (*/}
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
          {/*)}*/}
        </TableContainer>

        {/*{ orderSelectChk == false && (*/}
        {/*  <Stack*/}
        {/*    spacing={1}*/}
        {/*    justifyContent="center"*/}
        {/*    alignItems="center"*/}
        {/*    sx={{border: `1px solid ${cjbsTheme.palette.grey.A400}`, mb: 5, p: 5}}*/}
        {/*  >*/}
        {/*    <Stack*/}
        {/*      spacing={1}*/}
        {/*      justifyContent="center"*/}
        {/*      alignItems="center"*/}
        {/*    >*/}
        {/*      <Typography variant="body2">*/}
        {/*        Analysis의 경우,등록된 오더를 먼저 입력해주세요.*/}
        {/*      </Typography>*/}
        {/*      <Typography variant="body2">*/}
        {/*        이렇게 하면 오더에 등록된 고객정보와 분석내역을 자동으로 가져올 수 있습니다.*/}
        {/*      </Typography>*/}
        {/*    </Stack>*/}
        {/*  </Stack>*/}
        {/*)}*/}

        {/*{ orderSelectChk == true && (*/}
        <>
          <Typography variant="subtitle1">고객정보</Typography>
          <TableContainer sx={{ mb: 2 }}>
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
                    <InputValidation
                      inputName="bsnsMngrVal"
                      required={true}
                      errorMessage="아이디(이메일) 입력해 주세요."
                      sx={{ width: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
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

          {/*<DynamicTableAnalysis />*/}
          {/*<DynamicSumTableAnalysis />*/}

          {/*<Typography variant="subtitle1">분석내역</Typography>*/}

          {isSampleSelected === false && (
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ border: `1px solid ${cjbsTheme.palette.grey.A400}`, mb: 3 }}
            >
              <Stack
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <LinkButton
                  buttonName="해당 영역을 클릭하면 선택한 주문의 서비스 유형별 분석 정보를 가져올 수 있습니다."
                  sx={{ width: "100%", height: "100px" }}
                  onClick={analysisSearchModalOpen}
                />
              </Stack>
            </Stack>
          )}

          <Box sx={{ display: isSampleSelected === false ? "none" : "block" }}>
            <AnalysisSampleDynamicTable
              analysisSearchModalOpen={analysisSearchModalOpen}
              // setSettlement={setSettlement}
              setSelectSampleListData={setSelectSampleListData}
            />

            <TableContainer sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>분석일</TH>
                    <TD sx={{ width: "35%" }}>
                      <SingleDatePicker
                        inputName="anlsDttm"
                        required={true}
                        includeDateIntervals={standDate()}
                      />
                    </TD>
                    <TH sx={{ width: "15%" }}>총 수량</TH>
                    <TD sx={{ width: "35%" }}>
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
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>총 공급가액</TH>
                    <TD sx={{ width: "35%" }}>
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
                    <TD sx={{ width: "35%" }}>
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
                        sx={{ width: "100%", display: "none" }}
                      />
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>합계금액</TH>
                    <TD sx={{ width: "85%" }} colSpan={3}>
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

            <Typography variant="subtitle1">기타정보</Typography>
            <TableContainer sx={{ mb: 2 }}>
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
                        sx={{
                          width: "100%",
                          ".MuiOutlinedInput-root": {
                            p: 1,
                            marginY: 0.5,
                          },
                        }}
                      />
                    </TD>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Stack
              direction="row"
              spacing={0.5}
              justifyContent="center"
              sx={{ mb: 5 }}
            >
              <Link href="/ledger-analysis-report-list">
                <OutlinedButton size="medium" buttonName="목록" />
              </Link>

              {viewPage === false && (
                <ContainedButton
                  size="medium"
                  type="submit"
                  buttonName="저장"
                  endIcon={isLoading ? <LoadingWhiteSvg /> : null}
                />
              )}

              {isEdit === "Y" && viewPage === true && (
                <ContainedButton
                  size="medium"
                  buttonName="수정" // 수정 가능 페이지로 이동
                  onClick={changeUpdatePage}
                />
              )}
            </Stack>
          </Box>
        </>

        {/* 분석내역 검색 모달*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAnalysisListModal
            onClose={analysisSearchModalClose}
            // handleSelectedRowChange={handleSelectedRowChange}
            handleAddSampleList={handleAddSampleList}
            open={showAnalysisSearchModal}
            getOrderUkey={ukeyValue}
            selectSampleList={selectSampleList}
            viewType={"update"}
            modalWidth={1400}
          />
        </ErrorContainer>
      </>
    </Form>
  );
};

export default AnalysisInfo;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
