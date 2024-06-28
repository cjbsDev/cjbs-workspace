import * as React from "react";
import {
  FormGroup,
  FormControlLabel,
  Input,
  Typography,
  InputProps,
  Stack,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import { SyntheticEvent } from "react";

interface CheckboxSVProps extends InputProps {
  inputName: string;
  labelText?: string;
  waringIs?: boolean;
  errorMessage?: string;
  value?: string | boolean;
  required?: boolean;
  onChange?: (e: SyntheticEvent) => void;
}

export const CheckboxSV = ({
  inputName,
  labelText,
  value,
  waringIs,
  errorMessage,
  onChange,
  required = false,
  ...props
}: CheckboxSVProps) => {
  const methods = useFormContext();
  const { formState } = methods;
  const { errors } = formState;
  return (
    <ThemeProvider theme={cjbsTheme}>
      <FormControlLabel
        sx={{
          color: waringIs
            ? cjbsTheme.palette.warning.main
            : cjbsTheme.palette.common.black,
        }}
        control={
          <Input
            {...methods.register(inputName, {
              required: required,
              // onChange: onChange,
              onChange: onChange,
            })}
            {...props}
            type="checkbox"
            defaultValue={value}
            disableUnderline={true}
            sx={{
              width: 16,
              ml: 1.5,
              mr: 1,
            }}
          />
        }
        label={labelText}
      />
      {errors[inputName]?.type === "required" && (
        <Typography
          variant="body2"
          sx={{ color: cjbsTheme.palette.warning.main }}
        >
          {errorMessage}
        </Typography>
      )}
      {/*<Typography*/}
      {/*  variant="body2"*/}
      {/*  sx={{ ml: "-8px !important", display: "inline-block" }}*/}
      {/*>*/}
      {/*  {subMessage}*/}
      {/*</Typography>*/}
    </ThemeProvider>
  );
};

interface CheckboxGVProps extends CheckboxSVProps {
  data: object;
  errorMessage?: string;
  direction?: "column-reverse" | "column" | "row-reverse" | "row";
}

export const CheckboxGV = (props: CheckboxGVProps) => {
  const { data, inputName, required, errorMessage, direction = "row" } = props;
  const methods = useFormContext();
  const { formState } = methods;
  const { errors } = formState;
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Stack>
        <FormGroup>
          <Stack direction={direction} useFlexGap flexWrap="wrap">
            {data.map((item: any) => {
              return (
                <CheckboxSV
                  key={item.value}
                  required={required}
                  inputName={inputName}
                  labelText={item.optionName}
                  value={item.value}
                />
              );
            })}
          </Stack>
        </FormGroup>
        {errors[inputName]?.type === "required" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {errorMessage}
          </Typography>
        )}
      </Stack>
    </ThemeProvider>
  );
};
