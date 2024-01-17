import React from "react";
import { ContainedButton } from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";

const RowAddBtn = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "detailList",
  });

  const handleAppend = () => {
    append({ srvcCtgrMc: "", anlsTypeMc: "", jjj: "" });
  };
  return <ContainedButton buttonName="ADD" onClick={handleAppend} />;
};

export default RowAddBtn;
