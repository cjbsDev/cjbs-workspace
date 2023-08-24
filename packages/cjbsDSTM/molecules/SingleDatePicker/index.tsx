import React, { forwardRef, useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./new-react-datepicker.css";
import styles from "./datepicker.module.scss";
import { InputAdornment, TextField } from "@mui/material";
import MyIcon from "icon/myIcon";

interface SingleDatePickerProps {
  inputName: string;
}

export const SingleDatePicker = (props: SingleDatePickerProps) => {
  const { inputName } = props;
  const { control } = useFormContext();

  // const CustomInput = forwardRef(({ value, onClick }, ref) => {
  //   return <TextField />;
  // };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <TextField
      value={value}
      onClick={onClick}
      ref={ref}
      inputProps={{ readOnly: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <MyIcon icon="calendar" size={20} />
          </InputAdornment>
        ),
      }}
      sx={{
        width: 188,
        ".MuiOutlinedInput-input:read-only": {
          backgroundColor: "white",
          cursor: "pointer",
        },
      }}
    />
  ));

  return (
    <Controller
      control={control}
      name={inputName}
      render={({ field }) => {
        // console.log("FIELD VALUE ==>>", field.value);
        return (
          <DatePicker
            placeholderText="날짜를 선택해 주세요."
            className={styles.dateInput}
            dateFormat="yyyy-MM-dd"
            locale={ko}
            onChange={(e) => field.onChange(e)}
            selected={field.value}
            showPopperArrow={false}
            customInput={<CustomInput />}
          />
        );
      }}
    />
  );
};

export default SingleDatePicker;
