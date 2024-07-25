import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { cjbsTheme, InputNumberType } from "cjbsDSTM";
import { Stack, Typography } from "@mui/material";

const BusinessNumber = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack spacing={0.5}>
      <Controller
        name="brno"
        control={control}
        rules={{ required: "사업자 등록 번호를 다시 한번 확인해 주세요." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <PatternFormat
            format="###-##-#####"
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
      {errors.brno && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
          sx={{ pl: 0.5 }}
        >
          사업자 등록 번호를 다시 한번 확인해 주세요.
        </Typography>
      )}
    </Stack>
  );
};

export default BusinessNumber;
