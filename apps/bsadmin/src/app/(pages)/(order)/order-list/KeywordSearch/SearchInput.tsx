import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { InputValidation } from "cjbsDSTM";
import KeywordClearBtn from "./KeywordClearBtn";

const SearchInput = () => {
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