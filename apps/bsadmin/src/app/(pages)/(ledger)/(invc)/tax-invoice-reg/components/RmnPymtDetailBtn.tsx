import React from "react";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { rmnPriceDetailShowAtom } from "../atom";

const RmnPymtDetailBtn = () => {
  const { getValues } = useFormContext();
  // const setNamesState = useSetRecoilState(rmnPriceDetailShowAtom);
  const [show, setShow] = useRecoilState(rmnPriceDetailShowAtom);

  const rmnPrice = getValues("rmnPrice");
  return (
    <IconButton
      disabled={rmnPrice === 0 || rmnPrice === undefined || rmnPrice === ""}
    >
      <MyIcon
        icon={!show ? "plus" : "minus"}
        color={"black"}
        size={18}
        onClick={() => {
          setShow(!show);
        }}
      />
    </IconButton>
  );
};

export default RmnPymtDetailBtn;
