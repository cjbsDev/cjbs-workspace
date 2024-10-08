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
    // console.log(data);
    setIsLoading(true);
    let email = data.email;
    let password = data.password;
    signIn("credentials", {
      email,
      password,
      redirect: false,
      login_hint: "info@example.com",
    })
      .then((res) => {
        //const isError = res && res.error ? res.error : null
        console.log("!!!!res=", res);
        if (res?.error) {
          console.log("ERERERER", res?.error.split("Error:")[0]);
          const errorMessage =
            res.error.split("Error:")[0] === "Failed to authorize" &&
            "사용자 이메일과 패스워드를 확인하고 다시 시도해주세요.";
          // 사용자 이메일과 패스워드를 확인하고 다시 시도해주세요.
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
          BS Admin
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, textAlign: "center" }}
        >
          BS Admin 시스템은 CJ Bioscience
          <br />
          임직원만 이용할 수 있습니다.
        </Typography>

        <Form onSubmit={onSubmit} defaultValues={undefined}>
          <InputValidation
            margin="normal"
            inputName="email"
            // label="이메일"
            placeholder="이메일"
            required={true}
            errorMessage="이메일 형식의 아이디를 입력해 주세요."
            pattern={/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
            patternErrMsg="이메일 형식이 아닙니다."
            sx={{ width: 380 }}
            inputProps={{
              style: {
                height: 39.6,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MyIcon icon="profile" size={20} />
                </InputAdornment>
              ),
            }}
          />

          <InputValidation
            inputName="password"
            // label="비밀번호"
            placeholder="비밀번호"
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
            로그인
          </LoadingButton>

          {/*<XlargeButton*/}
          {/*  buttonName="로그인"*/}
          {/*  type="submit"*/}
          {/*  variant="contained"*/}
          {/*  fullWidth*/}
          {/*  style={{ marginTop: 10, marginBottom: 10 }}*/}
          {/*/>*/}
          <Grid container>
            <Grid item xs>
              {/*<Link*/}
              {/*  href="https://www.ezbiocloud.net/signup?from=mydata"*/}
              {/*  variant="body2"*/}
              {/*  underline="none"*/}
              {/*  target="_blank"*/}
              {/*>*/}
              {/*  회원가입*/}
              {/*</Link>*/}
            </Grid>
            <Grid item>
              <Link href="/password-find" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Stack>
    </Container>
  );
}
