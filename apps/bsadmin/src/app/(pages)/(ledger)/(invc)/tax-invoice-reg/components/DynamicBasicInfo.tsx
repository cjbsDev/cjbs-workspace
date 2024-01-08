import React, { useCallback } from "react";
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
  cjbsTheme,
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
} from "cjbsDSTM";
import AgncAndInstName from "./AgncAndInstName";
import NGSSalesManagerSelectbox from "../../../../../components/NGSSalesManagerSelectbox";
import { useSetRecoilState } from "recoil";
import { agncModalShowAtom } from "../atom";
import { useFormContext } from "react-hook-form";

const DynamicBasicInfo = () => {
  const { watch } = useFormContext();
  const agncUkeyValue = watch("agncUkey");
  const setShowAgncSearchModal = useSetRecoilState(agncModalShowAtom);

  const handleAgncSearchModalOpen = useCallback(() => {
    setShowAgncSearchModal(true);
  }, [setShowAgncSearchModal]);

  return (
    <>
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
            {agncUkeyValue !== "" && agncUkeyValue !== undefined && (
              <TableRow>
                <TH sx={{ width: "15%" }}>영업담당자</TH>
                <TD sx={{ width: "85%" }}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <NGSSalesManagerSelectbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {(!agncUkeyValue || agncUkeyValue === "") && (
        <Stack
          spacing={0.2}
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: cjbsTheme.palette.grey["200"],
            py: 5,
            mb: 3,
            mt: -3,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: "600", textDecoration: "underline" }}
          >
            거래처를 먼저 검색해 주세요.
          </Typography>
          <Typography variant="body2">
            이렇게 하면 추가 정보(결제정보, 요청금액, 발행처 정보 등)를 입력할
            수 있습니다.
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default DynamicBasicInfo;
