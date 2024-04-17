import React from "react";
import {
  Box,
  BoxProps,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { InputValidation, TD, TH } from "cjbsDSTM";
import DataTable from "./NewDataTable";

const Index = () => {
  return (
    <>
      <DataTable />

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>오더 정보</TH>
              <TD sx={{ width: "35%" }}>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="orderInfo"
                  required={true}
                  errorMessage="오더 번호 입력해 주세요."
                />
              </TD>
              <TH sx={{ width: "15%" }}>샘플 정보</TH>
              <TD sx={{ width: "35%" }}>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="sampleInfo"
                  required={true}
                  errorMessage="샘플 번호를 입력해 주세요."
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
              <TD>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={3}
                  inputName="memo"
                  placeholder="메모"
                  sx={{ py: 0.5 }}
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Index;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
