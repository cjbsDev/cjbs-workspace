import React from "react";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { rmnPriceDetailShowInfoAtom } from "../atom";
import { cjbsTheme } from "cjbsDSTM";

const RmnPymtDetailBtn = ({ rmnPymtPrice }) => {
  const [show, setShow] = useRecoilState(rmnPriceDetailShowInfoAtom);

  // const rmnPrice = getValues("rmnPrice");
  const isDisabled = !rmnPymtPrice || rmnPymtPrice <= 0; // 조건 로직 단순화

  const handleIconClick = () => {
    setShow(!show);
  };

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
