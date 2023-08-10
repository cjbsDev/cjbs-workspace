import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useFormContext, Controller } from "react-hook-form";

const SingleDatePicker = () => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="check16sAt"
      render={({ field }) => (
        <DatePicker
          onChange={(e) => {
            field.onChange(e);
          }}
          selected={field.value}
          className="date-input"
          dateFormat="yyyy-MM-dd"
          locale={ko}
        />
      )}
    />
  );
};

export default SingleDatePicker;
