"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  ErrorContainer,
  Fallback,
  FileDownloadBtn,
  SkeletonLoading,
  SkeletonPieChart,
} from "cjbsDSTM";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeywordSearch from "../../components/KeywordSearch";
import SectionHeader from "./components/SectionHeader";
import PieChart from "./components/PieChart";

const LazyListDashboard = dynamic(() => import("./list-dashboard"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const LazyPieChart = dynamic(() => import("./components/PieChart"), {
  ssr: false,
  loading: () => <SkeletonPieChart />,
});

export default function Page() {
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

        <Grid container spacing={2.5}>
          <Grid item xs={8}>
            <SectionBox>
              <SectionHeader>
                <SectionHeader.Title>총 매출</SectionHeader.Title>
                {/*<SectionHeader.Action>*/}
                {/*  <SectionHeader.ToggleBtn buttonName="test" />*/}
                {/*</SectionHeader.Action>*/}
              </SectionHeader>

              <Box sx={{ height: 100, backgroundColor: "red" }} />
            </SectionBox>
          </Grid>
          <Grid item xs={4}>
            <SectionBox>
              <SectionHeader>
                <SectionHeader.Title>서비스 별 매출</SectionHeader.Title>
              </SectionHeader>

              <LazyPieChart />
              {/*<PieChart />*/}
            </SectionBox>
          </Grid>
        </Grid>

        {/*<ErrorContainer FallbackComponent={Fallback}>*/}
        {/*  <LazyListDashboard />*/}
        {/*</ErrorContainer>*/}
      </Box>
    </>
  );
}

const SectionBox = styled(Box)`
  padding: 30px;
  background: white;
  border-radius: 10px;
`;
