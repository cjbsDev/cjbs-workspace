import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { InputValidation } from "cjbsDSTM";
import KeywordClearBtn from "./KeywordClearBtn";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";

const SearchInput = () => {
  // const { getValues, setValue } = useFormContext();
  // const searchParams = useSearchParams();
  // const resultObject = {};
  // for (const [key, value] of searchParams.entries()) {
  //   resultObject[key] = value;
  // }
  // console.log("Keyword Value ==>>", resultObject.Keyword);
  // setValue("Keyword", resultObject.Keyword);

  return (
    <InputValidation
      placeholder="검색"
      inputName="Keyword"
      sx={{ width: 208, mr: -1.5 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <KeywordClearBtn />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
