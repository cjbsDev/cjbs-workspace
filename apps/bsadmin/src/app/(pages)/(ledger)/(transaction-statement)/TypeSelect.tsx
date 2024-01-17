import React from "react";
import { RadioGV } from "cjbsDSTM";

const data = [
  { value: "BS_2300001", optionName: "내부용" },
  { value: "BS_2300002", optionName: "외부용" },
];
const TypeSelect = () => {
  return (
    <RadioGV
      data={data}
      inputName="tdstTypeCc"
      required={true}
      errorMessage="유형을 선택해주세요."
    />
  );
};

export default TypeSelect;
