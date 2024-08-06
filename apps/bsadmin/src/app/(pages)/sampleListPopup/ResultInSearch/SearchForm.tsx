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
import { toast } from "react-toastify";
import { useResultObject } from "../../../components/KeywordSearch/useResultObject";
// import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";

const LazyOrderTypeChck = dynamic(() => import("./OrderTypeChck"), {
  ssr: false,
});

const LazyAnlsTypeChck = dynamic(() => import("./AnlsTypeChck"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyStatusSampleTypeSelctbox = dynamic(
  () => import("../../../components/StatusSampleTypeSelectbox"),
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
    // typeCcList:
    //   resultObject?.typeCcList !== undefined
    //     ? resultObject?.typeCcList.split(",")
    //     : [],
    // anlsTypeMcList:
    //   resultObject?.anlsTypeMcList !== undefined
    //     ? resultObject?.anlsTypeMcList.split(",")
    //     : [],
  };

  // if (resultObject?.dateTypeCc !== undefined) {
  //   // 변환할 날짜 문자열 가져오기
  //   const { startDttm, endDttm } = resultObject;
  //
  //   // 날짜 문자열을 Date 객체로 변환
  //   resultObject.startDttm = new Date(startDttm);
  //   resultObject.endDttm = new Date(endDttm);
  // }

  console.log("SEARCH FORM DEFAULTVALUES", resultObject);

  const currentQueryString = new URLSearchParams(resultObject).toString();
  // console.log("currentQueryString", currentQueryString);
  const keywordQueryString = currentQueryString.split("&", 1);
  // console.log("OnlyKeyword ==>>", keywordQueryString);

  const onSubmit = async (data: any) => {
    console.log("결과내 검색 Data ==>>", data);
    let result;

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
      console.log("keyword 포함 검색!");
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
    router.push(pathname + `?uKey=${resultObject?.uKey}`);
    onClose();
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ width: 450, p: 3, pb: 1 }}>
        <Section>
          <Grid container>
            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">오더번호</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="orderId" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">Run</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="runId" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">샘플명</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="sampleNm" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">QC</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyStatusSampleTypeSelctbox name={"qcStatusCc"} />
              </ErrorContainer>
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">Lib</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyStatusSampleTypeSelctbox name={"libStatusCc"} />
              </ErrorContainer>
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">Seq</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyStatusSampleTypeSelctbox name={"seqStatusCc"} />
              </ErrorContainer>
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">BI</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyStatusSampleTypeSelctbox name={"biStatusCc"} />
              </ErrorContainer>
            </Grid>
          </Grid>
        </Section>
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
