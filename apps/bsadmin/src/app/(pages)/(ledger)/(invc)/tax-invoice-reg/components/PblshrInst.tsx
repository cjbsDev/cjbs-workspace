import React from "react";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { InputValidation, OutlinedButton, TD, TH } from "cjbsDSTM";
import RepresentName from "./RepresentName";
import BusinessRegNo from "./BusinessRegNo";
import { useSetRecoilState } from "recoil";
import { instModalShowAtom } from "../atom";
import { useFormContext } from "react-hook-form";

const PblshrInst = () => {
  const { watch, getValues } = useFormContext();
  const paymentInfoValue = watch("pymtInfoCc");
  const setShowInstSearchModal = useSetRecoilState(instModalShowAtom);
  const handleInstSearchModalOpen = () => {
    setShowInstSearchModal(true);
  };

  if (paymentInfoValue === "BS_1914004") {
    return null;
  }

  return (
    <>
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
                  inputName="rcvEmail"
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
    </>
  );
};

export default PblshrInst;
