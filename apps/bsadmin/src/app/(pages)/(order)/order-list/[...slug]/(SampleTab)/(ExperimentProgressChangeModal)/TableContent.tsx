import React from "react";
import { TableBody, TableRow, Typography } from "@mui/material";
import { ErrorContainer, Fallback, SingleDatePicker, TD, TH } from "cjbsDSTM";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import EmailSendType from "./EmailSendType";

const LazyPhaseSelectbox = dynamic(() => import("./PhaseSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyConditionSelectbox = dynamic(() => import("./ConditionSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const TableContent = () => {
  const { getValues, watch } = useFormContext();

  const analysisPhaseMc = watch("analysisPhaseMc");
  const statusCc = watch("statusCc");

  console.log("단계", analysisPhaseMc);
  // BS_0100004001, BS_0100004007
  console.log("상태", statusCc);
  // BS_0902005

  return (
    <TableBody>
      <TableRow>
        <TH sx={{ width: "20%" }}>단계</TH>
        <TD colSpan={3}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyPhaseSelectbox />
          </ErrorContainer>
        </TD>
      </TableRow>
      <TableRow>
        <TH sx={{ width: "20%" }}>상태</TH>
        <TD colSpan={3}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyConditionSelectbox />
          </ErrorContainer>
        </TD>
      </TableRow>
      {(statusCc === "BS_0902004" ||
        statusCc === "BS_0902005" ||
        statusCc === "BS_0902006" ||
        statusCc === "BS_0902007") && (
        <TableRow>
          <TH sx={{ width: "20%" }}>완료일</TH>
          <TD colSpan={3}>
            <SingleDatePicker inputName="compDttm" />
          </TD>
        </TableRow>
      )}

      {(analysisPhaseMc === "BS_0100004001" ||
        analysisPhaseMc === "BS_0100004007") &&
        statusCc === "BS_0902005" && (
          <TableRow>
            <TH>메일전송여부</TH>
            <TD>
              <EmailSendType />
            </TD>
          </TableRow>
        )}
    </TableBody>
  );
};

export default TableContent;
