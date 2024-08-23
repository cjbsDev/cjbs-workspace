"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  OutlinedButton,
  SkeletonLoading,
} from "cjbsDSTM";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import MyIcon from "icon/MyIcon";
import TabBox from "./TabBox";
import CustomTabPanel from "./CustomTabPanel";

// RUN 요약 정보 영역
const LazyRunShortInfo = dynamic(() => import("./RunShortInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={176} />,
});

// RUN 정보 변경 모달
const LazyRunInfoModifyModal = dynamic(() => import("./RunInfoModifyModal"), {
  ssr: false,
});

// BI분석 요청 모달

const LazyBIAnalyzeReqModal = dynamic(() => import("./BIAnalyzeReqModal"), {
  ssr: false,
});

// 샘플탭
const LazySampleTab = dynamic(() => import("./(SampleTab)/SampleTab"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const LazyRogTab = dynamic(() => import("./(RogTab)/RogTab"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const RunInfo = () => {
  // [RUN 정보 변경 모달]
  const [showRunInfoModifyModal, setShowRunInfoModifyModal] =
    useState<boolean>(false);
  const [showBIReqModal, setShowBIReqModal] = useState(false);
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const runInfoModifyModalClose = () => {
    setShowRunInfoModifyModal(false);
  };

  const handleBIReqModalOpen = () => {
    setShowBIReqModal(true);
  };
  const handleBIReqModalClose = () => {
    setShowBIReqModal(false);
  };

  return (
    <>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box sx={{ mb: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h4">RUN 정보</Typography>
              <ContainedButton
                size="small"
                buttonName="RUN 정보 변경"
                onClick={() => setShowRunInfoModifyModal(true)}
                endIcon={<MyIcon icon="cheveron-right" size={18} />}
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Link href="/exp-run-list">
                <OutlinedButton size="small" buttonName="목록" />
              </Link>
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
          </Stack>

          {/*<Grid container gap={1.5} alignItems="center">*/}
          {/*  <Grid item>*/}
          {/*    <Typography variant="h4">RUN 정보</Typography>*/}
          {/*  </Grid>*/}
          {/*  <Grid item>*/}
          {/*    <ContainedButton*/}
          {/*      size="small"*/}
          {/*      buttonName="RUN 정보 변경"*/}
          {/*      onClick={() => setShowRunInfoModifyModal(true)}*/}
          {/*      endIcon={<MyIcon icon="cheveron-right" size={18} />}*/}
          {/*    />*/}
          {/*  </Grid>*/}
          {/*  /!*<Grid item>*!/*/}
          {/*  /!*  <ContainedButton*!/*/}
          {/*  /!*    size="small"*!/*/}
          {/*  /!*    buttonName="BI분석 요청"*!/*/}
          {/*  /!*    onClick={handleBIReqModalOpen}*!/*/}
          {/*  /!*    endIcon={<MyIcon icon="cheveron-right" size={18} />}*!/*/}
          {/*  /!*  />*!/*/}
          {/*  /!*</Grid>*!/*/}
          {/*</Grid>*/}
        </Box>
        {/*<Box sx={{}}>*/}
        {/*  <Stack direction="row" spacing={1}>*/}
        {/*    <Link href="/exp-run-list">*/}
        {/*      <OutlinedButton size="small" buttonName="목록" />*/}
        {/*    </Link>*/}
        {/*    <OutlinedButton*/}
        {/*      disabled={true}*/}
        {/*      size="small"*/}
        {/*      color="secondary"*/}
        {/*      buttonName="이전"*/}
        {/*      startIcon={<MyIcon icon="cheveron-left" size={20} />}*/}
        {/*    />*/}
        {/*    <OutlinedButton*/}
        {/*      disabled={true}*/}
        {/*      size="small"*/}
        {/*      color="secondary"*/}
        {/*      buttonName="다음"*/}
        {/*      endIcon={<MyIcon icon="cheveron-right" size={20} />}*/}
        {/*    />*/}
        {/*  </Stack>*/}
        {/*</Box>*/}
        <Box sx={{ mb: 5 }}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyRunShortInfo />
          </ErrorContainer>
        </Box>
      </Container>

      {/* Tabs */}
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <TabBox tabValue={tabValue} handleTabChange={handleTabChange} />
        <CustomTabPanel value={tabValue} index={0}>
          {/* 샘플 */}
          <ErrorContainer FallbackComponent={Fallback}>
            <LazySampleTab />
          </ErrorContainer>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {/* 로그 */}
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyRogTab />
          </ErrorContainer>
        </CustomTabPanel>
      </Container>

      {/* RUN 정보 변경 Modal */}
      {showRunInfoModifyModal && (
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyRunInfoModifyModal
            onClose={runInfoModifyModalClose}
            open={showRunInfoModifyModal}
            modalWidth={800}
          />
        </ErrorContainer>
      )}

      {/* BI분석 요청 Modal */}
      {showBIReqModal && (
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyBIAnalyzeReqModal
            onClose={handleBIReqModalClose}
            open={showBIReqModal}
            modalWidth={600}
          />
        </ErrorContainer>
      )}

      {/* 목록, 이전, 다음 버튼 */}
      {/*<Container maxWidth={false} sx={{ width: "100%" }}>*/}
      {/*  <Grid container justifyContent="space-between">*/}
      {/*    <Grid item>*/}
      {/*      <Link href="/exp-run-list">*/}
      {/*        <OutlinedButton size="small" buttonName="목록" />*/}
      {/*      </Link>*/}
      {/*    </Grid>*/}
      {/*    <Grid item>*/}
      {/*      <Stack direction="row" spacing={1}>*/}
      {/*        <OutlinedButton*/}
      {/*          disabled={true}*/}
      {/*          size="small"*/}
      {/*          color="secondary"*/}
      {/*          buttonName="이전"*/}
      {/*          startIcon={<MyIcon icon="cheveron-left" size={20} />}*/}
      {/*        />*/}
      {/*        <OutlinedButton*/}
      {/*          disabled={true}*/}
      {/*          size="small"*/}
      {/*          color="secondary"*/}
      {/*          buttonName="다음"*/}
      {/*          endIcon={<MyIcon icon="cheveron-right" size={20} />}*/}
      {/*        />*/}
      {/*      </Stack>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</Container>*/}
    </>
  );
};

export default RunInfo;
