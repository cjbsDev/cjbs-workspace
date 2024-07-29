"use client";
import * as React from "react";
import { useCallback, useState, useRef } from "react";

import dynamic from "next/dynamic";
import {
  Box,
  BoxProps,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { fetcher, POST } from "api";
import { useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { groupListDataAtom } from "../../../../../recoil/atoms/groupListDataAtom";
import { toggledClearRowsAtom } from "../../../../../recoil/atoms/toggled-clear-rows-atom";
import dayjs from "dayjs";
import DynamicTableAnalysis from "../../../../../components/DynamicTableAnalysis";
import DynamicSumTableAnalysis from "../../../../../components/DynamicSumTableAnalysis";
import EtcContainer from "./EtcContainer";
import SettlementContainer from "./SettlementContainer";
import SubmitContainer from "./SubmitContainer";
import RmnPrePymPrice from "./RmnPrePymPrice";

const LazyOrderSearchModal = dynamic(
  () => import("../../../../../components/OrderSearchModal"),
  {
    ssr: false,
    // loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const AnalysisRegFromOrderView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderUkey = searchParams.get("orderUkey");
  const sampleUkeyList = searchParams.get("sampleUkeyList");
  console.log("searchParams Value ==>>", orderUkey, sampleUkeyList);

  const { data } = useSWR(
    `/anls/itst/${orderUkey}/sample?sampleUkeyList=${sampleUkeyList}`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("From Order Analysis Init Value ==>>", data);
  const { anlsItstCostDetailList, anlsItstCustInfo, anlsItstInfo } = data;

  const { mutate } = useSWRConfig();

  const [showAnalysisSearchModal, setShowAnalysisSearchModal] =
    useState<boolean>(false);
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] = useState<boolean>(
    orderUkey !== null ? false : true,
  );
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

  const additionalObject = {
    addType: null,
    dscntPctg: "",
    dscntRasnCc: "",
    dscntRasnDetail: "",
    isExc: "",
    // sampleSize: 0,
    sampleUkey: [],
    // srvcTypeMc: "",
    stndCode: "",
    stndDscntPctg: "N/A",
    stndPrice: "N/A",
    supplyPrice: 0,
    unitPrice: 0,
    vat: 0,
  };

  const nnnn = anlsItstCostDetailList.concat(additionalObject);
  console.log("NNNNNNNN ==>>", nnnn);

  const mergeObjects = () => {
    return nnnn.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
  };

  console.log("mergeObjects ", mergeObjects());

  const ccc = mergeObjects();

  // defaultValues 세팅
  const defaultValues = {
    ...anlsItstInfo,
    ...anlsItstCustInfo,
    costList: [ccc],
  };

  console.log("defaultValues", defaultValues);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    if (data.costList.length <= 0) {
      toast("해당 오더에 포함된 분석 내역이 없습니다.");
      return false;
    }

    const bodyData = {
      agncUkey: data.agncUkey,
      anlsDttm: dayjs(data.anlsDttm).format("YYYY-MM-DD"),
      anlsTypeMc: data.anlsTypeMc,
      bsnsMngrVal: data.bsnsMngrVal,
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

  const handleOrderChange = (orderUkey: string) => {
    setOrderSelectChk(true);
    setUkeyValue(orderUkey);
    setSelectSampleList({});
    setClearRowsAtom(true);
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
                  <InputValidation
                    // sx={{ display: "none" }}
                    inputName="srvcCtgrVal"
                    required={true}
                    InputProps={{
                      readOnly: true,
                      // hidden: true,
                    }}
                  />
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

          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%", borderTop: 0 }}>플랫폼</TH>
                <TD sx={{ width: "35%", borderTop: 0, textAlign: "left" }}>
                  <InputValidation
                    inputName="pltfVal"
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
        </TableContainer>

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
                  <InputValidation
                    inputName="bsnsMngrVal"
                    required={true}
                    errorMessage="영업 담당자 입력해 주세요."
                    sx={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
                <TH sx={{ width: "15%" }}>선결제 금액</TH>
                <TD sx={{ width: "35%" }}>
                  <RmnPrePymPrice />
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
      </>
    </Form>
  );
};

export default AnalysisRegFromOrderView;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
