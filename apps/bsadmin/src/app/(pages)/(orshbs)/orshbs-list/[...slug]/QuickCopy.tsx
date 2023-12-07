"use client";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  OutlinedButton,
} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";

export default function QuickCopy() {
  const [checked, setChecked] = React.useState(false);
  const methods = useFormContext();
  const { setValue, getValues, watch, clearErrors, control } = methods;
  const values = getValues(["rhpiNm", "ebcEmail", "rhpiTel"]);

  const quickCopyValue = () => {
    setValue("ordrAplcNm", getValues("rhpiNm"));
    setValue("ordrAplcEmail", getValues("ebcEmail"));
    setValue("ordrAplcTel", getValues("rhpiTel"));
  };

  const quickCopyValueClearErr = () => {
    // setChecked(!checked);
    quickCopyValue();
    values[0] !== null && clearErrors("ordrAplcNm");
    values[1] !== null && clearErrors("ordrAplcEmail");
    values[2] !== null && clearErrors("ordrAplcTel");
  };

  return (
    <>
      <OutlinedButton
        buttonName="연구책임자 정보와 동일"
        size="small"
        onClick={quickCopyValueClearErr}
        color="primary"
        endIcon={<MyIcon icon={"cheveron-right"} size={20} />}
      />
    </>
  );
}
