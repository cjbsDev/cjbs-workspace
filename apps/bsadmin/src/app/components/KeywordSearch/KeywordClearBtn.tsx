import React from "react";
import MyIcon from "icon/MyIcon";
import { IconButton } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toggledClearRowsAtom } from "../../recoil/atoms/toggled-clear-rows-atom";

const KeywordClearBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { resetField, watch, setValue } = useFormContext();
  const [toggledClearRows, setToggleClearRows] =
    useRecoilState(toggledClearRowsAtom);

  const keywordWatch = watch("keyword");
  // console.log("keyword Watch!!!!!", keywordWatch);

  const searchParams = useSearchParams();

  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  // console.log(">>>>>>>>>", resultObject.uKey);

  const result = "?" + new URLSearchParams(resultObject).toString();
  // console.log("WWWWWRESULT@#@#@#", JSON.stringify(result));

  const handleKeywordClear = () => {
    resetField("keyword");
    setValue("keyword", undefined);
    setToggleClearRows(!toggledClearRows);
    const params = new URLSearchParams(searchParams.toString());
    console.log("@@@@@@@@@@@PARAMS CLEAR", params.toString());
    params.delete("keyword");

    // params.delete("keyword");
    router.push(
      resultObject.uKey !== undefined
        ? `${pathname}?uKey=${resultObject.uKey}`
        : `${pathname}?${params.toString()}`,
    );
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
