"use client";

import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  OutlinedButton,
  Title1,
} from "cjbsDSTM";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Box, Container, Stack } from "@mui/material";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import * as React from "react";

const LazyCustEBCInfo = dynamic(() => import("../../CustEBCInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={270} />,
});

const LazyCustInfo = dynamic(() => import("./CustInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={470} />,
});

interface CustViewProps {
  params: {
    slug: string;
  };
}

export default function CustPage({ params }: CustViewProps) {
  const { slug } = params;
  const router = useRouter();

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="고객 정보" />
      </Box>

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyCustEBCInfo slug={slug} ebcShow={false} />
        <LazyCustInfo slug={slug} />
      </ErrorContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/cust/cust-list")}
        />
        <ContainedButton
          buttonName="수정"
          onClick={() => router.push("/cust/cust-modify/" + slug)}
        />
      </Stack>
    </Container>
  );
}
