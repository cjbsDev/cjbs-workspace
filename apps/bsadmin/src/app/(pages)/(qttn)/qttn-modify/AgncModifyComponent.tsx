"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import {
  Stack,
  Typography,
} from "@mui/material";
import {
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
} from "cjbsDSTM";
import {useEffect, useState,} from "react";
import { useFormContext } from "react-hook-form";
import TypeSelectRadio from "../../../components/TypeSelectRadio";
import useCenteredPopup from "../../../hooks/useCenteredPopup";

// 영업 담당자 선택
const LazySalesManagerSelctbox = dynamic(
  () => import("../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

// 거래처 검색
const LazyAgncSearchModal = dynamic(
  () => import("../../../components/AgncSearchTSModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const AgncModifyComponent = (props: any) => {
  const inputName = props.inputName;
  const { watch, getValues, setValue, clearErrors } = useFormContext();
  // 최초에는 거래처명이 삭제 되지않기 위한 조건
  const [firstRender, setFirstRender] = useState<boolean>(false);
  // console.log(watch('agncTypeCc'));
  const agncTypeVal = watch('agncTypeCc');
  // // agncTypeVal 값이 'N' 일 때 agncNm 필드 초기화
  useEffect(() => {
    if (agncTypeVal === 'N' && firstRender) {
      setValue('agncNm', ''); // agncNm 필드를 빈 문자열로 초기화
    } else {
      setFirstRender(true);
    }
  }, [agncTypeVal, setValue]);

    // [기관 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] = useState<boolean>(false);

  const agncTypeCcData = [
    { value: "N", optionName: "잠재고객" },
    { value: "Y", optionName: "기존고객" },
  ];

  // [ 기관 검색 ] 모달 오픈
  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // [ 기관 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
    console.log("getInstNm", getValues("instNm"));
    console.log("getAgncNm", getValues("agncNm"));
  };

  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/agncListPopup?type=order`,
    "과제 검색",
    800,
    700,
  );

  useEffect(() => {
    window.addEventListener("myAgncData", function (e) {
      console.log("Received data:", e.detail);

      const {
        agncUkey,
        agncNm,
        instFakeNm,
        bsnsMngrUkey,
        bsnsMngrNm,
      } = e.detail;

      const agncInstNm = `${agncNm}(${instFakeNm})`;
      setValue("agncNm", agncInstNm);
      setValue("agncUkey", agncUkey);
      setValue("bsnsMngrUkey", bsnsMngrUkey);
      // setValue("bsnsMngrNm", bsnsMngrNm);
      clearErrors("agncNm");
      clearErrors("agncUkey");
      clearErrors("bsnsMngrUkey");
      clearErrors("bsnsMngrNm");

    });
  }, []);

  return (
    <>
      <TypeSelectRadio
        data={agncTypeCcData}
        inputName={inputName}
      />
      <Stack direction="row" spacing={0.5} alignItems="flex-start">
        <InputValidation
          inputName="agncNm"
          sx={{ width: 600 }}
          required={true}
          InputProps={{
            readOnly: agncTypeVal === "Y" ? true : false,
          }}
        />

        <InputValidation
          disabled={true}
          sx={{ display: "none" }}
          inputName="agncUkey"
          InputProps={{
            readOnly: true,
          }}
        />

        {agncTypeVal === "Y" && (
          <OutlinedButton
            size="small"
            buttonName="거래처 검색"
            onClick={agncSearchModalOpen}
          />
        )}
        {agncTypeVal === "Y" && (
          <OutlinedButton
            size="small"
            buttonName="거래처 검색"
            onClick={openPopup}
          />
        )}

      </Stack>
      {/* 거래처 검색 모달*/}
      <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncSearchModal
            onClose={agncSearchModalClose}
            open={showAgncSearchModal}
            modalWidth={800}
            type="order"
          />
        </ErrorContainer>
    </>
  );
};

export default AgncModifyComponent;
