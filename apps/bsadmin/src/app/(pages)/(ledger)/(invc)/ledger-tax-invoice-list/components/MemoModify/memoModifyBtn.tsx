import React from "react";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { memoModifyAtom } from "../../atom";

const MemoModifyBtn = ({ memo, invcUkey }) => {
  const setReportModifyIs = useSetRecoilState(memoModifyAtom);

  const handleMemoModifyModal = () => {
    console.log("memo ==>>", memo, invcUkey);
    setReportModifyIs((prevState) => ({
      ...prevState,
      isOpen: true,
      memo: memo,
      invcUkey: invcUkey,
    }));
  };

  return (
    <IconButton onClick={handleMemoModifyModal}>
      <MyIcon icon="pencil-alt" size={18} />
    </IconButton>
  );
};

export default MemoModifyBtn;
