import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { InputValidation } from "cjbsDSTM";
import KeywordClearBtn from "./KeywordClearBtn";
import { useFormContext } from "react-hook-form";
import debounce from "lodash.debounce";

const SearchInput = () => {
  // const { trigger } = useFormContext();
  return (
    <InputValidation
      placeholder="검색"
      inputName="keyword"
      // onChange={() => console.log("%%%%%%%%%", trigger("Keyword"))}
      // onChange={debounce(async () => {
      //   console.log("sdfsdfsdf");
      //   await trigger("Keyword");
      // }, 500)}
      sx={{ width: 208, mr: -1.5, backgroundColor: "white" }}
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
