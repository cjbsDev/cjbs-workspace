import React, { useCallback } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { InputValidation } from "cjbsDSTM";
import KeywordClearBtn from "./KeywordClearBtn";
import { useFormContext } from "react-hook-form";
import _ from "lodash";

const SearchInput = () => {
  // const { trigger, setValue, handleSubmit } = useFormContext();

  const debouncedChangeHandler = useCallback(
    _.debounce((inputValue) => {
      console.log("Keyword Debounce ==>> ", inputValue);
      // 여기에 입력값 검증 로직을 추가할 수 있습니다.
    }, 500),
    [],
  );

  return (
    <InputValidation
      placeholder="검색어를 입력해 주세요."
      inputName="keyword"
      sx={{ width: 208, mr: -1.5, backgroundColor: "white" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <KeywordClearBtn />
          </InputAdornment>
        ),
      }}
      onChange={(e) => debouncedChangeHandler(e.target.value)}
    />
  );
};

export default SearchInput;
