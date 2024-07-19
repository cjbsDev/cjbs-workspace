import React from "react";
import {
  InputAdornment,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ContainedButton, InputValidation, TD, TH } from "cjbsDSTM";
import RemainingAmount from "./RemainingAmount";
import { useFormContext, useWatch } from "react-hook-form";

const SettlementContainer = () => {
  const { control, setValue, getValues, watch } = useFormContext();
  const rmnPrePymtPrice = Number(
    getValues("rmnPrePymtPrice").replaceAll(",", ""),
  );
  const fieldArrayName = "costList";
  const productValue =
    useWatch({
      name: fieldArrayName,
      control,
    }) || []; // productValue가 undefined일 경우 빈 배열을 기본값으로 사용

  if (productValue.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="subtitle1">정산</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>남은금액</TH>
              <TD sx={{ width: "85%" }}>
                <RemainingAmount />
              </TD>
            </TableRow>
            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "15%" }}>정산이력</TH>*/}
            {/*  <TD sx={{ width: "85%" }}>*/}
            {/*    <TableContainer sx={{ mb: 1 }}>*/}
            {/*      <Table>*/}
            {/*        <TableBody>*/}
            {/*          <TableRow>*/}
            {/*            <TH sx={{ width: "25%" }}>방법</TH>*/}
            {/*            <TH sx={{ width: "25%" }}>구분</TH>*/}
            {/*            <TH sx={{ width: "25%" }}>비용</TH>*/}
            {/*            <TH sx={{ width: "25%" }}>비고</TH>*/}
            {/*          </TableRow>*/}
            {/*          <TableRow>*/}
            {/*            <TD sx={{ width: "25%" }}>선결제</TD>*/}
            {/*            <TD sx={{ width: "25%" }}>자동 정산 예정</TD>*/}
            {/*            <TD sx={{ width: "25%" }}>*/}
            {/*              <InputValidation*/}
            {/*                inputName="settlementCost"*/}
            {/*                required={true}*/}
            {/*                sx={{*/}
            {/*                  width: "100%",*/}
            {/*                  ".MuiOutlinedInput-input": {*/}
            {/*                    textAlign: "end",*/}
            {/*                  },*/}
            {/*                  "&.MuiTextField-root": {*/}
            {/*                    backgroundColor: "#F1F3F5",*/}
            {/*                  },*/}
            {/*                }}*/}
            {/*                InputProps={{*/}
            {/*                  readOnly: true,*/}
            {/*                  endAdornment: (*/}
            {/*                    <InputAdornment position="end">*/}
            {/*                      <Typography*/}
            {/*                        variant="body2"*/}
            {/*                        sx={{ color: "black" }}*/}
            {/*                      >*/}
            {/*                        원*/}
            {/*                      </Typography>*/}
            {/*                    </InputAdornment>*/}
            {/*                  ),*/}
            {/*                }}*/}
            {/*              />*/}
            {/*            </TD>*/}
            {/*            <TD sx={{ width: "25%" }}>-</TD>*/}
            {/*          </TableRow>*/}
            {/*        </TableBody>*/}
            {/*      </Table>*/}
            {/*    </TableContainer>*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
            {rmnPrePymtPrice > 0 && (
              <TableRow>
                <TH sx={{ width: "15%" }}>정산이력</TH>
                <TD sx={{ width: "85%" }}>
                  <TableContainer sx={{ mb: 1 }}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TH sx={{ width: "25%" }}>방법</TH>
                          <TH sx={{ width: "25%" }}>구분</TH>
                          <TH sx={{ width: "25%" }}>비용</TH>
                          <TH sx={{ width: "25%" }}>비고</TH>
                        </TableRow>
                        <TableRow>
                          <TD sx={{ width: "25%" }}>선결제</TD>
                          <TD sx={{ width: "25%" }}>자동 정산 예정</TD>
                          <TD sx={{ width: "25%" }}>
                            <InputValidation
                              inputName="settlementCost"
                              required={true}
                              sx={{
                                width: "100%",
                                ".MuiOutlinedInput-input": {
                                  textAlign: "end",
                                },
                                "&.MuiTextField-root": {
                                  backgroundColor: "#F1F3F5",
                                },
                              }}
                              InputProps={{
                                readOnly: true,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "black" }}
                                    >
                                      원
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </TD>
                          <TD sx={{ width: "25%" }}>-</TD>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TD>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SettlementContainer;
