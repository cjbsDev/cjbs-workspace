import * as React from "react";
import { FormControlLabel, Input, Typography } from "@mui/material";
import { FormProps } from "react-hook-form";

interface CheckboxProps {}

export const Checkbox = ({ register }) => {
  return (
    <FormControlLabel
      control={
        <Input
          {...register("isSpecialMng")}
          type="checkbox"
          defaultValue="Y"
          disableUnderline={true}
          sx={{ width: 18 }}
        />
      }
      label={
        <Typography variant="body2" sx={{ ml: 1 }}>
          특별 관리(SP)하는 거래처 입니다
        </Typography>
      }
    />
  );
};
