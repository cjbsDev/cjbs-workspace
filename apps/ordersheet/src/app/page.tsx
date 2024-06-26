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
} from "@mui/material";
import { Form, InputValidation, XlargeButton } from "cjbsDSTM";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const theme = createTheme();
export default function Page() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    //console.log(data);
    let email = data.email;
    let password = data.password;
    signIn("credentials", {
      email,
      password,
      serviceType: "orsh",
      redirect: false,
    }).then((res) => {
      //const isError = res && res.error ? res.error : null
      console.log("!!!!res=", res);
      if (res?.error) {
        const errorMessage = res.error.split("Error:")[1];
        toast(errorMessage, { type: "info" });
      } else {
        //로그인성공
        router.push("/main");
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('/img/background/backgroundBlue.png'), url('/img/background/backgroundRed.png'), url('/img/background/backgroundYellow.png')`,
        backgroundPosition: "top left, top right, bottom left 160px",
        backgroundSize: "160px, 820px, 620px",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginTop: 25, marginBottom: 5, width: 210 }}>
            <MyIcon icon="cj_bk" />
          </Box>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            NGS Service
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            NGS 서비스 주문 시스템을 이용하시려면
            <br />
            EzBioCloud 계정이 필요합니다.
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
            <XlargeButton
              buttonName="로그인"
              type="submit"
              variant="contained"
              fullWidth
              style={{ marginTop: 10, marginBottom: 10 }}
            />
            <Grid container>
              <Grid item xs>
                <Typography variant="button">
                  아직 회원이 아니신가요?
                </Typography>
                <Link
                  href="https://www.ezbiocloud.net/signup?from=mydata"
                  variant="body2"
                  underline="none"
                  target="_blank"
                >
                  회원가입
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://www.ezbiocloud.net/forgotPassword?from=mydata"
                  variant="body2"
                  underline="none"
                  target="_blank"
                >
                  비밀번호 찾기
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </Box>
  );
}
