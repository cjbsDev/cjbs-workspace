"use client";

import React, { useState } from "react";
import {
  CheckboxSV,
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  SelectBox,
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
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";
import { GET, POST } from "api";
import { useSWRConfig } from "swr";
// import { router } from "next/client";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useSetRecoilState } from "recoil";
import { filteredUrlAtom } from "../../../../recoil/atoms/filteredUrlAtom";

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

// const managerData = [
//   { value: "전체", optionName: "전체" },
//   { value: "영업", optionName: "영업" },
//   { value: "실험", optionName: "실험" },
//   { value: "분석", optionName: "분석" },
// ];
//
// const statusData = [
//   { value: "미접수", optionName: "미접수" },
//   { value: "진행 중", optionName: "진행 중" },
//   { value: "완료", optionName: "완료" },
//   { value: "취소", optionName: "취소" },
// ];
// const dateOption = [
//   { value: "전체", optionName: "샘플 접수일" },
//   { value: "전체", optionName: "오더 생성일" },
//   { value: "전체", optionName: "PCR/Lib 완료일" },
//   { value: "전체", optionName: "Seq 완료일" },
//   { value: "전체", optionName: "분석 완료일" },
//   { value: "전체", optionName: "완료 통보일" },
// ];

const SearchForm = ({ onClose }) => {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(null);
  const setFilteredUrl = useSetRecoilState(filteredUrlAtom);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const defaultValues = {};
  const onSubmit = async (data: any) => {
    console.log("결과내 검색 Data ==>>", data);
    const isExcludeResult = data.isExcludeResult === false ? "N" : "Y";
    let startDttm;
    let endDttm;
    if (data.dateRange === undefined) {
      startDttm = null;
      endDttm = null;
    } else {
      startDttm = dayjs(data.dateRange[0]).format("YYYY-MM-DD");
      console.log("startDttm", startDttm);
      endDttm = dayjs(data.dateRange[1]).format("YYYY-MM-DD");
      console.log("endDttm", endDttm);
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

    console.log("FILTEREDOBJECT", filteredObject);

    const result = "?" + new URLSearchParams(filteredObject).toString();
    console.log("RESULT", result);

    // await GET(`/order/list${result}`).then((res) => {
    //   console.log("RES DATA(@..@)", res.data);
    //   router.push(`/order-list${result}`);
    // });

    router.push(`/order-list${result}`);
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
              <InputValidation inputName="mngrSales" fullWidth />
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
              <InputValidation inputName="mngrAnlyz" fullWidth />
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
              <InputValidation inputName="mngrSales" fullWidth />
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
              <InputValidation inputName="mngrExpr" fullWidth />
            </Grid>
          </Grid>
        </Section>
        <Section>
          <SectionLabel variant="subtitle2">날짜</SectionLabel>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyDateTypeSelctbox />
              </ErrorContainer>
            </Grid>
            <Grid item xs={6}>
              <DateRangePicker inputName="dateRange" />
            </Grid>
          </Grid>
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
