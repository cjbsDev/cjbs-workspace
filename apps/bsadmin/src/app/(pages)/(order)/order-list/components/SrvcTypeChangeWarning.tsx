import React, { useCallback } from "react";
import { TD } from "cjbsDSTM";
import { Alert, TableRow } from "@mui/material";
import { useFormContext } from "react-hook-form";

const SrvcTypeChangeWarning = ({ prevSrvcTypeMc }) => {
  const { watch } = useFormContext();
  const nextSrvcTypeMc = watch("srvcTypeMc");
  return (
    prevSrvcTypeMc !== nextSrvcTypeMc && (
      <TableRow>
        <TD colSpan={2} sx={{ p: 0 }}>
          <Alert severity="warning">
            서비스 타입 변경 시 진행단계(QC~BI)가 초기화됩니다.
          </Alert>
        </TD>
      </TableRow>
    )
  );
};

export default SrvcTypeChangeWarning;
