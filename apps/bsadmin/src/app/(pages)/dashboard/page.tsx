"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  ErrorContainer,
  Fallback,
  FileDownloadBtn,
  SelectBox2,
  SkeletonLoading,
  SkeletonPieChart,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeywordSearch from "../../components/KeywordSearch";
import SectionHeader from "./components/SectionHeader";
import { useRouter } from "next-nprogress-bar";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Idle from "./components/Idle";
import Total from "./components/Total";

const LazySrvcSalesChart = dynamic(
  () => import("./components/SrvcSalesChart"),
  {
    ssr: false,
    loading: () => <SkeletonPieChart />,
  },
);

const LazyInstTop = dynamic(() => import("./components/InstTop"), {
  ssr: false,
  loading: () => <SkeletonLoading height={373} />,
});

const LazyAgncTop = dynamic(() => import("./components/AgncTop"), {
  ssr: false,
  loading: () => <SkeletonLoading height={373} />,
});

export default function Page() {
  const router = useRouter();
  // const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.get("idleduration");

  return (
    <>
      <Box>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row" justifyContent="flex-end">
              <FileDownloadBtn exportUrl={``} iconName="xls3" />
              <KeywordSearch />
            </Stack>
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
              <Total />
            </SectionBox>
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
    </>
  );
}

const SectionBox = styled(Box)`
  padding: 30px;
  background: white;
  border-radius: 10px;
  min-height: fit-content;
  height: 100%;
`;
