"use client";
import { useRouter } from "next-nprogress-bar";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  OutlinedButton,
  SkeletonLoading,
} from "cjbsDSTM";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetcher } from "api";
import Link from "next/link";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";
import TabBox from "./TabBox";
import CustomTabPanel from "./CustomTabPanel";
import { useSearchParams } from "next/navigation";

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

// 샘플탭
const LazySampleTab = dynamic(() => import("./(SampleTab)/SampleTab"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

// 파일탭
const LazyFileTab = dynamic(() => import("./(FileTab)/FileTab"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

// 코멘트탭
const LazyCommentTab = dynamic(() => import("./(CommentTab)/CommentTab"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function OrderInfo() {
  console.log("#########################WOW");

  const router = useRouter();
  // [샘플 리스트에서 넘오 왔는지 체크 하기 위해서 'prevPageUrl' 확인함 ]
  const searchParams = useSearchParams();
  // const prevPageUrl = searchParams.get("prevPageUrl");
  // console.log("PrevPageUrl ==>>", prevPageUrl);
  const from = searchParams.get("from");
  console.log("From ==>>", from);
  // [오더 정보 변경] 모달
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] =
    useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (searchParams.get("tabIndex") !== undefined) {
      const tabIndex = searchParams.get("tabIndex");
      setTabValue(Number(tabIndex));
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const orderInfoModifyModalClose = () => {
    setShowOrderInfoModifyModal(false);
  };

  return (
    <>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box sx={{ mb: 1 }}>
          <Grid container gap={1.5} alignItems="center">
            <Grid item>
              <Typography variant="h4">오더 정보</Typography>
            </Grid>
            <Grid item>
              <ContainedButton
                size="small"
                buttonName="오더 정보 변경"
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
      </Container>

      {/* Tabs */}
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <TabBox tabValue={tabValue} handleTabChange={handleTabChange} />
        <CustomTabPanel value={tabValue} index={0}>
          {/* 오더 */}
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyOrderTab />
          </ErrorContainer>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazySampleTab />
          </ErrorContainer>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyFileTab />
          </ErrorContainer>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyCommentTab />
          </ErrorContainer>
        </CustomTabPanel>
      </Container>

      {/* 오더 정보 변경 Modal */}
      {showOrderInfoModifyModal && (
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyOrderInfoModifyModal
            onClose={orderInfoModifyModalClose}
            open={showOrderInfoModifyModal}
            modalWidth={800}
          />
        </ErrorContainer>
      )}

      {/* 목록, 이전, 다음 버튼 */}
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Link href={from !== null ? from : "/order-list"}>
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
    </>
  );
}
