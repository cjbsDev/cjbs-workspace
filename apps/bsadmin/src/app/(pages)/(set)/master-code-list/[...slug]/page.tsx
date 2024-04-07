"use client";

import React from "react";
import { OutlinedButton, Title1, ErrorContainer, Fallback } from "cjbsDSTM";
import { useRouter } from "next/navigation";
import { Box, Container, Stack } from "@mui/material";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";

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
  loading: () => <SkeletonLoading height={82} />,
});

const LazyCommontModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  },
);

export default function MasterCodePage({ params }: CustViewProps) {
  // init
  const { slug } = params;
  const router = useRouter();

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="상세코드" />
      </Box>

      <LazyMCHeader slug={slug} />
      <LazyMCDetailList slug={slug} />

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/master-code-list")}
        />
      </Stack>

      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCommontModifyLog
            apiName="masterCode"
            uKey={slug}
            logTitle=""
            type="mngr"
          />
        </ErrorContainer>
      </Box>
    </Container>
  );
}
