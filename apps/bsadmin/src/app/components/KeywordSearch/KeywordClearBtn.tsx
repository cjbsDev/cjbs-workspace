import React from "react";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

const KeywordClearBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { resetField, watch, setValue } = useFormContext();

  const keywordWatch = watch("Keyword");
  // console.log("watch!!!!!", keywordWatch);

  const handleKeywordClear = () => {
    resetField("Keyword");
    setValue("Keyword", undefined);
    router.push(pathname);
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
