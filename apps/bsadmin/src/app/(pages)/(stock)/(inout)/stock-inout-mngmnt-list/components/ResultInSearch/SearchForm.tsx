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
  RadioGV,
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
import { dateSampleTypeCcData } from "../../../../../../data/inputDataLists";
import { toast } from "react-toastify";
import ResetBtn from "./resetBtn";
// import { useResultObject } from "../../../../../../components/KeywordSearch/useResultObject";

const LazyAnlsTypeChck = dynamic(() => import("./AnlsTypeChck"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyStatusSampleTypeSelctbox = dynamic(
  () => import("../../../../../../components/StatusSampleTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

interface SearchFormProps {
  onClose: () => void;
}

const isAstnPriceData = [
  { value: "Y", optionName: "Y" },
  { value: "N", optionName: "N" },
];

const SearchForm = ({ onClose }: SearchFormProps) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [resultObject, result] = useResultObject();
  let defaultValues;

  const resultObject = {};
  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }

  defaultValues = resultObject;

  // if (resultObject.typeCcList === undefined) {
  //   defaultValues = resultObject;
  // } else {
  //   const typeCcList = resultObject.typeCcList.split(",");
  //   const newResultObject = {
  //     ...resultObject,
  //     typeCcList: typeCcList,
  //   };
  //   defaultValues = newResultObject;
  // }

  console.log("defaultValues ==>>", defaultValues);

  const { startDttm, endDttm } = resultObject;
  // console.log("@@@@@@@@@", typeof endDttm);

  if (startDttm === undefined) {
    delete resultObject.startDttm;
  } else {
    resultObject.startDttm = new Date(startDttm);
  }

  if (endDttm === undefined) {
    delete resultObject.endDttm;
  } else {
    resultObject.endDttm = new Date(endDttm);
  }

  // if (resultObject.dateTypeCc !== undefined) {
  //   console.log("<MMMMMMMMMMMMM", resultObject);
  //   // 변환할 날짜 문자열 가져오기
  //   const { startDttm, endDttm } = resultObject;
  //   // console.log("@@@@@@@@@", typeof endDttm);
  //
  //   if (startDttm === undefined) {
  //     delete resultObject.startDttm;
  //   } else {
  //     resultObject.startDttm = new Date(startDttm);
  //   }
  //
  //   if (endDttm === undefined) {
  //     delete resultObject.endDttm;
  //   } else {
  //     resultObject.endDttm = new Date(endDttm);
  //   }
  // }

  console.log(resultObject);

  const currentQueryString = new URLSearchParams(resultObject).toString();

  const keywordQueryString = currentQueryString.split("&", 1);

  // const newkeywordQueryString = currentQueryString.indexOf("keyword");

  const onSubmit = async (data: any) => {
    console.log("결과내 검색 Data ==>>", data);
    let result;

    // 날짜;
    const { startDttm, endDttm } = data;

    // 날짜 문자열을 Date 객체로 변환하고 포맷 변경
    if (startDttm && endDttm) {
      // startDttm과 endDttm이 유효한 경우에만 변환을 진행합니다.
      data.startDttm = dayjs(startDttm).format("YYYY-MM-DD");
      data.endDttm = dayjs(endDttm).format("YYYY-MM-DD");
    }
    // if (
    //   data.dateTypeCc === "" &&
    //   (data.startDttm !== null || data.endDttm !== null)
    // ) {
    //   console.log("날짜 타입을 선택해 주세요");
    //   toast("날짜 타입을 선택해 주세요");
    //   return;
    // } else if (
    //   data.dateTypeCc !== "" &&
    //   data.startDttm === null &&
    //   data.endDttm === null
    // ) {
    //   console.log("날짜를 선택해 주세요");
    //   toast("날짜를 선택해 주세요");
    //   return;
    // } else {
    //   // 변환할 날짜 문자열 가져오기
    //   const { startDttm, endDttm } = data;
    //
    //   // 날짜 문자열을 Date 객체로 변환하고 포맷 변경
    //   if (startDttm && endDttm) {
    //     // startDttm과 endDttm이 유효한 경우에만 변환을 진행합니다.
    //     data.startDttm = dayjs(startDttm).format("YYYY-MM-DD");
    //     data.endDttm = dayjs(endDttm).format("YYYY-MM-DD");
    //   }
    // }

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

    // startDttm
    if (filteredObject.startDttm === undefined) {
      delete filteredObject.startDttm;
    } else {
      filteredObject.startDttm = dayjs(filteredObject.startDttm).format(
        "YYYY-MM-DD",
      );
    }

    // endDttm
    if (filteredObject.endDttm === undefined) {
      delete filteredObject.endDttm;
    } else {
      filteredObject.endDttm = dayjs(filteredObject.endDttm).format(
        "YYYY-MM-DD",
      );
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
      <Box sx={{ width: 480, p: 3, pb: 1 }}>
        <Section>
          <SectionLabel variant="subtitle2">날짜</SectionLabel>

          <Stack direction="row" spacing={1}>
            {/*<Stack>*/}
            {/*  <SelectBox*/}
            {/*    inputName="dateTypeCc"*/}
            {/*    options={dateSampleTypeCcData}*/}
            {/*    sx={{ width: 130 }}*/}
            {/*  />*/}
            {/*</Stack>*/}

            <SingleDatePicker inputName="startDttm" />
            <SingleDatePicker inputName="endDttm" />
          </Stack>
        </Section>

        {/*<Section>*/}
        {/*  <SectionLabel variant="subtitle2">분석종류</SectionLabel>*/}
        {/*  <ErrorContainer FallbackComponent={Fallback}>*/}
        {/*    <LazyAnlsTypeChck />*/}
        {/*  </ErrorContainer>*/}
        {/*</Section>*/}

        {/*<Section>*/}
        {/*  <Grid container spacing={1}>*/}
        {/*    <Grid item xs={1.3}>*/}
        {/*      <SectionLabel variant="subtitle2">담당자</SectionLabel>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={10.7}>*/}
        {/*      <Grid container spacing={1} sx={{ mb: 1 }}>*/}
        {/*        <Grid*/}
        {/*          item*/}
        {/*          xs={1}*/}
        {/*          sx={{ display: "flex" }}*/}
        {/*          alignItems="center"*/}
        {/*          // justifyContent="flex-end"*/}
        {/*        >*/}
        {/*          <Typography variant="body2">영업</Typography>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={11}>*/}
        {/*          <InputValidation inputName="bsnsMngrList" fullWidth />*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*      <Grid container spacing={1} sx={{ mb: 1 }}>*/}
        {/*        <Grid*/}
        {/*          item*/}
        {/*          xs={1}*/}
        {/*          sx={{ display: "flex" }}*/}
        {/*          alignItems="center"*/}
        {/*          // justifyContent="flex-end"*/}
        {/*        >*/}
        {/*          <Typography variant="body2">Prep</Typography>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={3}>*/}
        {/*          <InputValidation inputName="prepMngrList" fullWidth />*/}
        {/*        </Grid>*/}
        {/*        <Grid*/}
        {/*          item*/}
        {/*          xs={1}*/}
        {/*          sx={{ display: "flex" }}*/}
        {/*          alignItems="center"*/}
        {/*          // justifyContent="flex-end"*/}
        {/*        >*/}
        {/*          <Typography variant="body2">Lib</Typography>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={3}>*/}
        {/*          <InputValidation inputName="libMngrList" fullWidth />*/}
        {/*        </Grid>*/}
        {/*        <Grid*/}
        {/*          item*/}
        {/*          xs={1}*/}
        {/*          sx={{ display: "flex" }}*/}
        {/*          alignItems="center"*/}
        {/*          // justifyContent="flex-end"*/}
        {/*        >*/}
        {/*          <Typography variant="body2">Seq</Typography>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={3}>*/}
        {/*          <InputValidation inputName="seqMngrList" fullWidth />*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*      <Grid container spacing={1} sx={{ mb: 1 }}>*/}
        {/*        <Grid*/}
        {/*          item*/}
        {/*          xs={1}*/}
        {/*          sx={{ display: "flex" }}*/}
        {/*          alignItems="center"*/}
        {/*          // justifyContent="flex-end"*/}
        {/*        >*/}
        {/*          <Typography variant="body2">분석</Typography>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={11}>*/}
        {/*          <InputValidation inputName="anlsMngrList" fullWidth />*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</Section>*/}

        <Section>
          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid
              item
              xs={2}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">재고ID</Typography>
            </Grid>
            <Grid item xs={10}>
              <InputValidation
                inputName="stockId"
                fullWidth
                pattern={/^[0-9]+$/}
                patternErrMsg="숫자만 입력해주세요."
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid
              item
              xs={2}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">보조금</Typography>
            </Grid>
            <Grid item xs={10}>
              <RadioGV data={isAstnPriceData} inputName="isAstnPrice" />
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">GutInside</Typography>
            </Grid>
            <Grid item xs={10}>
              <RadioGV data={isAstnPriceData} inputName="isAstnPrice" />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">사용중</Typography>
            </Grid>
            <Grid item xs={10}>
              <RadioGV data={isAstnPriceData} inputName="isAstnPrice" />
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
              <Typography variant="body2">품명</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="stockNm" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">제조사</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="mkrNm" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">Cat.No</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="catNo" fullWidth />
            </Grid>

            <Grid
              item
              xs={2}
              sx={{ display: "flex", mb: 1 }}
              alignItems="center"
              // justifyContent="center"
            >
              <Typography variant="body2">담당자</Typography>
            </Grid>
            <Grid item xs={10} sx={{ mb: 1 }}>
              <InputValidation inputName="mngrNm" fullWidth />
            </Grid>
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
