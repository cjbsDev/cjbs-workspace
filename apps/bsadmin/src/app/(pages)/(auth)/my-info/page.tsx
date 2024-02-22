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
} from "@mui/material";
import { Form, InputValidation, XlargeButton } from "cjbsDSTM";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const theme = createTheme();
export default function Page() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    console.log(data);
    let password = data.password;
    // /user/pwrd/recheck
    signIn("credentials", { email, password, redirect: false }).then((res) => {
      //const isError = res && res.error ? res.error : null
      console.log("!!!!res=", res);
      if (res?.error) {
        const errorMessage = res.error.split("Error:")[1];
        toast(errorMessage, { type: "info" });
      } else {
        //로그인성공
        router.push("/");
      }
    });
  };

  return (
    <Box
      // sx={{
      //   backgroundImage: `url('./img/background/backgroundBlue.png'), url('./img/background/backgroundRed.png'), url('./img/background/backgroundYellow.png')`,
      //   backgroundPosition: "top left, top right, bottom left 160px",
      //   backgroundSize: "160px, 820px, 620px",
      //   backgroundRepeat: "no-repeat",
      //   height: "100vh",
      // }}
    >
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
          <Box sx={{ marginTop: 0, marginBottom: 0, width: 150 }}>
            <MyIcon icon="cj_bk" />
          </Box>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            기존 비밀번호를 입력해주세요.
          </Typography>

          <Form onSubmit={onSubmit} defaultValues={undefined}>
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
              buttonName="확인"
              type="submit"
              variant="contained"
              fullWidth
              style={{ marginTop: 10, marginBottom: 10 }}
            />
            {/*<Grid container>*/}
            {/*  <Grid item>*/}
            {/*    <Link href="#" variant="body2" underline="none">*/}
            {/*      비밀번호 찾기*/}
            {/*    </Link>*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
          </Form>
        </Stack>
      </Container>
    </Box>
  );
}