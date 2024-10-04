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
import { dateSampleTypeCcData } from "../../../../../data/inputDataLists";
import { toast } from "react-toastify";
import ResetBtn from "./resetBtn";
const LazyAnlsTypeSelctbox = dynamic(() => import("./AnlsTypeSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyStatusTypeSelctbox = dynamic(
  () => import("../../../../../components/StatusTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyServiceTypeSelctbox = dynamic(
  () => import("./ServiceTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyTaxonTypeSelctbox = dynamic(() => import("./TaxonTypeSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySeqKitSelectbox = dynamic(() => import("./SeqKitSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySeqMachineSelectbox = dynamic(() => import("./SeqMachineSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

interface SearchFormProps {
  onClose: () => void;
}

const SearchForm = ({ onClose }: SearchFormProps) => {
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
    // console.log("<MMMMMMMMMMMMM", resultObject);
    // 변환할 날짜 문자열 가져오기
    const { startDttm, endDttm } = resultObject;
    // console.log("@@@@@@@@@", typeof endDttm);

    if (startDttm == undefined) {
      delete resultObject.startDttm;
    } else {
      resultObject.startDttm = new Date(startDttm);
    }

    if (endDttm == undefined) {
      delete resultObject.endDttm;
    } else {
      resultObject.endDttm = new Date(endDttm);
    }

    // 날짜 문자열을 Date 객체로 변환
    // resultObject.startDttm = new Date(startDttm);
    // resultObject.endDttm = new Date(endDttm);
  }

  // console.log("SEARCH FORM DEFAULTVALUES", resultObject);

  const currentQueryString = new URLSearchParams(resultObject).toString();
  // console.log("currentQueryString", currentQueryString);
  const keywordQueryString = currentQueryString.split("&", 1);
  // console.log("OnlyKeyword ==>>", keywordQueryString);

  const newkeywordQueryString = currentQueryString.indexOf("keyword");
  // console.log("NewkeywordQueryString", newkeywordQueryString);

  const onSubmit = async (data: any) => {
    // console.log("결과내 검색 Data ==>>", data);
    let result;

    // 날짜
    if (
      data.dateTypeCc === "" &&
      (data.startDttm != null || data.endDttm != null)
    ) {
      console.log("날짜 타입을 선택해 주세요");
      toast("날짜 타입을 선택해 주세요");
      return;
    } else if (
      data.dateTypeCc !== "" &&
      data.startDttm == null &&
      data.endDttm == null
    ) {
      console.log("날짜를 선택해 주세요");
      toast("날짜를 선택해 주세요");
      return;
    } else {
      // 변환할 날짜 문자열 가져오기
      const { startDttm, endDttm } = data;

      // 날짜 문자열을 Date 객체로 변환하고 포맷 변경
      if (startDttm && endDttm) {
        // startDttm과 endDttm이 유효한 경우에만 변환을 진행합니다.
        data.startDttm = dayjs(startDttm).format("YYYY-MM-DD");
        data.endDttm = dayjs(endDttm).format("YYYY-MM-DD");
      }
    }

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
    if (filteredObject.startDttm == undefined) {
      delete filteredObject.startDttm;
    } else {
      filteredObject.startDttm = dayjs(filteredObject.startDttm).format(
        "YYYY-MM-DD",
      );
    }

    // endDttm
    if (filteredObject.endDttm == undefined) {
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
      <Box sx={{ width: 570, p: 3.5, pb: 1 }}>
        <Section>
          <SectionLabel variant="subtitle2">날짜</SectionLabel>

          <Stack direction="row" spacing={1}>
            <Stack>
              <SelectBox
                inputName="dateTypeCc"
                options={dateSampleTypeCcData}
                sx={{ width: 130 }}
              />
            </Stack>

            <SingleDatePicker inputName="startDttm" />
            <SingleDatePicker inputName="endDttm" />
          </Stack>
        </Section>

        <Section>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">Order</Typography>
            </Grid>
            <Grid item xs={4}>
              <InputValidation
                inputName="orderId"
                fullWidth
                pattern={/^[0-9]+$/}
                patternErrMsg="숫자만 입력해주세요."
              />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">Run No</Typography>
            </Grid>
            <Grid item xs={4}>
              <InputValidation
                inputName="runId"
                fullWidth
                pattern={/^[0-9]+$/}
                patternErrMsg="숫자만 입력해주세요."
              />
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">샘플번호</Typography>
            </Grid>
            <Grid item xs={4}>
              <InputValidation
                inputName="sampleId"
                fullWidth
                pattern={/^[0-9]+$/}
                patternErrMsg="숫자만 입력해주세요."
              />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">상태</Typography>
            </Grid>
            <Grid item xs={4}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyStatusTypeSelctbox />
              </ErrorContainer>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">Type</Typography>
            </Grid>
            <Grid item xs={10}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyServiceTypeSelctbox />
              </ErrorContainer>
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">분석타입</Typography>
            </Grid>
            <Grid item xs={10}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyAnlsTypeSelctbox />
              </ErrorContainer>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">거래처(PI)</Typography>
            </Grid>
            <Grid item xs={4}>
              <InputValidation inputName="agncNm" />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">샘플명</Typography>
            </Grid>
            <Grid item xs={4}>
              <InputValidation inputName="sampleNm" />
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">Taxon</Typography>
            </Grid>
            <Grid item xs={3}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyTaxonTypeSelctbox />
              </ErrorContainer>
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">Source</Typography>
            </Grid>
            <Grid item xs={5}>
              <InputValidation inputName="source" />
            </Grid>
          </Grid>
        </Section>

        <Section>
          <SectionLabel variant="subtitle2">담당자</SectionLabel>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid
              item
              xs={1}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="flex-end"
            >
              <Typography variant="body2">Prep</Typography>
            </Grid>
            <Grid item xs={3}>
              <InputValidation inputName="prepExpMngrVal" fullWidth />
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="flex-end"
            >
              <Typography variant="body2">Lib</Typography>
            </Grid>
            <Grid item xs={3}>
              <InputValidation inputName="libExpMngrVal" fullWidth />
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ display: "flex" }}
              alignItems="center"
              // justifyContent="flex-end"
            >
              <Typography variant="body2">Seq</Typography>
            </Grid>
            <Grid item xs={3}>
              <InputValidation inputName="seqMngrNm" fullWidth />
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">QC 사용 kit</Typography>
            </Grid>
            <Grid item xs={3}>
              <InputValidation inputName="prepUsedKit" fullWidth />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">PCR type</Typography>
            </Grid>
            <Grid item xs={5}>
              <InputValidation inputName="libPcrType" />
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">Seq kit 정보</Typography>
            </Grid>
            <Grid item xs={10}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazySeqKitSelectbox />
              </ErrorContainer>
            </Grid>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">Seq 장비</Typography>
            </Grid>
            <Grid item xs={10}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazySeqMachineSelectbox />
              </ErrorContainer>
            </Grid>
          </Grid>
        </Section>

        <Section>
          {/*<SectionLabel variant="subtitle2">키워드</SectionLabel>*/}
          {/*<InputValidation inputName="keyword" />*/}

          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
              <Typography variant="body2">키워드</Typography>
            </Grid>
            <Grid item xs={10}>
              <InputValidation inputName="keyword" />
            </Grid>
          </Grid>
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
  marginBottom: 24,
}));
const SectionLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: 8,
}));
