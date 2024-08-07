"use client";
import * as React from "react";
import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import { Controller, useFormContext, ValidationRule } from "react-hook-form";
import debounce from "lodash.debounce";
import { EA, Won } from "../../molecules/Adorment";
import { NumericFormat } from "react-number-format";
import { useRef, forwardRef } from "react";
// import NumericFormat from "./NumericFormat";

type InputValidationProps = TextFieldProps & {
  required?: boolean;
  inputName: string;
  placeholder?: string;
  pattern?: ValidationRule<RegExp> | undefined;
  maxLength?: number;
  minLength?: number;
  errorMessage?: string | null;
  patternErrMsg?: string;
  maxLengthErrMsg?: string;
  minLengthErrMsg?: string;
  onBlur?: any;
  onChange?: () => void | undefined;
};
export const InputValidation = ({
  required = false,
  inputName,
  errorMessage,
  maxLength,
  minLength,
  pattern,
  patternErrMsg,
  maxLengthErrMsg,
  minLengthErrMsg,
  onBlur,
  onChange,
  ...props
}: InputValidationProps) => {
  const methods = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Stack>
        <TextField
          {...props}
          error={methods.formState.errors[inputName] ? true : false}
          variant="outlined"
          sx={{
            ...props.sx,
          }}
          InputProps={{
            style: {
              paddingTop: props.multiline ? 5 : undefined,
              paddingBottom: props.multiline ? 5 : undefined,
            },
            ...props.InputProps,
          }}
          {...methods.register(inputName, {
            onChange: onChange,
            onBlur: onBlur,
            maxLength: maxLength && {
              value: maxLength ?? 0,
              message: maxLength + "글자 이내로 입력 바랍니다.",
            },
            minLength: minLength && {
              value: minLength ?? 0,
              message: minLength + "자 이상 입력 바랍니다.",
            },
            pattern: pattern && {
              value: pattern,
              message: errorMessage,
            },
            required: required,
          })}
        />
        {methods.formState.errors[inputName]?.type === "required" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {errorMessage}
          </Typography>
        )}
        {methods.formState.errors[inputName]?.type === "pattern" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {patternErrMsg}
          </Typography>
        )}
        {methods.formState.errors[inputName]?.type === "maxLength" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {maxLengthErrMsg}
          </Typography>
        )}
        {methods.formState.errors[inputName]?.type === "minLength" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {minLengthErrMsg}
          </Typography>
        )}
      </Stack>
    </ThemeProvider>
  );
};

export const TextareaValidation = () => {
  return (
    <InputValidation
      fullWidth={true}
      multiline
      rows={4}
      inputName="memo"
      placeholder="메모"
      maxLength={500}
      maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
    />
  );
};

export const InputDefaultType = ({ ...props }: TextFieldProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        size="small"
        variant="outlined"
        sx={{
          ...props.sx,
        }}
      />
    </ThemeProvider>
  );
};

export const InputPriceNewType = forwardRef((props, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack>
      <Controller
        name="price"
        control={control}
        ref={ref}
        rules={{ required: true }}
        render={({ field }) => (
          <NumericFormat
            {...field}
            customInput={InputPriceType2}
            thousandSeparator
            onValueChange={(values, sourceInfo) => {
              // console.log(values, sourceInfo);
              field.onChange(values.value);
            }}
          />
        )}
      />
      {errors.price && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
          sx={{ pl: 0.5 }}
        >
          금액을 입력해 주세요.
        </Typography>
      )}
    </Stack>
  );
});

export const InputPriceType2 = ({ ...props }: TextFieldProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        error={errors.price}
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          ...props.sx,
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
        }}
        inputMode="numeric"
        InputProps={{
          endAdornment: <Won />,
        }}
      />
    </ThemeProvider>
  );
};

export const InputPriceType = ({ ...props }: TextFieldProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          ...props.sx,
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
        }}
        inputMode="numeric"
        InputProps={{
          endAdornment: <Won />,
        }}
      />
    </ThemeProvider>
  );
};

export const InputValidEANewType = ({ name, displayType = "input" }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack>
      <Controller
        name="sampleCnt"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <NumericFormat
              {...field}
              displayType={displayType}
              customInput={InputEAType}
              thousandSeparator
              onValueChange={(values, sourceInfo) => {
                // console.log(values, sourceInfo);
                field.onChange(values.value);
              }}
            />
            {displayType === "text" && <Typography>개</Typography>}
          </Stack>
        )}
      />
      {errors.sampleCnt && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
          sx={{ pl: 0.5 }}
        >
          샘플개수를 입력해 주세요.
        </Typography>
      )}
    </Stack>
  );
};

export const InputEAType = ({ ...props }: TextFieldProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        size="small"
        variant="outlined"
        sx={{
          ...props.sx,
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
        }}
        inputMode="numeric"
        InputProps={{
          endAdornment: <EA />,
        }}
      />
    </ThemeProvider>
  );
};

export const InputNumberType = ({ ...props }: TextFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          ...props.sx,
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
        }}
        inputMode="numeric"
        error={!!errors.tel}
      />
    </ThemeProvider>
  );
};

export const InputNumberAndStringType = ({ ...props }: TextFieldProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          ...props.sx,
          ".MuiOutlinedInput-input": {
            textAlign: "end",
          },
        }}
        inputMode="text"
      />
    </ThemeProvider>
  );
};
