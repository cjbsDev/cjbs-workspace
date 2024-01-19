"use client";

import React from "react";
import {
  CheckboxSV,
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  DateRangePicker,
  SingleDatePicker,
  SelectBox,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Grid,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
// import { dateTypeCcData } from "../../../../data/inputDataLists";

const SearchForm = ({ onClose }) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let defaultValues;

  // console.log("PATHNAME", pathname);

  const resultObject = {};
  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }

  console.log("resultObject", resultObject);
  // if (resultObject.typeCcList === undefined) {
  //   defaultValues = resultObject;
  // } else {
  //   const typeCcList = resultObject.typeCcList.split(",");
  //   const newResultObject = {
  //     ...resultObject,
  //     typeCcList: typeCcList,
  //   };
  //
  //   // console.log("NEW DEFAULTVALUES", newResultObject);
  //   defaultValues = newResultObject;
  // }
  if (resultObject.startDttm !== undefined) {
    //
    const { startDttm, endDttm } = resultObject;
    // 날짜 문자열을 Date 객체로 변환
    resultObject.startDttm = new Date(startDttm);
    resultObject.endDttm = new Date(endDttm);
    defaultValues = resultObject;
  }

  // if (resultObject.dateTypeCc !== undefined) {
  //   // 변환할 날짜 문자열 가져오기
  //   const { startDttm, endDttm } = resultObject;
  //   // 날짜 문자열을 Date 객체로 변환
  //   resultObject.startDttm = new Date(startDttm);
  //   resultObject.endDttm = new Date(endDttm);
  // }

  console.log("SEARCH FORM DEFAULTVALUES", resultObject);

  const currentQueryString = new URLSearchParams(resultObject).toString();
  console.log("currentQueryString", currentQueryString);
  const keywordQueryString = currentQueryString.split("&", 1);
  console.log("OnlyKeyword ==>>", keywordQueryString);

  const onSubmit = async (data: any) => {
    console.log("결과내 검색 Data ==>>", data);
    let result;

    // 날짜
    if (
      data.startDttm === null &&
      data.endDttm === null
    ) {
      console.log("날짜 선택해 주세요");
      return;
    } else {
      // console.log("날짜 타입을 선택해 주세요");
      // return;

      // 변환할 날짜 문자열 가져오기
      const { startDttm, endDttm } = data;

      // 날짜 문자열을 Date 객체로 변환
      data.startDttm = dayjs(startDttm).format("YYYY-MM-DD");
      data.endDttm = dayjs(endDttm).format("YYYY-MM-DD");
    }

    const filteredObject = {};

    for (const [key, value] of Object.entries(data)) {
      if (
        value !== "" &&
        value !== undefined &&
        value !== false &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        if (key === "typeCcList") {
          filteredObject[key] = value.join(",");
        } else {
          filteredObject[key] = value;
        }
      }
    }

    // delete filteredObject.Keyword;

    console.log("filteredObject", filteredObject);

    if (JSON.stringify(resultObject) === "{}") {
      console.log("키워드 미포함 검색!");
      if (JSON.stringify(filteredObject) === "{}") {
        return onClose();
      } else {
        result = "?" + new URLSearchParams(filteredObject).toString();
        router.push(`${pathname}${result}`);
      }
    } else {
      console.log("키워트 포함 검색!");
      result = new URLSearchParams(filteredObject).toString();
      console.log("HERE RESULT", result);
      if (result === "&") {
        router.push(`${pathname}?${keywordQueryString}`);
      }
      router.push(`${pathname}?${result}`);
    }

    onClose();
  };

  const handleKeywordClear = () => {
    // resetField("Keyword");
    router.push(`/analysis-report-list`);
    onClose();
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ width: 539, p: 3.5, pb: 1, minHeight: 360 }}>
        <Section>
          <SectionLabel variant="subtitle2">날짜</SectionLabel>
          <Stack direction="row" spacing={1}>
            <SingleDatePicker inputName="startDttm" />
            <SingleDatePicker inputName="endDttm" />
          </Stack>
        </Section>
      </Box>
      <Box
        sx={{
          backgroundColor: cjbsTheme.palette.grey["50"],
          p: 2.5,
          textAlign: "center",
        }}
      >
        <Stack spacing={2} justifyContent="center" alignItems="center">
          {/*<CheckboxSV*/}
          {/*  inputName="isExcludeResult"*/}
          {/*  labelText="위 검색 조건 목록에서 제외 합니다."*/}
          {/*  value="Y"*/}
          {/*/>*/}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <OutlinedButton
              onClick={handleKeywordClear}
              buttonName="초기화"
              size="small"
            />
            <ContainedButton buttonName="검색" type="submit" size="small" />
          </Stack>
        </Stack>
      </Box>
    </Form>
  );
};

export default SearchForm;

const Section = styled(Box)<BoxProps>(({ theme }) => ({
  color: theme.palette.common.black,
  marginBottom: 24,
}));
const SectionLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: 8,
}));
