import React, { useEffect, useState } from "react";
import { Form } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { Stack } from "@mui/material";
import KeywordSearchBtn from "./KeywordSearchBtn";
import SearchInput from "./SearchInput";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { toggledClearRowsAtom } from "../../recoil/atoms/toggled-clear-rows-atom";

interface ResultObjectProps {
  [key: string]: string;
}
interface CurrentKeywordProps {
  id: number;
  text: string;
}

const KeywordSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toggledClearRows, setToggleClearRows] =
    useRecoilState(toggledClearRowsAtom);
  const [recentWordsBox, setRecentWordsBox] = useState<CurrentKeywordProps[]>(
    [],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem("orderCurrentKeyword") || "[]";
      // 최근검색어 배열에 저장
      setRecentWordsBox(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("orderCurrentKeyword", JSON.stringify(recentWordsBox));
  }, [recentWordsBox]);

  const resultObject: ResultObjectProps = {};
  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }

  console.log("Keyword values ==>>", resultObject);

  const defaultValues = resultObject;
  const onSubmit = (data: { keyword: string }) => {
    // console.log("Keyword ==>>", data.keyword);

    const result = "?" + new URLSearchParams(data).toString();
    // console.log("RESULT", result);
    setToggleClearRows(!toggledClearRows);
    router.push(`${pathname}${result}`);

    // localstorage에 검색에 저장되는 부분 시작
    // 공백제거.
    const removeSpaceKeyword = data.keyword.replace(/(^\s*)|(\s*$)/, "");
    // 최근검색어 배열 복사.
    const temp = [...recentWordsBox];
    // 같은단어 찾기
    const checkSameKeyword = temp.find(
      (data) => data.text === removeSpaceKeyword,
    );

    // 같은 키워드 없을때
    if (!checkSameKeyword) {
      const notSameKeyword = {
        id: Date.now(),
        text: removeSpaceKeyword,
      };

      setRecentWordsBox([notSameKeyword, ...recentWordsBox.splice(0, 10)]);
    }
    // 같은 키워드 있을때
    else if (checkSameKeyword) {
      const sameKeyword = {
        id: Date.now(),
        text: removeSpaceKeyword,
      };

      // 같은 키워드 제거
      const filtered = temp.filter((data) => data.text !== removeSpaceKeyword);
      setRecentWordsBox([sameKeyword, ...filtered.splice(0, 10)]);
    }
    // localstorage에 검색에 저장되는 부분 끝
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
