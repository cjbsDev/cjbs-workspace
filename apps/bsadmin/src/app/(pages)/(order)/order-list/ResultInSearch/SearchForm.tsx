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
import { useRouter } from "next/navigation";
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
  const defaultValues = {};

  const onSubmit = async (data: any) => {
    console.log("결과내 검색 Data ==>>", data);

    if (data.dateRange !== undefined) {
      const [startDttm, endDttm] = data.dateRange.map((dateStr) =>
        dayjs(dateStr).format("YYYY-MM-DD")
      );
      data.startDttm = startDttm;
      data.endDttm = endDttm;
      data.dateRange = undefined;
    }

    const filteredObject = Object.fromEntries(
      Object.entries(data)
        .filter(
          ([key, value]) =>
            value !== "" && value !== undefined && value !== false
        )
        .map(([key, value]) =>
          key === "typeCc" ? [key, value.join(",")] : [key, value]
        )
    );

    // URLSearchParams() 생성자(constructor) ==> Convert Object to Query String
    // URLSearchParams(filteredObject).toString() ==> 물음표없이 쿼리 스트링 반환
    const result = "?" + new URLSearchParams(filteredObject).toString();
    router.push(`/order-list${result}`);
    onClose();

    // if (data.dateRange !== undefined) {
    //   const [startDate, endDate] = data.dateRange.map((dateStr) =>
    //     dayjs(dateStr).format("YYYY-MM-DD")
    //   );
    //   const newData = {
    //     ...data,
    //     startDate,
    //     endDate,
    //     dateRange: undefined, // dateRange 배열은 더 이상 필요하지 않으므로 undefined로 설정
    //   };
    //
    //   console.log("NEW DATA ==>>", newData);
    //
    //   const filteredObject = Object.fromEntries(
    //     Object.entries(newData)
    //       .filter(
    //         ([key, value]) =>
    //           value !== "" && value !== undefined && value !== false
    //       )
    //       .map(([key, value]) =>
    //         key === "typeCc" ? [key, value.join(",")] : [key, value]
    //       )
    //   );
    //
    //   const result = "?" + new URLSearchParams(filteredObject).toString();
    //   console.log("RESULT", result);
    //   router.push(`/order-list${result}`);
    // } else {
    //   const filteredObject = Object.fromEntries(
    //     Object.entries(data)
    //       .filter(
    //         ([key, value]) =>
    //           value !== "" && value !== undefined && value !== false
    //       )
    //       .map(([key, value]) =>
    //         key === "typeCc" ? [key, value.join(",")] : [key, value]
    //       )
    //   );
    //
    //   console.log("FILTEREDOBJECT", filteredObject);
    //   const result = "?" + new URLSearchParams(filteredObject).toString();
    //   console.log("RESULT", result);
    //   router.push(`/order-list${result}`);
    // }
    //
    // onClose();
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
        <Section>
          <SectionLabel variant="subtitle2">날짜</SectionLabel>

          <Stack direction="row" spacing={1}>
            <ErrorContainer FallbackComponent={Fallback}>
              <LazyDateTypeSelctbox />
            </ErrorContainer>
            <DateRangePicker inputName="dateRange" />
          </Stack>
        </Section>
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
            <OutlinedButton buttonName="초기화" size="small" />
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
