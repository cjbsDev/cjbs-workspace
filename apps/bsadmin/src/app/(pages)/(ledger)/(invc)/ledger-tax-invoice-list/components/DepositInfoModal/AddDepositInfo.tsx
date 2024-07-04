import React from "react";
import { ContainedButton } from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";

const AddDepositInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invcDpstList",
  });
  const handleAppend = () => {
    append({
      dpstDttm: null,
      dpstPrice: 0,
      pyrNm: "",
    });
  };
  return <ContainedButton buttonName="Add" onClick={handleAppend} />;
};

export default AddDepositInfo;
