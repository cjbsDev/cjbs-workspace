"use client";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { ContainedButton, LinkButton, OutlinedButton } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";

export default function QuickCopy() {
  const [checked, setChecked] = React.useState(false);
  const methods = useFormContext();
  const { setValue, getValues, watch, clearErrors, control } = methods;
  const values = getValues(["custNm", "ebcEmail", "telList"]);

  // const watcher = watch("quickCopyChck");
  // console.log("Checkbox Watch", watcher);

  // console.log(values);

  const quickCopyValue = () => {
    setValue("ordrAplcNm", values[0]);
    setValue("ordrAplcEmail", values[1]);
    setValue("ordrAplcTel", values[2]);
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
        // sx={{
        //   color: "black",
        // }}
      />
    </>
  );
}
