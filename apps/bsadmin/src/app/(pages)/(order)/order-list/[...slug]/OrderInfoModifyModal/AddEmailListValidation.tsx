import React, { useEffect } from "react";
import { InputValidation } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";

const AddEmailListValidation = () => {
  const { watch, clearErrors } = useFormContext();
  const isAddEmailList = watch("mailRcpnList").includes("etcRcpn");

  useEffect(() => {
    if (isAddEmailList === false) {
      clearErrors("addEmailList");
    }
  }, [isAddEmailList]);

  // console.log("WATCH!!@..@", isAddEmailList);

  return (
    <InputValidation
      required={isAddEmailList}
      errorMessage={isAddEmailList ? "이메일을 입력해 주세요." : null}
      inputName="addEmailList"
      placeholder="example@gmail.com, example2@gmail.com"
    />
  );
};

export default AddEmailListValidation;
