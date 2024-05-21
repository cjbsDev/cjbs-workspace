"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import * as React from "react";
import Link from "next/link";
import { ContainedButton } from "cjbsDSTM";

export default function Page() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Box sx={{ marginTop: 0, marginBottom: 0, width: 210 }}>
          <MyIcon icon="cj_bk" />
        </Box>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          새로운 비밀번호로 변경이 완료되었습니다.
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, textAlign: "center" }}
        >
          새로운 비밀번호로 로그인해 주시기 바랍니다.
        </Typography>

        <Link href="/sign-in">
          <ContainedButton buttonName="로그인 화면으로 이동" />
        </Link>
      </Stack>
    </Container>
  );
}
