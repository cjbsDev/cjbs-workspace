import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { SingleDatePicker, TD, TH } from "cjbsDSTM";
import { standDate } from "../../../../../func/standDate";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";

const PublicationInfo = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  console.log("TYPE", type);

  const { getValues } = useFormContext();
  console.log("getStandDate", getValues("issuDttm"));
  const getStandDate = getValues("issuDttm");
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
                  {/* 현재 달 기준으로 앞, 뒤로 5일까지만 등록 가능 */}
                  <SingleDatePicker
                    inputName="issuDttm"
                    required={true}
                    errorMessage="발행일을 입력하세요"
                    includeDateIntervals={standDate(getStandDate)}
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
