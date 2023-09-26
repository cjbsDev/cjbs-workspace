import React from "react";
import { cjbsTheme, Form } from "cjbsDSTM";
// import { useRouter } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { IconButton, Stack } from "@mui/material";
import MyIcon from "icon/MyIcon";
import KeywordClearBtn from "./KeywordClearBtn";
import KeywordSearchBtn from "./KeywordSearchBtn";
import SearchInput from "./SearchInput";
import { useSearchParams } from "next/navigation";

const KeywordSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultObject = {};
  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }

  console.log("Keyword values ==>>", resultObject);

  const defaultValues = resultObject;
  const onSubmit = (data: any) => {
    console.log("Keyword ==>>", data);

    const result = "?" + new URLSearchParams(data).toString();
    console.log("RESULT", result);

    router.push(`/order-list${result}`);
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Stack direction="row" spacing={1}>
        <SearchInput />
        <KeywordSearchBtn />
      </Stack>
    </Form>
  );
};

export default KeywordSearch;
