"use client";

import * as React from "react";
import { useRouter } from "next-nprogress-bar";
import MyIcon from "icon/MyIcon";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  InputAdornment,
  Typography,
  Container,
  Link,
  Grid,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, InputValidation, XlargeButton } from "cjbsDSTM";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

const theme = createTheme();
export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    console.log(data);
    setIsLoading(true);
    let email = data.email;
    let password = data.password;
    signIn("credentials", { email, password, redirect: false })
      .then((res) => {
        //const isError = res && res.error ? res.error : null
        console.log("!!!!res=", res);
        if (res?.error) {
          const errorMessage = res.error.split("Error:")[1];
          toast(errorMessage, { type: "info" });
        } else {
          //로그인성공
          router.push("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
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
          비밀번호 재설정
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, textAlign: "center" }}
        >
          다른 아이디나 사이트에서 사용한 적 없는 안전한
          <br />
          비밀번호로 변경해 주세요.
        </Typography>

        <Form onSubmit={onSubmit} defaultValues={undefined}>
          <InputValidation
            margin="normal"
            inputName="password"
            placeholder="새 비밀번호"
            required={true}
            errorMessage="비밀번호를 입력해 주세요."
            type={showPassword ? "text" : "password"}
            sx={{ width: 380 }}
            inputProps={{
              style: {
                height: 39.6,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MyIcon icon="lock" size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <MyIcon icon="eye-slash-fill" size={24} />
                    ) : (
                      <MyIcon icon="eye-fill" size={24} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <InputValidation
            inputName="passwordChck"
            placeholder="새 비밀번호 확인"
            required={true}
            errorMessage="비밀번호를 입력해 주세요."
            type={showPassword ? "text" : "password"}
            sx={{ width: 380 }}
            inputProps={{
              style: {
                height: 39.6,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MyIcon icon="lock" size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <MyIcon icon="eye-slash-fill" size={24} />
                    ) : (
                      <MyIcon icon="eye-fill" size={24} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="submit"
            fullWidth
            size="large"
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            비밀번호 변경
          </LoadingButton>
        </Form>
      </Stack>
    </Container>
  );
}
