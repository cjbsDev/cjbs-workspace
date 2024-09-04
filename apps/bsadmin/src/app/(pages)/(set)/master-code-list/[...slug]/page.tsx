"use client";

import React from "react";
import { OutlinedButton, Title1, ErrorContainer, Fallback } from "cjbsDSTM";
import { useRouter } from "next/navigation";
import { Box, Container, Stack } from "@mui/material";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import { Fascinate } from "next/dist/compiled/@next/font/dist/google";

interface CustViewProps {
  params: {
    slug: string;
  };
}

const LazyMCHeader = dynamic(() => import("./MCHeader"), {
  ssr: false,
  loading: () => <SkeletonLoading height={82} />,
});
const LazyMCDetailList = dynamic(() => import("./MCDetailList"), {
  ssr: false,
  loading: () => <SkeletonLoading height={370} />,
});

const LazyCommontModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={172} />,
  },
);

export default function MasterCodePage() {
  // init
  const router = useRouter();

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="상세코드" />
      </Box>

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyMCHeader />
      </ErrorContainer>

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyMCDetailList />
      </ErrorContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          size="small"
          onClick={() => router.push("/master-code-list")}
        />
      </Stack>

      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCommontModifyLog
            apiName="masterCode"
            // uKey={slug}
            logTitle=""
            type="mngr"
          />
        </ErrorContainer>
      </Box>
    </Container>
  );
}
