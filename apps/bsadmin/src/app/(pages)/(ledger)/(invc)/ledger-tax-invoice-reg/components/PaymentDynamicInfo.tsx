import React, { useCallback, useEffect, useState } from "react";
import {
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
} from "cjbsDSTM";
import PaymentType from "../../../../../components/PaymentType";
import RmnPymtPrice from "./RmnPymtPrice";
import RmnPymtDetailBtn from "./RmnPymtDetailBtn";
import InputDpstPrice from "./InputDpstPrice";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  agncModalShowAtom,
  instModalShowAtom,
  rmnPriceDetailShowAtom,
} from "../atom";
import dynamic from "next/dynamic";
import { useFormContext, useWatch } from "react-hook-form";
import RmnPrePymtPrice from "./RmnPrePymtPrice";
import { useSearchParams } from "next/navigation";
import useCenteredPopup from "../../../../../hooks/useCenteredPopup";

const LazyRmnPymtPriceDetail = dynamic(() => import("./RmnPymtPriceDetail"), {
  ssr: false,
  loading: () => (
    <Stack direction="row" justifyContent="center">
      <CircularProgress disableShrink size={20} sx={{ p: 1 }} />
    </Stack>
  ),
});

const PaymentDynamicInfo = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { watch, getValues, setValue, clearErrors } = useFormContext();
  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/tnsfAgncListPopup`,
    "이관 거래처 검색",
    800,
    670,
  );

  useEffect(() => {
    window.addEventListener("myTnsfAgncData", function (e) {
      console.log("myTnsfAgncData Received data:", e.detail);

      const { tnsfTargetAgncNm, tnsfTargetAgncUkey } = e.detail;

      setValue("tnsfTargetAgncNm", tnsfTargetAgncNm);
      setValue("tnsfTargetAgncUkey", tnsfTargetAgncUkey);

      clearErrors(["tnsfTargetAgncNm", "tnsfTargetAgncUkey"]);
    });
  }, []);

  // const [showInstSearchModal, setShowInstSearchModal] =
  //   useState<boolean>(false);
  const setShowAgncSearchModal = useSetRecoilState(agncModalShowAtom);
  const setShowInstSearchModal = useSetRecoilState(instModalShowAtom);

  console.log("PAYMENT TYPE@@@@", watch("pymtInfoCc"));
  const paymentInfoValue = watch("pymtInfoCc");

  const show = useRecoilValue(rmnPriceDetailShowAtom);
  const isSpecificPaymentType =
    paymentInfoValue === "BS_1914002" || paymentInfoValue === "BS_1914003";

  const handleAgncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  const handleInstSearchModalOpen = () => {
    setShowInstSearchModal(true);
  };

  return (
    <>
      <Typography variant="subtitle1">결제정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>결제구분</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <PaymentType />
                </ErrorContainer>
              </TD>
            </TableRow>
            {paymentInfoValue !== "BS_1914004" && (
              <TableRow>
                <TH sx={{ width: "15%" }}>남은금액</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" justifyContent="space-between">
                    <RmnPymtPrice />
                    {type === "modify" && <RmnPymtDetailBtn />}
                  </Stack>
                  {show && (
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyRmnPymtPriceDetail />
                    </ErrorContainer>
                  )}
                </TD>
              </TableRow>
            )}
            {isSpecificPaymentType && (
              <TableRow>
                <TH sx={{ width: "15%" }}>입금액</TH>
                <TD>
                  <InputDpstPrice />
                </TD>
                <TH sx={{ width: "15%" }}>입금일자</TH>
                <TD>
                  <SingleDatePicker
                    inputName="dpstDttm"
                    // required={true}
                    // errorMessage="날짜를 입력하세요"
                  />
                </TD>
                <TH sx={{ width: "15%" }}>입금자명</TH>
                <TD>
                  <InputValidation
                    inputName="pyrNm"
                    // required={true}
                    // errorMessage="입금자명을 입력하세요."
                  />
                </TD>
              </TableRow>
            )}
            {paymentInfoValue === "BS_1914004" && (
              <>
                <TableRow>
                  <TH sx={{ width: "15%" }}>이관 가능 금액</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack direction="row" justifyContent="space-between">
                      <RmnPrePymtPrice />
                      <RmnPymtDetailBtn />
                    </Stack>
                    {show && (
                      <ErrorContainer FallbackComponent={Fallback}>
                        <LazyRmnPymtPriceDetail />
                      </ErrorContainer>
                    )}
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>이관 대상</TH>
                  <TD sx={{ width: "85%" }} colSpan={3}>
                    <Stack direction="row" spacing={0.2} alignItems="center">
                      <InputValidation
                        // sx={{ display: "none" }}
                        inputName="tnsfTargetAgncNm"
                        required={true}
                        errorMessage="거래처를 입력해 주세요"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                      <InputValidation
                        sx={{ display: "none" }}
                        inputName="tnsfTargetAgncUkey"
                        required={true}
                        errorMessage="키값 입력하세요."
                        InputProps={{
                          readOnly: true,
                          hidden: true,
                        }}
                      />
                      <OutlinedButton
                        size="small"
                        buttonName="거래처 검색"
                        // onClick={handleAgncSearchModalOpen}
                        onClick={openPopup}
                      />
                    </Stack>
                  </TD>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PaymentDynamicInfo;
