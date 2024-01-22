import React from "react";
import { RadioGV } from "cjbsDSTM";

const TypeSelectRadio: React.FC<{
  data: { value: string; optionName: string }[];
  inputName: string;
}> = ({ data, inputName }) => {
  return (
    <RadioGV
      data={data}
      inputName={inputName}
      required={true}
      errorMessage="선택해주세요."
    />
  );
};

export default TypeSelectRadio;
