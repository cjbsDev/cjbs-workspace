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

const LazyRunTypeSelctbox = dynamic(() => import("./RunTypeSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyEquipmentTypeSelctbox = dynamic(
  () => import("./EquipmentTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyKitTypeSelctbox = dynamic(() => import("./KitTypeSelectbox"), {
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

  // if (resultObject.dateTypeCc !== undefined) {
  //   console.log("<MMMMMMMMMMMMM", resultObject);
  //   // 변환할 날짜 문자열 가져오기
  //   const { startDttm, endDttm } = resultObject;
  //   // console.log("@@@@@@@@@", typeof endDttm);
  //
  //   if (startDttm == undefined) {
  //     delete resultObject.startDttm;
  //   } else {
  //     resultObject.startDttm = new Date(startDttm);
  //   }
  //
  //   if (endDttm == undefined) {
  //     delete resultObject.endDttm;
  //   } else {
  //     resultObject.endDttm = new Date(endDttm);
  //   }
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

    // 날짜
    // if (
    //   data.dateTypeCc === "" &&
    //   (data.startDttm != null || data.endDttm != null)
    // ) {
    //   console.log("날짜 타입을 선택해 주세요");
    //   toast("날짜 타입을 선택해 주세요");
    //   return;
    // } else if (
    //   data.dateTypeCc !== "" &&
    //   data.startDttm == null &&
    //   data.endDttm == null
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
    // if (filteredObject.startDttm == undefined) {
    //   delete filteredObject.startDttm;
    // } else {
    //   filteredObject.startDttm = dayjs(filteredObject.startDttm).format(
    //     "YYYY-MM-DD",
    //   );
    // }

    // endDttm
    // if (filteredObject.endDttm == undefined) {
    //   delete filteredObject.endDttm;
    // } else {
    //   filteredObject.endDttm = dayjs(filteredObject.endDttm).format(
    //     "YYYY-MM-DD",
    //   );
    // }

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
      <Box sx={{ width: 430, p: 3.5, pb: 1 }}>
        {/*<Section>*/}
        {/*  <SectionLabel variant="subtitle2">날짜</SectionLabel>*/}

        {/*  <Stack direction="row" spacing={1}>*/}
        {/*    <Stack>*/}
        {/*      <SelectBox*/}
        {/*        inputName="dateTypeCc"*/}
        {/*        options={dateSampleTypeCcData}*/}
        {/*        sx={{ width: 130 }}*/}
        {/*      />*/}
        {/*    </Stack>*/}

        {/*    <SingleDatePicker inputName="startDttm" />*/}
        {/*    <SingleDatePicker inputName="endDttm" />*/}
        {/*  </Stack>*/}
        {/*</Section>*/}

        <Section>
          <SectionLabel variant="subtitle2">RUN 타입</SectionLabel>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyRunTypeSelctbox />
          </ErrorContainer>
        </Section>

        <Section>
          <SectionLabel variant="subtitle2">장비</SectionLabel>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyEquipmentTypeSelctbox />
          </ErrorContainer>
        </Section>

        <Section>
          <SectionLabel variant="subtitle2">Kit</SectionLabel>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyKitTypeSelctbox />
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
