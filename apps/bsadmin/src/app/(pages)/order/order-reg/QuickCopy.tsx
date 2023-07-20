"use client";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "cjbsDSTM";

export default function QuickCopy() {
  // const [checked, setChecked] = React.useState(false);
  const methods = useFormContext();
  const { setValue, getValues, watch } = methods;
  const values = getValues(["custNm", "ebcEmail", "telList"]);

  const watcher = watch("checkTest7");
  console.log("Checkbox Watch", watcher);

  const quickCopyValue = () => {
    setValue("ordrRcpnNm", values[0]);
    setValue("ordrRcpnEmail", values[1]);
    setValue("ordrRcpnTel", values[2]);
  };

  if (watcher === "Y") quickCopyValue();

  return (
    <>
      <Checkbox
        inputName="checkTest7"
        labelText="연구책임자 정보 입력"
        value="Y"
      />
    </>
  );
}
