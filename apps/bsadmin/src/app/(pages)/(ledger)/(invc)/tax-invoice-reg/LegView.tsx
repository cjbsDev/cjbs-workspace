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
  IconButton,
  Stack,
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
import { useFormContext } from "react-hook-form";
import AgncAndInstName from "./components/AgncAndInstName";
import NGSSalesManagerSelectbox from "../../../../components/NGSSalesManagerSelectbox";
import PaymentType from "../../../../components/PaymentType";
import RmnPymtPrice from "./components/RmnPymtPrice";
import MyIcon from "icon/MyIcon";
import RmnPymtPriceDetail from "./components/RmnPymtPriceDetail";
import RmnPymtDetailBtn from "./components/RmnPymtDetailBtn";
import { useRecoilState } from "recoil";
import { rmnPriceDetailShowAtom } from "./atom";

const LazyRmnPymtPriceDetail = dynamic(
  () => import("./components/RmnPymtPriceDetail"),
  {
    ssr: false,
    loading: () => <Typography>Loading...</Typography>,
  },
);

const LegView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);
  const [rmnPrcDetail, setRmnPrcDetail] = useState(false);
  const [show, setShow] = useRecoilState(rmnPriceDetailShowAtom);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form Data ==>>", data);
  };

  const handleAgncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };
  const handleAgncSearchModalClose = useCallback(() => {
    console.log("CLOSESSSSSS");
    setShowAgncSearchModal(false);
  }, []);
  return (
    <Form onSubmit={onSubmit} defaultValues={undefined}>
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
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="instNm"
                    required={true}
                    // errorMessage="기관을 입력해 주세요"
                    InputProps={{
                      readOnly: true,
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
                  {/*<IconButton>*/}
                  {/*  <MyIcon*/}
                  {/*    icon="plus"*/}
                  {/*    size={18}*/}
                  {/*    onClick={() => {*/}
                  {/*      setRmnPrcDetail(true);*/}
                  {/*    }}*/}
                  {/*  />*/}
                  {/*</IconButton>*/}
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
        modalWidth={800}
        open={showAgncSearchModal}
        onClose={handleAgncSearchModalClose}
      />
    </Form>
  );
};

export default LegView;
