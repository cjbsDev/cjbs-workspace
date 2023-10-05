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

const LazyOrderTypeChck = dynamic(() => import("./OrderTypeChck"), {
  ssr: false,
});

const LazyDateTypeSelctbox = dynamic(
  () => import("../../../../components/DateTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const LazyStatusTypeSelctbox = dynamic(
  () => import("../../../../components/StatusTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

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

  if (resultObject.typeCcList === undefined) {
    defaultValues = resultObject;
  } else {
    const typeCcList = resultObject.typeCcList.split(",");
    const newResultObject = {
      ...resultObject,
      typeCcList: typeCcList,
    };

    // console.log("NEW DEFAULTVALUES", newResultObject);
    defaultValues = newResultObject;
  }

  if (resultObject.dateTypeCc !== undefined) {
    // 변환할 날짜 문자열 가져오기
    const { startDttm, endDttm } = resultObject;

    // 날짜 문자열을 Date 객체로 변환
    resultObject.startDttm = new Date(startDttm);
    resultObject.endDttm = new Date(endDttm);
  }

  console.log("DEFAULTVALUES", resultObject);

  const currentQueryString = new URLSearchParams(resultObject).toString();
  console.log("currentQueryString", currentQueryString);
  const keywordQueryString = currentQueryString.split("&", 1);
  console.log("OnlyKeyword ==>>", keywordQueryString);

  const onSubmit = async (data: any) => {
    console.log("결과내 검색 Data ==>>", data);
    let result;
    //
    // if (data.dateRange !== undefined) {
    //   const [startDttm, endDttm] = data.dateRange.map((dateStr) =>
    //     dayjs(dateStr).format("YYYY-MM-DD")
    //   );
    //   data.startDttm = startDttm;
    //   data.endDttm = endDttm;
    //   data.dateRange = undefined;
    // }
    //
    // console.log("DATA>>>>>", data);

    // 날짜
    if (
      data.dateTypeCc === "" &&
      data.startDttm !== null &&
      data.endDttm !== null
    ) {
      console.log("날짜 타입을 선택해 주세요");
      return;
    } else if (
      data.dateTypeCc !== "" &&
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

    // URLSearchParams() 생성자(constructor) ==> Convert Object to Query String
    // URLSearchParams(filteredObject).toString() ==> 물음표없이 쿼리 스트링 반환
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
    router.push(`/order-list`);
    onClose();
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ width: 539, p: 3.5, pb: 1 }}>
        <Section>
          <SectionLabel variant="subtitle2">진행사항</SectionLabel>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyStatusTypeSelctbox />
          </ErrorContainer>
        </Section>
        <Section>
          <SectionLabel variant="subtitle2">담당자</SectionLabel>
          <Grid container>
            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">영업</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="bsnsMngrList" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">실험</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="expMngrList" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">분석</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="anlsMngrList" fullWidth />
            </Grid>
          </Grid>
        </Section>
        <Section>
          <SectionLabel variant="subtitle2">거래처 / 기관</SectionLabel>
          <Grid container>
            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">거래처</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="agncNmList" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">기관</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="instNmList" fullWidth />
            </Grid>
          </Grid>
        </Section>
        {/*<Section>*/}
        {/*  <SectionLabel variant="subtitle2">날짜</SectionLabel>*/}

        {/*  <Stack direction="row" spacing={1}>*/}
        {/*    <ErrorContainer FallbackComponent={Fallback}>*/}
        {/*      <LazyDateTypeSelctbox />*/}
        {/*    </ErrorContainer>*/}
        {/*    /!*<DateRangePicker inputName="dateRange" />*!/*/}

        {/*    <SingleDatePicker inputName="startDttm" />*/}
        {/*    <SingleDatePicker inputName="endDttm" />*/}
        {/*  </Stack>*/}
        {/*</Section>*/}
        <Section>
          <SectionLabel variant="subtitle2">오더타입</SectionLabel>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyOrderTypeChck />
          </ErrorContainer>
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
          <CheckboxSV
            inputName="isExcludeResult"
            labelText="위 검색 조건 목록에서 제외 합니다."
            value="Y"
          />
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
