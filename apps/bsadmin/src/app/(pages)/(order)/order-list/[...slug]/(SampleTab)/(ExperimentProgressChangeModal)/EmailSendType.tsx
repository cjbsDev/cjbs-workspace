import React from "react";
import { RadioGV } from "cjbsDSTM";
import { isSendEmailData } from "../../../../../../data/inputDataLists";

const EmailSendType = () => {
  return (
    <RadioGV
      data={isSendEmailData}
      inputName="isSendEmail"
      // required={true}
      // errorMessage="오더 타입을 선택해 주세요."
    />
  );
};

export default EmailSendType;
