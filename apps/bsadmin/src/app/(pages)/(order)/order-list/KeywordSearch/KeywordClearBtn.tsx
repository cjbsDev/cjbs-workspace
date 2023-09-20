import React from "react";
import { cjbsTheme } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

const KeywordClearBtn = () => {
  const router = useRouter();
  const { resetField } = useFormContext();

  const handleKeywordClear = () => {
    resetField("Keyword");
    router.push(`/order-list`);
  };

  return (
    <IconButton
      onClick={handleKeywordClear}
      sx={{
        border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
        width: 34,
      }}
    >
      <MyIcon icon="arrow-counterclockwise" size={20} color="black" />
    </IconButton>
  );
};

export default KeywordClearBtn;
