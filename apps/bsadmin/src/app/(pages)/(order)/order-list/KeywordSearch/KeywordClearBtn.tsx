import React from "react";
import { cjbsTheme } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

const KeywordClearBtn = () => {
  const router = useRouter();
  const { resetField, watch, setValue } = useFormContext();

  const keywordWatch = watch("Keyword");
  console.log("watch!!!!!", keywordWatch);

  const handleKeywordClear = () => {
    console.log("Clear Click!");
    resetField("Keyword");
    setValue("Keyword", undefined);
    router.push(`/order-list`);
  };

  return (
    <IconButton
      onClick={handleKeywordClear}
      sx={{
        display:
          keywordWatch === "" || keywordWatch === undefined ? "none" : "",
      }}
    >
      <MyIcon icon="x-circle" size={18} color="black" />
    </IconButton>
  );
};

export default KeywordClearBtn;
