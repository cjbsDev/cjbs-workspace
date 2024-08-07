import React from "react";
import {
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  SingleDatePicker,
  SelectBox,
  CheckboxSV,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Divider,
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
import { dateTypeCcData } from "../../../../../data/inputDataLists";
import { toast } from "react-toastify";
import ResetBtn from "./resetBtn";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";

const LazyAnlsTypeChck = dynamic(() => import("./AnlsTypeChck"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyStatusSampleTypeSelctbox = dynamic(
  () => import("../../../../../components/StatusSampleTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

interface SearchFormProps {
  onClose: () => void;
}

const SearchForm = ({ onClose }: SearchFormProps) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [resultObject, result] = useResultObject();
  // let defaultValues;

  // console.log("PATHNAME", pathname);

  const defaultValues = {
    ...resultObject,
    anlsTypeMcList:
      resultObject?.anlsTypeMcList !== undefined
        ? resultObject?.anlsTypeMcList.split(",")
        : [],
  };

  // const resultObject = {};
  // for (const [key, value] of searchParams.entries()) {
  //   resultObject[key] = value;
  // }
  //
  // if (resultObject.typeCcList === undefined) {
  //   defaultValues = resultObject;
  // } else {
  //   const typeCcList = resultObject.typeCcList.split(",");
  //   const newResultObject = {
  //     ...resultObject,
  //     typeCcList: typeCcList,
  //   };
  //
  //   console.log("NEW DEFAULTVALUES", newResultObject);
  //   defaultValues = newResultObject;
  // }

  const currentQueryString = new URLSearchParams(resultObject).toString();
  // console.log("currentQueryString", currentQueryString);
  const keywordQueryString = currentQueryString.split("&", 1);
  // console.log("OnlyKeyword ==>>", keywordQueryString);

  const newkeywordQueryString = currentQueryString.indexOf("keyword");
  // console.log("NewkeywordQueryString", newkeywordQueryString);

  const onSubmit = async (data: any) => {
    console.log("결과내 검색 Data ==>>", data);
    let result;

    const filteredObject = {};

    for (const [key, value] of Object.entries(data)) {
      if (
        value !== "" &&
        value !== undefined &&
        value !== null &&
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
      // console.log("키워드 포함 검색!");
      if (JSON.stringify(filteredObject) === "{}") {
        return onClose();
      } else {
        result = "?" + new URLSearchParams(filteredObject).toString();
        router.push(`${pathname}${result}`);
      }
    } else {
      // console.log("키워트 미포함 검색!");
      result = new URLSearchParams(filteredObject).toString();
      console.log("HERE RESULT", result);

      if (result === "&") {
        router.push(`${pathname}?${keywordQueryString}`);
      }
      router.push(`${pathname}?${result}`);
    }

    onClose();
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ width: 580, p: 3, pb: 1 }}>
        <Section>
          <SectionLabel variant="subtitle2">분석종류</SectionLabel>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyAnlsTypeChck />
          </ErrorContainer>
        </Section>

        <Section>
          <Grid container spacing={1}>
            <Grid item xs={1.3}>
              <SectionLabel variant="subtitle2">담당자</SectionLabel>
            </Grid>
            <Grid item xs={10.7}>
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex" }}
                  alignItems="center"
                  // justifyContent="flex-end"
                >
                  <Typography variant="body2">영업</Typography>
                </Grid>
                <Grid item xs={11}>
                  <InputValidation inputName="bsnsMngrList" fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex" }}
                  alignItems="center"
                  // justifyContent="flex-end"
                >
                  <Typography variant="body2">실험</Typography>
                </Grid>
                <Grid item xs={11}>
                  <InputValidation inputName="expMngrList" fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex" }}
                  alignItems="center"
                  // justifyContent="flex-end"
                >
                  <Typography variant="body2">분석</Typography>
                </Grid>
                <Grid item xs={11}>
                  <InputValidation inputName="anlsMngrList" fullWidth />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/*<SectionLabel variant="subtitle2">담당자</SectionLabel>*/}
          {/*<Grid container spacing={1} sx={{ mb: 1 }}>*/}
          {/*  <Grid*/}
          {/*    item*/}
          {/*    xs={2}*/}
          {/*    sx={{ display: "flex" }}*/}
          {/*    alignItems="center"*/}
          {/*    justifyContent="flex-end"*/}
          {/*  >*/}
          {/*    <Typography variant="body2">영업</Typography>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={10} sx={{}}>*/}
          {/*    <InputValidation inputName="bsnsMngrList" fullWidth />*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
          {/*<Grid container spacing={1} sx={{ mb: 1 }}>*/}
          {/*  <Grid*/}
          {/*    item*/}
          {/*    xs={2}*/}
          {/*    sx={{ display: "flex" }}*/}
          {/*    alignItems="center"*/}
          {/*    justifyContent="flex-end"*/}
          {/*  >*/}
          {/*    <Typography variant="body2">실험</Typography>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={10}>*/}
          {/*    <InputValidation inputName="expMngrList" fullWidth />*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
          {/*<Grid container spacing={1} sx={{ mb: 1 }}>*/}
          {/*  <Grid*/}
          {/*    item*/}
          {/*    xs={2}*/}
          {/*    sx={{ display: "flex" }}*/}
          {/*    alignItems="center"*/}
          {/*    justifyContent="flex-end"*/}
          {/*  >*/}
          {/*    <Typography variant="body2">분석</Typography>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={10}>*/}
          {/*    <InputValidation inputName="anlsMngrList" fullWidth />*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </Section>

        <Section>
          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid
              item
              xs={2}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">오더번호</Typography>
            </Grid>
            <Grid item xs={4}>
              <InputValidation inputName="orderId" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">Run</Typography>
            </Grid>
            <Grid item xs={4}>
              <InputValidation inputName="runId" fullWidth />
            </Grid>
          </Grid>
          <Grid container>
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
              <Typography variant="body2">샘플상태</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="sampleTypeCc" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">샘플출처</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="source" fullWidth />
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container>
                <Grid
                  item
                  xs={1.5}
                  sx={{ display: "flex" }}
                  alignItems="center"
                  // justifyContent="center"
                >
                  <Typography variant="body2">QC</Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyStatusSampleTypeSelctbox name={"qcStatusCc"} />
                  </ErrorContainer>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid
                  item
                  xs={1.5}
                  sx={{ display: "flex" }}
                  alignItems="center"
                  // justifyContent="center"
                >
                  <Typography variant="body2">Lib</Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyStatusSampleTypeSelctbox name={"libStatusCc"} />
                  </ErrorContainer>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid
                  item
                  xs={1.5}
                  sx={{ display: "flex" }}
                  alignItems="center"
                  // justifyContent="center"
                >
                  <Typography variant="body2">Seq</Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyStatusSampleTypeSelctbox name={"seqStatusCc"} />
                  </ErrorContainer>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid
                  item
                  xs={1.5}
                  sx={{ display: "flex" }}
                  alignItems="center"
                  // justifyContent="center"
                >
                  <Typography variant="body2">BI</Typography>
                </Grid>
                <Grid item xs={10.5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyStatusSampleTypeSelctbox name={"biStatusCc"} />
                  </ErrorContainer>
                </Grid>
              </Grid>
            </Grid>

            {/*<Grid*/}
            {/*  item*/}
            {/*  xs={2}*/}
            {/*  sx={{ display: "flex", mb: 1 }}*/}
            {/*  alignItems="center"*/}
            {/*  // justifyContent="center"*/}
            {/*>*/}
            {/*  <Typography variant="body2">QC</Typography>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={10} sx={{ mb: 1 }}>*/}
            {/*  <ErrorContainer FallbackComponent={Fallback}>*/}
            {/*    <LazyStatusSampleTypeSelctbox name={"qcStatusCc"} />*/}
            {/*  </ErrorContainer>*/}
            {/*</Grid>*/}

            {/*<Grid*/}
            {/*  item*/}
            {/*  xs={2}*/}
            {/*  sx={{ display: "flex", mb: 1 }}*/}
            {/*  alignItems="center"*/}
            {/*  // justifyContent="center"*/}
            {/*>*/}
            {/*  <Typography variant="body2">Lib</Typography>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={10} sx={{ mb: 1 }}>*/}
            {/*  <ErrorContainer FallbackComponent={Fallback}>*/}
            {/*    <LazyStatusSampleTypeSelctbox name={"libStatusCc"} />*/}
            {/*  </ErrorContainer>*/}
            {/*</Grid>*/}

            {/*<Grid*/}
            {/*  item*/}
            {/*  xs={2}*/}
            {/*  sx={{ display: "flex", mb: 1 }}*/}
            {/*  alignItems="center"*/}
            {/*  // justifyContent="center"*/}
            {/*>*/}
            {/*  <Typography variant="body2">Seq</Typography>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={10} sx={{ mb: 1 }}>*/}
            {/*  <ErrorContainer FallbackComponent={Fallback}>*/}
            {/*    <LazyStatusSampleTypeSelctbox name={"seqStatusCc"} />*/}
            {/*  </ErrorContainer>*/}
            {/*</Grid>*/}

            {/*<Grid*/}
            {/*  item*/}
            {/*  xs={2}*/}
            {/*  sx={{ display: "flex", mb: 1 }}*/}
            {/*  alignItems="center"*/}
            {/*  // justifyContent="center"*/}
            {/*>*/}
            {/*  <Typography variant="body2">BI</Typography>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={10} sx={{ mb: 1 }}>*/}
            {/*  <ErrorContainer FallbackComponent={Fallback}>*/}
            {/*    <LazyStatusSampleTypeSelctbox name={"biStatusCc"} />*/}
            {/*  </ErrorContainer>*/}
            {/*</Grid>*/}
          </Grid>
        </Section>
      </Box>
      <Box
        sx={{
          backgroundColor: cjbsTheme.palette.grey["50"],
          p: 1.5,
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
            <ResetBtn onClose={onClose} />

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
  marginBottom: 18,
}));
const SectionLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: 4,
}));
