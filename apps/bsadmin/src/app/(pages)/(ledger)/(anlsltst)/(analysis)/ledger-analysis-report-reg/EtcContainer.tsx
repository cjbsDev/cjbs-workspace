import React from "react";
import {
  Box,
  BoxProps,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ContainedButton,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
} from "cjbsDSTM";
import { useFormContext, useWatch } from "react-hook-form";
import Link from "next/link";

const EtcContainer = () => {
  const { control, setValue, getValues, watch } = useFormContext();
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
      <Typography variant="subtitle1">기타정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "85%", textAlign: "left" }}>
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EtcContainer;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
