"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import { ContainedButton, Form, InputValidation } from "cjbsDSTM";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    const reqBody = {
      email: email,
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/authEmail/verify/password`,
        reqBody,
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          toast("메일을 재발송 하였습니다.");
        } else {
          toast(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          비밀번호 재설정 메일이 발송되었습니다
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, textAlign: "center" }}
        >
          메일함에서 비밀번호 재설정 메일을 확인해 주세요.
          <br />
          메일의 비밀번호 재설정 버튼을 클릭하면 새로운
          <br /> 비밀번호를 변경할 수 있습니다.
        </Typography>

        <Typography
          color="primary"
          variant="h5"
          sx={{ marginBottom: 3, textAlign: "center" }}
        >
          {email}
        </Typography>

        <Stack spacing={-0.5} justifyContent="center">
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            메일이 도착하지 않았다면, 스팸함을 확인해 주시기 바랍니다.
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography variant="body2">혹시 메일을 못 받으셨나요?</Typography>
            <Button variant="text" size="small" onClick={onSubmit}>
              메일 재발송
            </Button>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Link href="/sign-in">
            <ContainedButton buttonName="로그인 화면으로 이동" />
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Index;
