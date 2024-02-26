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
import {POST} from "api";

const theme = createTheme();
export default function Page() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    let password = data.password;
    //Test!234
    await POST(`/user/pwrd/recheck?pwrd=${password}`)
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          router.push('/my-info');
        } else {
          toast(res.message)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box>
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
              placeholder="비밀번호"
              required={true}
              errorMessage="비밀번호를 입력해 주세요."
              pattern={/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+=-]).{8,16}$/}
              patternErrMsg="비밀번호 설정 규칙이 맞지 않습니다. 규칙 확인 후 재입력 해주세요."
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
          </Form>
        </Stack>
      </Container>
    </Box>
  );
}