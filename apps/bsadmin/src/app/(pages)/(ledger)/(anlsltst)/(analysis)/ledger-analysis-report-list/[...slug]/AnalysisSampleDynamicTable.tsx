import * as React from "react";

import {
  Stack,
  Table,
  TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
} from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";
import TableNewRows from "./TableNewRows";
import {QuestionTooltip} from "../../../../../../components/QuestionTooltip";

export default function AnalysisSampleDynamicTable() {
  const { control, getValues, formState, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const watchFieldArray = watch("sample");
  const controlledFields = fields.map((field, index) => {
    // console.log("*****************", field)
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const { errors } = formState;

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">분석내역</Typography>
        </Stack>
      </Stack>
      <TableContainer sx={{ mb: 2, borderTop: "1px solid #000" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: cjbsTheme.palette.grey[100] }}>
              {/*<TableCell sx={{ paddingX: 2, paddingY: 1 }}>*/}
              {/*  <Typography variant="subtitle2">No.</Typography>*/}
              {/*</TableCell>*/}
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '15%' }}>
                <Typography variant="subtitle2">서비스 타입</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Typography variant="subtitle2">기준가</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '5%' }}>
                <Typography variant="subtitle2">수량</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Typography variant="subtitle2">단가</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                  <Typography variant="subtitle2">공급가액</Typography>
                  <QuestionTooltip sampleCloumn="supplyPrice" />
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Typography variant="subtitle2">부가세</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Typography variant="subtitle2">사용할인율</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '30%' }}>
                <Typography variant="subtitle2">사유</Typography>
              </TableCell>
              {/*<TableCell sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '5%' }}></TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            { controlledFields.map((field, index) => {
              return (
                <TableNewRows
                  key={field.id}
                  field={field}
                  remove={remove}
                  index={index}
                  errors={errors}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
