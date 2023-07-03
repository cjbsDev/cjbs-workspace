import { NativeSelect } from "@mui/material";
import * as React from "react";
import { cjbsTheme } from "../../themes";

interface SelectBoxProps {
  register: any;
  options: {
    value: string;
    optionName: string;
  }[];
  inputName: string;
}
export function SelectBox({
  register,
  options,
  inputName,
  ...rest
}: SelectBoxProps) {
  return (
    <NativeSelect
      {...register(inputName)}
      {...rest}
      color="secondary"
      disableUnderline={true}
      sx={{
        border: `1px solid ${cjbsTheme.palette.grey["A400"]}`,
        borderRadius: 1,
        pl: 1,
        pr: 1,
      }}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.optionName}
        </option>
      ))}
    </NativeSelect>
  );
}
