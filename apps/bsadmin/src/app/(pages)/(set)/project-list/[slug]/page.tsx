"use client";

import React from "react";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  Form,
  ErrorContainer,
  Fallback,
} from "cjbsDSTM";
import { useRouter } from "next/navigation";
import { Box, Container, Stack } from "@mui/material";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";

interface CustViewProps {
  params: {
    slug: string;
  };
}

const LazyCommontModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  }
);

const LazyProjectHeader = dynamic(() => import("./ProjectHeader"), {
  ssr: false,
  loading: () => <SkeletonLoading height={82} />,
});
const LazyProjectDetailList = dynamic(() => import("./ProjectDetailList"), {
  ssr: false,
  loading: () => <SkeletonLoading height={82} />,
});
export default function ProjectPage({ params }: CustViewProps) {
  // init
  const { slug } = params;
  const router = useRouter();

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="과제 관리" />
      </Box>

      <LazyProjectHeader slug={slug} />
      <LazyProjectDetailList slug={slug} />

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/project-list")}
        />
      </Stack>

      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCommontModifyLog
            apiName="prjc"
            uKey={slug}
            logTitle=""
            type="mngr"
          />
        </ErrorContainer>
      </Box>
    </Container>
  );
}
