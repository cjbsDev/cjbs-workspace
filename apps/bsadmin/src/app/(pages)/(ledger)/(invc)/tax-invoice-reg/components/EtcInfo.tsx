import React from "react";
import {
  Box,
  BoxProps,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { InputValidation, TD, TH } from "cjbsDSTM";

const EtcInfo = () => {
  return (
    <>
      <Typography variant="subtitle1">기타정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "85%" }}>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="memo"
                  placeholder="메모"
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                보고서<NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "85%" }}>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="report"
                  placeholder="보고서"
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

export default EtcInfo;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
