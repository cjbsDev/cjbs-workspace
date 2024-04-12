import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { cjbsTheme, InputNumberType } from "cjbsDSTM";
import { Stack, Typography } from "@mui/material";

const TelNumber = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack spacing={0.5}>
      <Controller
        name="tel"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <PatternFormat
            format="### - #### - ####"
            allowEmptyFormatting
            mask="_"
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
      {errors.tel && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
          sx={{ pl: 0.5 }}
        >
          전화번호를 입력해 주세요.
        </Typography>
      )}
    </Stack>
  );
};

export default TelNumber;
