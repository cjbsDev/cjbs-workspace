"use client";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  Checkbox,
  ContainedButton,
  LinkButton,
  OutlinedButton,
} from "cjbsDSTM";
import ToggleButton from "@mui/material/ToggleButton";
import MyIcon from "icon/myIcon";

export default function QuickCopy() {
  const [checked, setChecked] = React.useState(false);
  const methods = useFormContext();
  const { setValue, getValues, watch, clearErrors } = methods;
  const values = getValues(["custNm", "ebcEmail", "telList"]);

  const watcher = watch("quickCopyChck");
  console.log("Checkbox Watch", watcher);

  console.log(values);

  const quickCopyValue = () => {
    setValue("ordrRcpnNm", values[0]);
    setValue("ordrRcpnEmail", values[1]);
    setValue("ordrRcpnTel", values[2]);
  };

  const quickCopyValueClearErr = () => {
    // setChecked(!checked);
    quickCopyValue();
    values[0] !== null && clearErrors("ordrRcpnNm");
    values[1] !== null && clearErrors("ordrRcpnEmail");
    values[2] !== null && clearErrors("ordrRcpnTel");
  };

  return (
    <>
      {/*<ToggleButton*/}
      {/*  value="check"*/}
      {/*  selected={checked}*/}
      {/*  onClick={quickCopyValueClearErr}*/}
      {/*  onChange={() => {*/}
      {/*    setChecked(!checked);*/}
      {/*  }}*/}
      {/*  sx={{*/}
      {/*    border: "none",*/}
      {/*    p: 0,*/}
      {/*    backgroundColor: "transparent",*/}
      {/*    "&.MuiToggleButton-root": {*/}
      {/*      p: 0,*/}
      {/*      pl: 1.5,*/}
      {/*      pr: 1.5,*/}
      {/*      color: "black",*/}
      {/*      ":hover": {*/}
      {/*        backgroundColor: "transparent",*/}
      {/*      },*/}
      {/*    },*/}
      {/*    "&.Mui-selected": {*/}
      {/*      backgroundColor: "transparent",*/}
      {/*      ":hover": {*/}
      {/*        backgroundColor: "transparent",*/}
      {/*      },*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <MyIcon icon={!checked ? "checkbox" : "checkbox-fill"} size={20} />*/}
      {/*  연구책임자 정보 입력*/}
      {/*</ToggleButton>*/}
      <LinkButton
        buttonName="연구책임자 정보 입력"
        size="small"
        onClick={quickCopyValueClearErr}
        startIcon={<MyIcon icon={"files"} size={20} />}
        sx={{
          color: "black",
        }}
      />
    </>
  );
}
