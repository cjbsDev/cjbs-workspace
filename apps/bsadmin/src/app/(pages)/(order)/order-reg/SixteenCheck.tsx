import React from "react";
import { RadioGV } from "cjbsDSTM";
import fetcher from "../../../func/fetcher";
import useSWR from "swr";
import axios from "axios";

const data = [
  { value: "Y", optionName: "요청함" },
  { value: "N", optionName: "요청안함" },
];
const SixteenCheck = () => {
  return (
    <RadioGV
      data={data}
      inputName="isCheck16s"
      required={true}
      errorMessage="요청부분을 선택해 주세요."
    />
  );
};

export default SixteenCheck;
