"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  cjbsTheme,
  ErrorContainer,
  Fallback,
  FileDownloadBtn,
  SkeletonPieChart,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import {
  Box,
  Grid,
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeywordSearch from "../../components/KeywordSearch";
import SectionHeader from "./components/SectionHeader";
import { useRouter } from "next-nprogress-bar";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const LazySrvcSalesChart = dynamic(
  () => import("./components/SrvcSalesChart"),
  {
    ssr: false,
    loading: () => <SkeletonPieChart />,
  },
);

const LazyInstTop = dynamic(() => import("./components/InstTop"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

const LazyAgncTop = dynamic(() => import("./components/AgncTop"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

const LazyIdleTop = dynamic(() => import("./components/IdleTop"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  const router = useRouter();
  // const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.get("idleduration");
  const [alignment, setAlignment] = useState<number>(1);

  useEffect(() => {
    // console.log("PARAMS", params);
    setAlignment(params === null ? 1 : Number(params));
  }, []);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    console.log("newAlignment", newAlignment);
    setAlignment(newAlignment);
    router.push(pathname + `?idleduration=${newAlignment}`);
  };

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
              <SectionHeader>
                <SectionHeader.Title>총 매출</SectionHeader.Title>
              </SectionHeader>

              <Box>
                <Typography variant="subtitle1">준비중 입니다.</Typography>
              </Box>
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

        <Grid container spacing={2.5} sx={{}}>
          <Grid item xs={12}>
            <SectionBox>
              <SectionHeader>
                <SectionHeader.Title>
                  유휴 거래처 (장기 미거래)
                </SectionHeader.Title>
                <SectionHeader.Action>
                  {/*<SectionHeader.Duration*/}
                  {/*  value={alignment}*/}
                  {/*  onChange={handleAlignment}*/}
                  {/*/>*/}
                  <StyledToggleButtonGroup
                    value={alignment}
                    exclusive={true}
                    onChange={handleAlignment}
                    size="small"
                    sx={{
                      mb: `-12px !important`,
                      mt: `-12px !important`,
                      py: `0 !important`,
                    }}
                  >
                    <ToggleButton value={1}>1Y+</ToggleButton>
                    <ToggleButton value={2}>2Y+</ToggleButton>
                    <ToggleButton value={3}>3Y+</ToggleButton>
                  </StyledToggleButtonGroup>
                </SectionHeader.Action>
              </SectionHeader>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyIdleTop />
              </ErrorContainer>
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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    padding: "0 12px",
    backgroundColor: theme.palette.grey["100"],
    "&.Mui-disabled": {
      border: 0,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#6366F1",
      color: "white",
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
