"use client";

import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CheckboxGV,
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  PostCodeBtn,
  RadioGV,
  TD,
  TH,
} from "cjbsDSTM";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useCenteredPopup from "../../../hooks/useCenteredPopup";
import { useFormContext } from "react-hook-form";

const LazyProjectSearchModal = dynamic(() => import("./ProjectSearchModal"), {
  ssr: false,
});

const LazyPrepSelectbox = dynamic(
  () => import("../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

export default function StudySelection() {
  const methods = useFormContext();
  const { setValue, getValues, clearErrors } = methods;
  // // [프로젝트 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);
  const [prjcCode, setPrjcCode] = useState<string>("");

  // [ 프로젝트 검색 ] 모달 오픈
  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // // [ 프로젝트 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  const setCodeDataChange = (code: string) => {
    setPrjcCode(code);
  };

  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/projectListPopup?type=order`,
    "과제 검색",
    1000,
    700,
  );

  useEffect(() => {
    window.addEventListener("projectData", function (e) {
      console.log("Received data:", e.detail.douzoneCode);

      const { value, optionName, prjtDetailCnt, isPrjtSelect, douzoneCode } =
        e.detail;

      setValue("douzoneCode", douzoneCode);
      setValue("prjtUniqueCode", value);
      setValue("prjtNm", optionName);
      clearErrors("prjtNm");
      setCodeDataChange(value);
    });
  }, []);

  return (
    <>
      {/*<Typography variant="subtitle1">*/}
      {/*  주문자 정보*/}
      {/*</Typography>*/}
      <TableContainer sx={{ mb: 1 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                과제{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="prjtUniqueCode"
                    disabled={true}
                    required={true}
                    errorMessage="과제를 검색 & 선택해주세요."
                    placeholder="과제 코드"
                    sx={{ width: 200, display: "none" }}
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <InputValidation
                    inputName="douzoneCode"
                    disabled={true}
                    required={true}
                    errorMessage="과제를 검색 & 선택해주세요."
                    placeholder="과제 코드"
                    sx={{ width: 130 }}
                  />
                  <InputValidation
                    inputName="prjtNm"
                    disabled={true}
                    // required={true}
                    // errorMessage="과제를 검색 & 선택해주세요."
                    placeholder="과제를 선택해주세요"
                    sx={{ width: 600 }}
                  />
                  {/*<OutlinedButton*/}
                  {/*  size="small"*/}
                  {/*  buttonName="과제 검색"*/}
                  {/*  onClick={agncSearchModalOpen}*/}
                  {/*/>*/}
                  <OutlinedButton
                    size="small"
                    buttonName="과제 검색"
                    onClick={openPopup}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                연구
                {/*<Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box>*/}
              </TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={`/code/orsh/prjtDetail/list?type=${prjcCode}`}
                      inputName={`prjtDetailCode`}
                    />
                  </ErrorContainer>
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                품의번호{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="loaNum"
                    required={true}
                    errorMessage="품의번호를 입력해주세요."
                    placeholder="품의번호를 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 프로젝트 검색 모달*/}
      <LazyProjectSearchModal
        onClose={agncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={1000}
        setCodeDataChange={setCodeDataChange}
      />
    </>
  );
}
