import React from "react";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { rmnPriceDetailShowAtom } from "../atom";
import { cjbsTheme } from "cjbsDSTM";

const RmnPymtDetailBtn = () => {
  const { watch, getValues } = useFormContext();
  const [show, setShow] = useRecoilState(rmnPriceDetailShowAtom);

  const rmnPrice = getValues("rmnPrice");
  const paymentInfoValue = watch("pymtInfoCc");
  const isDisabled = !rmnPrice || rmnPrice <= 0; // 조건 로직 단순화

  const handleIconClick = () => {
    setShow(!show);
  };

  if (paymentInfoValue === "BS_1914004") {
    return null;
  }

  return (
    <IconButton disabled={isDisabled} onClick={handleIconClick}>
      <MyIcon
        icon={!show ? "plus" : "minus"}
        color={isDisabled ? cjbsTheme.palette.grey["400"] : "black"}
        size={18}
      />
    </IconButton>
  );
};

export default RmnPymtDetailBtn;
