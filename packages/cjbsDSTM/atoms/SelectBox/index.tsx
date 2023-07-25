import { NativeSelect, Typography } from "@mui/material";
import * as React from "react";
import { cjbsTheme } from "../../themes";
import { useFormContext } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";

interface SelectBoxProps {
  options: {
    value: string;
    optionName: string;
  }[];
  inputName: string;
  resetFiledName?: string | undefined;
  required?: boolean;
  defaultOption?: boolean;
  errorMessage?: string;
}
export function SelectBox({
  options,
  inputName,
  resetFiledName,
  required = false,
  errorMessage,
  defaultOption = true,
  ...rest
}: SelectBoxProps) {
  const methods = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <NativeSelect
        {...methods.register(inputName, {
          required: required,
          onChange: () => methods.resetField(resetFiledName),
        })}
        {...rest}
        color="secondary"
        disableUnderline={true}
        sx={{
          border: methods.formState.errors[inputName]
            ? `1px solid ${cjbsTheme.palette.warning.main}`
            : `1px solid ${cjbsTheme.palette.grey["A400"]}`,
          borderRadius: 1,
          pl: 1,
          pr: 1,
        }}
      >
        {defaultOption == true && <option value="">선택하세요</option>}

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
          sx={{ color: cjbsTheme.palette.warning.main }}
        >
          {errorMessage}
        </Typography>
      )}
    </ThemeProvider>
  );
}
