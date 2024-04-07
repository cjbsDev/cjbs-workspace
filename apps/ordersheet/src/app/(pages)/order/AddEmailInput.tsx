"use client";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  InputValidation,
} from "cjbsDSTM";

export default function AddEmailInput() {
  const {watch} = useFormContext();
  const mailRcpnListValue = watch("mailRcpnList");
  // etcRcpn이 선택되었는지 여부를 확인합니다.
  const isEtcRcpnSelected = mailRcpnListValue.includes("etcRcpn");

  console.log('mailRcpnListValue', mailRcpnListValue);
  console.log('isEtcRcpnSelected', isEtcRcpnSelected);

  return (
    <>
      <InputValidation
        inputName="addEmailList"
        placeholder="example@gmail.com, example2@gmail.com"
        pattern={
          /^[\w\.-]+@[\w\.-]+\.\w+(,\s*[\w\.-]+@[\w\.-]+\.\w+)*$/
        }
        patternErrMsg="이메일 형식이 아닙니다."
        sx={{ width: 550 }}
        InputProps={{
          readOnly : !isEtcRcpnSelected // etcRcpn이 선택되면 readOnly를 해제합니다.
        }}
      />
    </>
  );
}
