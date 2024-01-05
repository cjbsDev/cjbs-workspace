"use client";

import React, { useCallback, useState } from "react";
import {
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
import {
  Box,
  BoxProps,
  CircularProgress,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import LoadingSvg from "public/svg/loading_wh.svg";
import dynamic from "next/dynamic";
import AgncSearchModal from "../../../../components/AgncSearchModal";
import AgncAndInstName from "./components/AgncAndInstName";
import NGSSalesManagerSelectbox from "../../../../components/NGSSalesManagerSelectbox";
import PaymentType from "../../../../components/PaymentType";
import RmnPymtPrice from "./components/RmnPymtPrice";
import RmnPymtDetailBtn from "./components/RmnPymtDetailBtn";
import { useRecoilValue } from "recoil";
import { rmnPriceDetailShowAtom } from "./atom";
import InstSearchModal from "../../../../components/InstSearchModal";
import BusinessRegNo from "./components/BusinessRegNo";
import RepresentName from "./components/RepresentName";
import DynamicTable from "./components/DynamicTable";
import DynamicSumTable from "./components/DynamicSumTable";
import { POST } from "api";

const LazyRmnPymtPriceDetail = dynamic(
  () => import("./components/RmnPymtPriceDetail"),
  {
    ssr: false,
    loading: () => (
      <Stack direction="row" justifyContent="center">
        <CircularProgress disableShrink size={20} sx={{ p: 1 }} />
      </Stack>
    ),
  },
);

const LegView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);
  const [showInstSearchModal, setShowInstSearchModal] =
    useState<boolean>(false);
  const show = useRecoilValue(rmnPriceDetailShowAtom);

  const defaultValues = {
    detailList: [
      {
        srvcCtgrMc: "BS_0100005001",
        anlsTypeMc: "",
        products: "",
        qnty: 0,
        unitPrice: 0,
        supplyPrice: 0,
      },
    ],
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form Data ==>>", data);
    const {
      // agncNm,
      // instNm,
      detailList,
      agncUkey,
      bsnsMngr,
      pymtInfoCc,
      rmnPrice,
      instUkey,
      rprsNm,
      brno,
      pymtMngrNm,
      email,
      memo,
      report,
      vat,
      totalPrice,
      totalSupplyPrice,
    } = data;

    const bodyData = {
      agncUkey: agncUkey,
      bsnsMngrUkey: bsnsMngr,
      // dpstDttm: "",
      // dpstPrice: 0,
      instUkey: instUkey,
      invcProductDetailList: detailList,
      memo: memo,
      pymtInfoCc: pymtInfoCc,
      pymtMngrNm: pymtMngrNm,
      // pyrNm: "",
      rcvEmail: email,
      report: report,
      // tnsfTargetAgncUkey: "",
      totalPrice: totalPrice,
      totalSupplyPrice: totalSupplyPrice,
      vat: vat,
    };

    await POST(`/invc`, bodyData)
      .then((res) => {
        console.log("RTRTRTRTRTRTRT", res);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 거래처 검색 모달
  const handleAgncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };
  const handleAgncSearchModalClose = useCallback(() => {
    setShowAgncSearchModal(false);
  }, []);

  // 기관 검색 모달
  const handleInstSearchModalOpen = () => {
    setShowInstSearchModal(true);
  };
  const handleInstSearchModalClose = useCallback(() => {
    setShowInstSearchModal(false);
  }, []);

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="세금계산서 등록" />
      </Box>

      <Typography variant="subtitle1">기본정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "85%" }}>
                <Stack direction="row" spacing={0.2} alignItems="center">
                  <AgncAndInstName />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="agncNm"
                    required={true}
                    // errorMessage="거래처를 입력해 주세요"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/*<InputValidation*/}
                  {/*  sx={{ display: "none" }}*/}
                  {/*  inputName="instNm"*/}
                  {/*  required={true}*/}
                  {/*  // errorMessage="기관을 입력해 주세요"*/}
                  {/*  InputProps={{*/}
                  {/*    readOnly: true,*/}
                  {/*  }}*/}
                  {/*/>*/}
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
                  <OutlinedButton
                    size="small"
                    buttonName="거래처 검색"
                    onClick={handleAgncSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>영업담당자</TH>
              <TD sx={{ width: "85%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <NGSSalesManagerSelectbox />
                </ErrorContainer>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">결제정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>결제구분</TH>
              <TD sx={{ width: "85%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <PaymentType />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>남은금액</TH>
              <TD sx={{ width: "85%" }}>
                <Stack direction="row" justifyContent="space-between">
                  <RmnPymtPrice />
                  <RmnPymtDetailBtn />
                </Stack>
                {show && (
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyRmnPymtPriceDetail />
                  </ErrorContainer>
                )}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <DynamicTable />
      <DynamicSumTable />

      <Typography variant="subtitle1">발행처정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>기관명(상호)</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Stack direction="row" spacing={0.2} alignItems="center">
                  <InputValidation
                    // sx={{ display: "none" }}
                    inputName="instNm"
                    required={true}
                    errorMessage="기관을 입력해 주세요"
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="instUkey"
                    required={true}
                    // errorMessage="키값 입력하세요."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <OutlinedButton
                    size="small"
                    buttonName="기관 검색"
                    onClick={handleInstSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>대표자명</TH>
              <TD sx={{ width: "35%" }}>
                <RepresentName />
              </TD>
              <TH sx={{ width: "15%" }}>사업자등록번호</TH>
              <TD sx={{ width: "35%" }} align="right">
                <BusinessRegNo />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>결제담당자</TH>
              <TD sx={{ width: "35%" }}>
                <InputValidation
                  inputName="pymtMngrNm"
                  required={true}
                  errorMessage="결제담당자를 입력해 주세요"
                />
              </TD>
              <TH sx={{ width: "15%" }}>이메일</TH>
              <TD sx={{ width: "35%" }} align="right">
                <InputValidation
                  inputName="email"
                  required={true}
                  errorMessage="이메일을 입력하세요"
                  patternErrMsg="이메일 형식으로 입력해주세요"
                  pattern={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/}
                  placeholder="ex)test@test.com"
                />
              </TD>
            </TableRow>
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
              <TD sx={{ width: "85%" }}>
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
            <TableRow>
              <TH sx={{ width: "15%" }}>
                보고서<NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "85%" }}>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="report"
                  placeholder="보고서"
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/tax-invoice-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <ContainedButton
          size="small"
          type="submit"
          buttonName="저장"
          endIcon={
            isLoading ? (
              <LoadingSvg stroke="white" width={20} height={20} />
            ) : null
          }
        />
      </Stack>

      <AgncSearchModal
        onClose={handleAgncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={800}
      />

      <InstSearchModal
        onClose={handleInstSearchModalClose}
        open={showInstSearchModal}
        modalWidth={1000}
      />
    </Form>
  );
};

export default LegView;
const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
