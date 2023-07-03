import { NativeSelect } from "@mui/material";
import * as React from "react";
import { cjbsTheme } from "../../themes";
export function SelectBox({ register, options, inputName, ...rest }) {
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
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </NativeSelect>
  );
}
