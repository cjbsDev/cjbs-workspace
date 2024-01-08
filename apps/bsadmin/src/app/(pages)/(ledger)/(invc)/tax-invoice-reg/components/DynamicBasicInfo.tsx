import React, { useCallback } from "react";
import {
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
  TD,
  TH,
} from "cjbsDSTM";
import AgncAndInstName from "./AgncAndInstName";
import NGSSalesManagerSelectbox from "../../../../../components/NGSSalesManagerSelectbox";
import { useSetRecoilState } from "recoil";
import { agncModalShowAtom } from "../atom";
import { useFormContext } from "react-hook-form";

const DynamicBasicInfo = () => {
  const { watch, getValues } = useFormContext();
  const agncUkeyValue = watch("agncUkey");
  const setShowAgncSearchModal = useSetRecoilState(agncModalShowAtom);

  const handleAgncSearchModalOpen = useCallback(() => {
    console.log("PPPPPPPPPPPP");

    setShowAgncSearchModal(true);
  }, []);

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
    </>
  );
};

export default DynamicBasicInfo;
