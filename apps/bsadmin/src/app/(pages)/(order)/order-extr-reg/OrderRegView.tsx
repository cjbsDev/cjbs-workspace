"use client";

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
  CheckboxGV,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
  Won,
  EA,
  Taxon,
  InputPriceNewType,
} from "cjbsDSTM";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import PlatformSelectbox from "./PlatformSelectbox";
import SampleTotal from "./SampleTotal";
import SixteenCheck from "./SixteenCheck";
import {
  emailReceiveSettingData,
  reqReturnListData,
  taxonListData,
} from "../../../data/inputDataLists";
import { POST } from "api";
import { useSWRConfig } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
import TaxonCntFormat from "../../../components/NumberFormat/TaxonCntFormat";
import AmountFormat from "../../../components/NumberFormat/AmountFormat";
import LoadingWhiteSvg from "../../../components/LoadingWhiteSvg";
import ResearcherMngInfo from "./researcherMngInfo";
import TaxonRow from "./TaxonRow";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySalesManagerSelctbox = dynamic(
  () => import("../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyServiceTypeSelctbox = dynamic(
  () => import("./ServiceTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyAnalysisTypeSelctbox = dynamic(
  () => import("./AnalysisTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyOrderType = dynamic(() => import("../../../components/OrderType"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyPlatformSelectbox = dynamic(() => import("./PlatformSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const OrderRegView = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addEmailChck, setAddEmailChck] = useState<boolean>(false);

  const defaultValues = {
    srvcTypeMc: "BS_0100007003",
    anlsTypeMc: "BS_0100006004",
    pltfMc: "",
    taxonBCnt: 0,
    taxonECnt: 0,
    taxonACnt: 0,
    price: 0,
    mailRcpnList: ["agncLeaderRcpn", "ordrAplcRcpn"],
    orderTypeCc: "BS_0800001",
    isCheck16s: "N",
  };
  console.log("DefaultValues ==>>", defaultValues);

  // Submit
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    if (data.mailRcpnList.includes("etcRcpn") && data.addEmailList === "") {
      setAddEmailChck(true);
    } else {
      setAddEmailChck(false);
    }

    const typeNumbertaxonACnt = Number(data.taxonACnt);
    const typeNumbertaxonBCnt = Number(data.taxonBCnt);
    const typeNumbertaxonECnt = Number(data.taxonECnt);

    const reqBody = {
      ...data,
      taxonACnt: typeNumbertaxonACnt,
      taxonBCnt: typeNumbertaxonBCnt,
      taxonECnt: typeNumbertaxonECnt,
      orshUkey: null,
      price: Number.isNaN(Number(data.price))
        ? Number(data.price.replace(/,/g, ""))
        : Number(data.price),
      reqReturnList: data.reqReturnList === false ? [""] : data.reqReturnList,
    };

    console.log("Order Reg reqBody ==>>", reqBody);

    try {
      const response = await POST("/order/extr", reqBody);
      if (response.success) {
        // setIsLoading(false);
        router.push("/order-list");
        mutate(`/order-list?page=1&size=15`);
      } else {
        toast(response.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error(
        "외부 오더 등록 에러 =>",
        error.response?.data?.data || error.message,
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName={"고객 오더 등록"} />
        </Box>

        {/* 연구책임자 정보 */}
        <ResearcherMngInfo />

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
                      // required={true}
                      // errorMessage="연락처 입력해 주세요."
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

              <TableRow>
                <TH sx={{ width: "15%" }}>분석종류</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyAnalysisTypeSelctbox />
                  </ErrorContainer>
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
                <TH sx={{ width: "15%" }}>
                  플랫폼<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPlatformSelectbox />
                  </ErrorContainer>
                </TD>
              </TableRow>

              <TaxonRow />

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
                <TH sx={{ width: "15%" }}>
                  반송 요청<NotRequired>[선택]</NotRequired>
                </TH>
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
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>오더 금액</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Box sx={{ width: 160 }}>
                      <InputPriceNewType />
                    </Box>
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

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <Link href={"/order-list"}>
            <OutlinedButton size="small" buttonName="목록" />
          </Link>

          <ContainedButton
            size="small"
            type="submit"
            buttonName="저장"
            endIcon={isLoading ? <LoadingWhiteSvg /> : null}
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
