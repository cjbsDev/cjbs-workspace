import React from "react";
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
  InputValidation,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
} from "cjbsDSTM";
import RepresentName from "./RepresentName";
import BusinessRegNo from "./BusinessRegNo";
import { useSetRecoilState } from "recoil";
import { instModalShowAtom } from "../atom";
import { useFormContext } from "react-hook-form";

const PublicationInfo = () => {
  // const { watch, getValues } = useFormContext();
  // const paymentInfoValue = watch("pymtInfoCc");
  // const setShowInstSearchModal = useSetRecoilState(instModalShowAtom);
  // const handleInstSearchModalOpen = () => {
  //   setShowInstSearchModal(true);
  // };
  //
  // if (paymentInfoValue === "BS_1914004") {
  //   return null;
  // }

  return (
    <>
      <Typography variant="subtitle1">발행 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>발행일</TH>
              <TD>
                <Box sx={{ width: 200 }}>
                  <SingleDatePicker
                    inputName="issuDttm"
                    required={true}
                    errorMessage="발행일을 입력하세요"
                  />
                </Box>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PublicationInfo;
