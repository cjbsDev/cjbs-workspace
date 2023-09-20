import React from "react";
import { cjbsTheme, DataTableFilter2, Form } from "cjbsDSTM";
import { useRouter } from "next/navigation";
import { IconButton, Stack } from "@mui/material";
import MyIcon from "icon/MyIcon";
import KeywordClearBtn from "./KeywordClearBtn";

const KeywordSearch = () => {
  const router = useRouter();
  const onSubmit = (data: any) => {
    console.log("Keyword ==>>", data);

    const result = "?" + new URLSearchParams(data).toString();
    console.log("RESULT", result);

    router.push(`/order-list${result}`);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Stack direction="row" spacing={1}>
        <DataTableFilter2 />
        <KeywordClearBtn />
      </Stack>
    </Form>
  );
};

export default KeywordSearch;
