import React, { useEffect } from "react";
import { InputValidation } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { mngEmailListAtom } from "../../../../../recoil/atoms/mngEmailListAtom";

const Memo = () => {
  const [resEamilList, setResEmailList] = useRecoilState(mngEmailListAtom);
  const { getValues, watch, resetField } = useFormContext();

  useEffect(() => {
    if (resEamilList.length === 0) resetField("memo");
  }, [resEamilList]);

  return (
    <InputValidation
      fullWidth={true}
      multiline
      rows={2}
      inputName="memo"
      placeholder="내용을 입력해 주세요."
      maxLength={500}
      maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
      required={true}
      errorMessage="코멘트를 입력하세요."
    />
  );
};

export default Memo;
