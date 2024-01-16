import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { NumericFormat, PatternFormat } from "react-number-format";
import { cjbsTheme, InputEAType, InputNumberType } from "cjbsDSTM";
import { Stack, Typography } from "@mui/material";

const AccountStatementInput = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack spacing={0.5}>
      <Controller
        name="invcNum"
        control={control}
        rules={{ required: "세금계산서 번호를 다시 한번 확인해 주세요." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          // <NumericFormat
          //   defaultValue={0}
          //   value={value}
          //   thousandSeparator={true}
          //   allowNegative={false}
          //   onValueChange={(values) => {
          //     onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
          //   }}
          //   customInput={InputEAType}
          // />

          <PatternFormat
            format="########-########-########"
            value={value}
            onValueChange={(values) => {
              onChange(values.value); // `values.value`를 사용하여 문자열로 처리, `values.floatValue` 는 숫자로 처리
            }}
            valueIsNumericString={true}
            customInput={InputNumberType}
            type="text"
          />
        )}
      />
      {errors.invcNum && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
          sx={{ pl: 0.5 }}
        >
          세금계산서 번호를 다시 한번 확인해 주세요.
        </Typography>
      )}
    </Stack>
  );
};

export default AccountStatementInput;
