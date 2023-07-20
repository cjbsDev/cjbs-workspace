import { NativeSelect } from "@mui/material";
import * as React from "react";
import { cjbsTheme } from "../../themes";
import { useFormContext } from "react-hook-form";

interface SelectBoxProps {
  options: {
    value: string;
    optionName: string;
  }[];
  inputName: string;
  resetFiledName?: string | undefined;
}
export function SelectBox({
  options,
  inputName,
  resetFiledName,
  ...rest
}: SelectBoxProps) {
  const methods = useFormContext();
  return (
    <NativeSelect
      {...methods.register(inputName, {
        onChange: () => methods.resetField(resetFiledName),
      })}
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
      <option value={undefined}>선택하세요</option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.optionName}
        </option>
      ))}
    </NativeSelect>
  );
}
