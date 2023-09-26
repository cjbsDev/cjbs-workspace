import React from "react";
import { cjbsTheme } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

const KeywordSearchBtn = () => {
  // const router = useRouter();
  const { watch } = useFormContext();

  const keywordWatch = watch("Keyword");
  console.log("watch!!!!!", keywordWatch);

  return (
    <IconButton
      disabled={
        keywordWatch === "" || keywordWatch === undefined ? true : false
      }
      type="submit"
      size="small"
      sx={{
        width: 34,
        backgroundColor: cjbsTheme.palette.primary.main,
        borderRadius: "0px 4px 4px 0px !important",
        "&:hover": {
          backgroundColor: cjbsTheme.palette.primary.main,
        },
        "&:disabled": {
          backgroundColor: cjbsTheme.palette.secondary.main,
        },
      }}
    >
      <MyIcon icon="search" size={18} color="white" />
    </IconButton>
  );
};

export default KeywordSearchBtn;
