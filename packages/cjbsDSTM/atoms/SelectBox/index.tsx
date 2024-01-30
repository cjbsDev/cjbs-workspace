import { NativeSelect, NativeSelectProps, Typography } from "@mui/material";
import * as React from "react";
import { cjbsTheme } from "../../themes";
import { useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";

interface SelectBoxProps extends NativeSelectProps {
  options: {
    value: string;
    optionName: string;
  }[];
  inputName: string;
  resetFiledName?: string | undefined;
  required?: boolean;
  defaultOption?: boolean;
  defaultMsg?: string;
  errorMessage?: string;
}
export function SelectBox({
  options,
  inputName,
  resetFiledName,
  required = false,
  errorMessage = "필수 값입니다.",
  defaultOption = true,
  defaultMsg = "선택",
  ...props
}: SelectBoxProps) {
  const methods = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <NativeSelect
        {...methods.register(inputName, {
          required: required,
          onChange: () => methods.resetField(resetFiledName),
        })}
        {...props}
        color="secondary"
        disableUnderline={true}
        sx={{
          ...props.sx,
          border: methods.formState.errors[inputName]
            ? `1px solid ${cjbsTheme.palette.warning.main}`
            : `1px solid ${cjbsTheme.palette.grey["A400"]}`,
          borderRadius: 1,
          pl: 1,
          pr: 1,
        }}
      >
        {defaultOption == true && <option value="">{defaultMsg}</option>}

        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.optionName}
            </option>
          );
        })}
      </NativeSelect>
      {methods.formState.errors[inputName]?.type === "required" && (
        <Typography
          variant="body2"
          sx={{ color: cjbsTheme.palette.warning.main, mt: 0.5, ml: 1 }}
        >
          {errorMessage}
        </Typography>
      )}
    </ThemeProvider>
  );
}

export function SelectBox2({ options, ...props }) {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <NativeSelect
        {...props}
        defaultValue={props.defaultValue}
        color="secondary"
        disableUnderline={true}
        sx={{
          ...props.sx,
          backgroundColor: "white",
          border: `1px solid ${cjbsTheme.palette.grey["A400"]}`,
          borderRadius: 1,
          pl: 1,
          pr: 1,
        }}
      >
        <option value="ALL">전체</option>
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.optionName}
            </option>
          );
        })}
      </NativeSelect>
    </ThemeProvider>
  );
}
