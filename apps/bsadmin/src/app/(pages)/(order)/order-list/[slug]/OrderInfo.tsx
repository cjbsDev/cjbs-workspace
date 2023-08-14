"use client";
import { useRouter } from "next-nprogress-bar";
import {
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  OutlinedButton,
  Title1,
  SkeletonLoading,
  TH,
  TD,
  InputValidation,
} from "cjbsDSTM";
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { fetcher } from "api";
import fetcher from "../../../../func/fetcher";
import useSWR from "swr";
import { useParams } from "next/navigation";
import Link from "next/link";
import MyIcon from "icon/myIcon";
import dynamic from "next/dynamic";
import TabBox from "./TabBox";
import CustomTabPanel from "./CustomTabPanel";

// 오더 요약 정보 영역
const LazyOrderShortInfo = dynamic(() => import("./OrderShortInfo/index"), {
  ssr: false,
  loading: () => <SkeletonLoading height={176} />,
});

// 오더탭
const LazyOrderTab = dynamic(() => import("./(OrderTab)/OrderTab"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

// 오더 정보 변경 모달
const LazyOrderInfoModifyModal = dynamic(
  () => import("./OrderInfoModifyModal"),
  {
    ssr: false,
  }
);

export default function OrderInfo() {
  const router = useRouter();
  // [오더 정보 변경] 모달
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] =
    useState<boolean>(false);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const orderInfoModifyModalClose = () => {
    setShowOrderInfoModifyModal(false);
  };

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 1 }}>
        <Grid container gap={1.5} alignItems="center">
          <Grid item>
            <Typography variant="h4">오더 정보</Typography>
          </Grid>
          <Grid item>
            <OutlinedButton
              size="small"
              buttonName="오더 정보 변경"
              color="secondary"
              onClick={() => setShowOrderInfoModifyModal(true)}
              endIcon={<MyIcon icon="cheveron-right" size={18} />}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyOrderShortInfo />
        </ErrorContainer>
      </Box>

      {/* Tabs */}
      <TabBox tabValue={tabValue} handleTabChange={handleTabChange} />
      <CustomTabPanel value={tabValue} index={0}>
        {/* 오더 */}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyOrderTab />
        </ErrorContainer>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        Sample
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        File
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3}>
        Coment
      </CustomTabPanel>

      {/* 오더 정보 변경 Modal */}
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyOrderInfoModifyModal
          onClose={orderInfoModifyModalClose}
          open={showOrderInfoModifyModal}
          modalWidth={800}
        />
      </ErrorContainer>

      {/* 목록, 이전, 다음 버튼 */}
      <Grid container justifyContent="space-between">
        <Grid item>
          <Link href="/order-list">
            <OutlinedButton size="small" buttonName="목록" />
          </Link>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <OutlinedButton
              disabled={true}
              size="small"
              color="secondary"
              buttonName="이전"
              startIcon={<MyIcon icon="cheveron-left" size={20} />}
            />
            <OutlinedButton
              disabled={true}
              size="small"
              color="secondary"
              buttonName="다음"
              endIcon={<MyIcon icon="cheveron-right" size={20} />}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
