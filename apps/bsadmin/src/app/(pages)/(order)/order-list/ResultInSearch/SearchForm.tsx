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
import { dateTypeCcData } from "../../../../data/inputDataLists";
import { toast } from "react-toastify";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";

const LazyOrderTypeChck = dynamic(() => import("./OrderTypeChck"), {
  ssr: false,
});

const LazyAnlsTypeChck = dynamic(() => import("./AnlsTypeChck"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyStatusTypeSelctbox = dynamic(
  () => import("../../../../components/StatusTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazySampleCategorySelectbox = dynamic(
  () => import("../../../../components/SampleCategorySelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyPlatformCategorySelectbox = dynamic(
  () => import("../../../../components/PlatformCategorySelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyOrderDateTypeSelectbox = dynamic(
  () => import("./OrderDateTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const SearchForm = ({ onClose }) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [resultObject, result] = useResultObject();
  console.log("resultObject", resultObject);

  // let defaultValues;
  //
  // if (
  //   resultObject?.typeCcList === undefined ||
  //   resultObject?.anlsTypeMcList === undefined
  // ) {
  //   defaultValues = resultObject;
  // } else {
  //   const typeCcList = resultObject.typeCcList.split(",");
  //   const anlsTypeMcList = resultObject.anlsTypeMcList.split(",");
  //
  //   console.log(typeCcList);
  //
  //   const newResultObject = {
  //     ...resultObject,
  //     typeCcList: typeCcList,
  //     anlsTypeMcList: anlsTypeMcList,
  //   };
  //   defaultValues = newResultObject;
  // }

  const defaultValues = {
    ...resultObject,
    typeCcList:
      resultObject?.typeCcList !== undefined
        ? resultObject?.typeCcList.split(",")
        : [],
    anlsTypeMcList:
      resultObject?.anlsTypeMcList !== undefined
        ? resultObject?.anlsTypeMcList.split(",")
        : [],
  };

  if (resultObject?.dateTypeCc !== undefined) {
    // 변환할 날짜 문자열 가져오기
    const { startDttm, endDttm } = resultObject;

    // 날짜 문자열을 Date 객체로 변환
    resultObject.startDttm = new Date(startDttm);
    resultObject.endDttm = new Date(endDttm);
  }

  console.log("SEARCH FORM DEFAULTVALUES", resultObject);

  const currentQueryString = new URLSearchParams(resultObject).toString();
  console.log("currentQueryString", currentQueryString);
  const keywordQueryString = currentQueryString.split("&", 1);
  console.log("OnlyKeyword ==>>", keywordQueryString);

  const onSubmit = async (data: any) => {
    console.log("결과내 검색 Data ==>>", data);

    // data.startDttm = dayjs(data.startDttm).format("YYYY-MM-DD");
    // data.endDttm = dayjs(data.endDttm).format("YYYY-MM-DD");

    let result;

    // 날짜
    if (
      data.dateTypeCc === "" &&
      (data.startDttm === undefined || data.startDttm === null) &&
      (data.endDttm === undefined || data.endDttm === null)
    ) {
      data.dateTypeCc = "";
      data.startDttm = undefined;
      data.endDttm = undefined;
    } else if (
      (data.dateTypeCc !== "" &&
        (data.startDttm === undefined || data.startDttm === null)) ||
      data.endDttm === undefined ||
      data.endDttm === null
    ) {
      console.log("날짜 선택해 주세요");
      toast("날짜 선택해 주세요");
      // data.startDttm = undefined;
      // data.endDttm = undefined;
      return;
    } else if (
      data.dateTypeCc === "" &&
      data.startDttm !== "" &&
      data.endDttm !== ""
    ) {
      console.log("날짜 타입을 선택해 주세요");
      toast("날짜 타입을  선택해 주세요");
      return;
    } else {
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
    router.push(pathname);
    onClose();
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ width: 620, p: 3, pb: 1 }}>
        {/*<Stack direction="row">*/}
        {/*  <Typography variant="subtitle2">진행사항</Typography>*/}
        {/*  <ErrorContainer FallbackComponent={Fallback}>*/}
        {/*    <LazyStatusTypeSelctbox />*/}
        {/*  </ErrorContainer>*/}
        {/*</Stack>*/}
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Section>
              <SectionLabel variant="subtitle2">진행사항</SectionLabel>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyStatusTypeSelctbox />
              </ErrorContainer>
            </Section>
          </Grid>
          <Grid item xs={3}>
            <Section>
              <SectionLabel variant="subtitle2">샘플종류</SectionLabel>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazySampleCategorySelectbox />
              </ErrorContainer>
            </Section>
          </Grid>
          <Grid item xs={7}>
            <Section>
              <SectionLabel variant="subtitle2">플랫폼종류</SectionLabel>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyPlatformCategorySelectbox />
              </ErrorContainer>
            </Section>
          </Grid>
        </Grid>

        <Section>
          <SectionLabel variant="subtitle2">분석종류</SectionLabel>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyAnlsTypeChck />
          </ErrorContainer>
        </Section>

        <Grid container spacing={1}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
        </Grid>

        <Section>
          <SectionLabel variant="subtitle2">과제 / 연구</SectionLabel>
          <Grid container>
            <Grid
              item
              xs={1}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">과제</Typography>
            </Grid>
            <Grid item xs={11} sx={{ mb: 1 }}>
              <InputValidation inputName="prjtCodeVal" fullWidth />
            </Grid>

            <Grid
              item
              xs={1}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2">연구</Typography>
            </Grid>
            <Grid item xs={11} sx={{ mb: 1 }}>
              <InputValidation inputName="prjtDetailCodeVal" fullWidth />
            </Grid>
          </Grid>
        </Section>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Section>
              <SectionLabel variant="subtitle2">날짜</SectionLabel>
              <Stack direction="row" spacing={1}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyOrderDateTypeSelectbox />
                </ErrorContainer>
                {/*<SelectBox*/}
                {/*  inputName="dateTypeCc"*/}
                {/*  options={dateTypeCcData}*/}
                {/*  sx={{ width: 250 }}*/}
                {/*/>*/}

                <SingleDatePicker inputName="startDttm" />
                <SingleDatePicker inputName="endDttm" />
              </Stack>
            </Section>
          </Grid>
          <Grid item xs={5}>
            <Section>
              <SectionLabel variant="subtitle2">오더타입</SectionLabel>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyOrderTypeChck />
              </ErrorContainer>
            </Section>
          </Grid>
          <Grid item xs={7}>
            <Section>
              <SectionLabel variant="subtitle2">메모</SectionLabel>
              <InputValidation inputName="memo" fullWidth />
            </Section>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: cjbsTheme.palette.grey["50"],
          p: 2,
          textAlign: "center",
        }}
      >
        <Stack spacing={1} justifyContent="center" alignItems="center">
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
  marginBottom: 10,
}));
const SectionLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: 4,
}));
