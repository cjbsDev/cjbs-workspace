"use client";
import * as React from "react";
import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import { useFormContext, ValidationRule } from "react-hook-form";
import debounce from "lodash.debounce";
import { EA, Won } from "../../molecules/Adorment";

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
          // size="small"
          sx={{
            ...props.sx,
          }}
          {...methods.register(inputName, {
            // onChange: (e) => console.log(e.target.value),
            // onChange: (e) =>
            //   debounce(() => {
            //     console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ", e.target.value);
            //   }),
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
        ></TextField>
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
      />
    </ThemeProvider>
  );
};
