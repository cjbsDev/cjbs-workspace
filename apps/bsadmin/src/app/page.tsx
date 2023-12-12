"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  SelectBox2,
  // FileDownloadBtn,
  SkeletonLoading,
  SkeletonPieChart,
} from "cjbsDSTM";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// import KeywordSearch from "../../components/KeywordSearch";
// import SectionHeader from "../../../components/SectionHeader";
import SectionHeader from "./components/Dashboard/components/SectionHeader";
import { useRouter } from "next-nprogress-bar";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Idle from "./components/Dashboard/components/Idle";
import Total from "./components/Dashboard/components/Total";
import {
  dashboardMonthData,
  dashboardYearData,
  periodListData,
} from "./data/inputDataLists";
import { RecoilRoot, useRecoilState } from "recoil";
import {
  dashboardMonthAtom,
  dashboardYearAtom,
} from "./components/Dashboard/dashboardAtom";

const LazySrvcSalesChart = dynamic(
  () => import("./components/Dashboard/components/SrvcSalesChart"),
  {
    ssr: false,
    loading: () => <SkeletonPieChart />,
  },
);

const LazyInstTop = dynamic(
  () => import("./components/Dashboard/components/InstTop"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={373} />,
  },
);

const LazyAgncTop = dynamic(
  () => import("./components/Dashboard/components/AgncTop"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={373} />,
  },
);

export default function Page() {
  const router = useRouter();
  // const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.get("idleduration");
  const [year, setYear] = useRecoilState(dashboardYearAtom);
  const [month, setMonth] = useRecoilState(dashboardMonthAtom);

  const handleYear = (event: { target: { value: any } }) => {
    const getYear = event.target.value;
    setYear(getYear);
  };

  const handleMonth = (event: { target: { value: any } }) => {
    const getMonth = event.target.value;
    setMonth(getMonth);
  };

  return (
    <RecoilRoot override={false}>
      <Box>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Stack direction="row" spacing={3.8} alignItems="center">
              <Stack direction="row" spacing={1}>
                {periodListData.map((period, index) => {
                  return (
                    <ContainedButton
                      key={period.name}
                      buttonName={period.name}
                      size="small"
                      sx={{
                        p: 0,
                        backgroundColor: "white",
                        height: 30,
                        color: "black",
                      }}
                      onClick={() => console.log("PERIOD VALUE", period.value)}
                    />
                  );
                })}
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">기간 선택</Typography>
                <SelectBox2
                  options={dashboardYearData}
                  value={year}
                  onChange={handleYear}
                />
                <SelectBox2
                  options={dashboardMonthData}
                  value={month}
                  onChange={handleMonth}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            {/*<Stack spacing={1} direction="row" justifyContent="flex-end">*/}
            {/*  <FileDownloadBtn exportUrl={``} iconName="xls3" />*/}
            {/*  <KeywordSearch />*/}
            {/*</Stack>*/}
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2.5}
          sx={{ mb: 2.5 }}
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <SectionBox>
              <Total />
            </SectionBox>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2.5}
          sx={{ mb: 2.5 }}
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={8}>
            <SectionBox>
              <SectionHeader>
                <SectionHeader.Title>항목 별 매출</SectionHeader.Title>
              </SectionHeader>
            </SectionBox>
            {/*<SectionBox>*/}
            {/*  <Total />*/}
            {/*</SectionBox>*/}
          </Grid>
          <Grid item xs={4}>
            <SectionBox>
              <SectionHeader>
                <SectionHeader.Title>분석 종류별 매출</SectionHeader.Title>
              </SectionHeader>

              <ErrorContainer FallbackComponent={Fallback}>
                <LazySrvcSalesChart />
              </ErrorContainer>
            </SectionBox>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2.5}
          sx={{ mb: 2.5 }}
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={6}>
            <SectionBox>
              <SectionHeader>
                <SectionHeader.Title>매출 TOP 기관</SectionHeader.Title>
                <SectionHeader.MoreBtn
                  buttonName="more"
                  onClick={() => console.log("기관 더보기")}
                  disabled={true}
                />
              </SectionHeader>

              <ErrorContainer FallbackComponent={Fallback}>
                <LazyInstTop />
              </ErrorContainer>
            </SectionBox>
          </Grid>
          <Grid item xs={6}>
            <SectionBox>
              <SectionHeader>
                <SectionHeader.Title>매출 TOP 거래처</SectionHeader.Title>
                <SectionHeader.MoreBtn
                  buttonName="more"
                  onClick={() => console.log("거래처 더보기")}
                  disabled={true}
                />
              </SectionHeader>

              <ErrorContainer FallbackComponent={Fallback}>
                <LazyAgncTop />
              </ErrorContainer>
            </SectionBox>
          </Grid>
        </Grid>

        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <SectionBox>
              <Idle />
            </SectionBox>
          </Grid>
        </Grid>
      </Box>
    </RecoilRoot>
  );
}

const SectionBox = styled(Box)`
  padding: 30px;
  background: white;
  border-radius: 10px;
  min-height: fit-content;
  height: 100%;
`;
