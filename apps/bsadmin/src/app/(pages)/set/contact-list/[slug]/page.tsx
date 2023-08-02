"use client";

import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  OutlinedButton,
  Title1,
} from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Box, Container, Stack } from "@mui/material";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import * as React from "react";

/*
const LazyCustEBCInfo = dynamic(() => import("../../CustEBCInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={270} />,
});
*/

const LazyUserInfo = dynamic(() => import("./UserInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={470} />,
});

interface UserViewProps {
  params: {
    slug: string;
  };
}

export default function UserPage({ params }: UserViewProps) {
  const { slug } = params;
  const router = useRouter();

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="담당자 정보" />
      </Box>
      <ErrorContainer FallbackComponent={Fallback}>
        {/* 
        <LazyCustEBCInfo slug={slug} ebcShow={false} />
      */}
        <LazyUserInfo slug={slug} />
      </ErrorContainer>
      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/set/contact-list")}
        />
        <Link
          href={{
            pathname: "/set/contact-modify/",
            query: { userUkey: slug },
          }}
        >
          <ContainedButton buttonName="수정" />
        </Link>
      </Stack>
    </Container>
  );
}
