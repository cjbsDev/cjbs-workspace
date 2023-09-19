"use client";

import { Title1 } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { Box, Container, Stack } from "@mui/material";
import * as React from "react";

interface ViewProps {
  params: {
    slug: string;
  };
}

export default function OrshbsDetailPage({ params }: ViewProps) {
  const { slug } = params;
  const router = useRouter();

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="양규야 어서와" />
      </Box>
    </Container>
  );
}
