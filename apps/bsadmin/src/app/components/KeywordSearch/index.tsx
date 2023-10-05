import React from "react";
import { Form } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { Stack } from "@mui/material";
import KeywordSearchBtn from "./KeywordSearchBtn";
import SearchInput from "./SearchInput";
import { usePathname, useSearchParams } from "next/navigation";

const KeywordSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultObject = {};
  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }

  // console.log("Keyword values ==>>", resultObject);

  const defaultValues = resultObject;
  const onSubmit = (data: any) => {
    // console.log("Keyword ==>>", data);

    const result = "?" + new URLSearchParams(data).toString();
    // console.log("RESULT", result);

    router.push(`${pathname}${result}`);
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
