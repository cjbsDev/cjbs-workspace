"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { OutlinedButton } from "cjbsDSTM";

export const AddressDeleteButton = () => {
  const { setValue } = useFormContext();

  const handleClick = () => {
    setValue("zip", '');
    setValue("addr", '');
    setValue("addrDetail", '');
  };

  return (
    <OutlinedButton
      size="small"
      buttonName="삭제"
      color="error"
      onClick={handleClick}
      sx={{height:"30px"}}
    />
  );
};
