import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  cjbsTheme,
  ContainedButton,
  DeletedButton,
  InputPriceType,
  InputValidation,
  SingleDatePicker,
  TD,
  TH,
} from "cjbsDSTM";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import AddDepositInfo from "./AddDepositInfo";
import MyIcon from "icon/MyIcon";

const DepositInfoDynamicTable = () => {
  const {
    control,
    getValues,
    formState,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invcDpstList",
  });

  const handleAppend = () => {
    append({
      dpstDttm: null,
      dpstPrice: 0,
      pyrNm: "",
    });
  };

  return (
    <>
      <TableContainer sx={{ mb: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TH></TH>
              <TH align="center">입금일자</TH>
              <TH align="center">입금자</TH>
              <TH align="center">입금액</TH>
              <TH></TH>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={`invcDpstList${index.toString()}`}>
                <TD align="center">{index + 1}</TD>
                <TD>
                  <SingleDatePicker
                    inputName={`invcDpstList.${index}.dpstDttm`}
                    // required={true}
                    // textAlign="end"
                  />
                </TD>
                <TD>
                  <InputValidation inputName={`invcDpstList.${index}.pyrNm`} />
                </TD>
                <TD>
                  {/*<InputValidation inputName={`invcDpstList.${index}.dpstPrice`} />*/}
                  <Controller
                    name={`invcDpstList[${index}].dpstPrice`}
                    control={control}
                    rules={{ required: "입금액을 입력해야 합니다." }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <NumericFormat
                        defaultValue={0}
                        value={value}
                        thousandSeparator={true}
                        onValueChange={(values) => {
                          onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
                        }}
                        customInput={InputPriceType}
                      />
                    )}
                  />
                  {errors.productDetailList?.[index]?.unitPrice && (
                    <Typography
                      variant="body2"
                      color={cjbsTheme.palette.warning.main}
                    >
                      입금액을 입력 해주세요.
                    </Typography>
                  )}
                </TD>
                <TD>
                  <IconButton onClick={() => remove(index)}>
                    <MyIcon
                      icon="trash"
                      size={18}
                      color={cjbsTheme.palette.error.main}
                    />
                  </IconButton>
                </TD>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center">
        <ContainedButton
          buttonName="입금 정보 추가"
          onClick={handleAppend}
          size="small"
          disabled={fields.length >= 5}
        />
      </Stack>
    </>
  );
};

export default DepositInfoDynamicTable;
