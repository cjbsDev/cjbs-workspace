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
  CheckboxGV, cjbsTheme, ErrorContainer, Fallback,
  InputValidation,
  OutlinedButton,
  PostCodeBtn, RadioGV,
  TD,
  TH,
} from "cjbsDSTM";
import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import {useRecoilState} from "recoil";
import {prjcCodeAtom} from "../../../../recoil/atoms/fileIdValueAtom";


const LazyProjectSearchModal = dynamic(() => import("../../orsh-order/ProjectSearchModal"), {
  ssr: false,
});

const LazyPrepSelectbox = dynamic(
  () => import("../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

export default function StudySelection(props: any) {

  // // [프로젝트 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] = useState<boolean>(false);
  // const [prjcCode, setPrjcCode] = useState<string>('');
  const [prjcCode, setPrjcCode] = useRecoilState(prjcCodeAtom);

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

  useEffect(() => {
    // console.log("{{{{{{{{{{{{{{", props.prjcCode);
    setPrjcCode(props.prjcCode)
  }, [prjcCode])

  return (
    <>
      <Typography variant="subtitle1">
        주문자 정보
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>과제 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="prjcUniqueCode"
                    disabled={true}
                    required={true}
                    errorMessage="과제를 검색 & 선택해주세요."
                    placeholder="과제 코드"
                    sx={{ width: 200 }}
                  />
                  <InputValidation
                    inputName="prjcNm"
                    disabled={true}
                    required={true}
                    errorMessage="과제를 검색 & 선택해주세요."
                    placeholder="과제를 선택해주세요"
                    sx={{ width: 600 }}
                  />
                  <OutlinedButton
                    size="small"
                    buttonName="과제 검색"
                    onClick={agncSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>연구 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={`/code/orsh/prjtDetail/list?type=${prjcCode}`}
                      inputName={`prjcDetailCode`}
                    />
                  </ErrorContainer>
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
