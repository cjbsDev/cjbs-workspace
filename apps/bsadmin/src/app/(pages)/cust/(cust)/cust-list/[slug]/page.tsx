"use client";

import { ContainedButton, OutlinedButton, Title1 } from "cjbsDSTM";
import { useRouter } from "next/navigation";
import { Box, Container, Stack } from "@mui/material";
import CustInfo from "./CustInfo";
import CustEBCInfo from "../../CustEBCInfo";

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

      <CustEBCInfo slug={slug} ebcShow={false} />
      <CustInfo slug={slug} />

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
