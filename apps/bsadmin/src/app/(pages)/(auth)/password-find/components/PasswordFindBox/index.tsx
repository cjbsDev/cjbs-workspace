"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import { Form, InputValidation } from "cjbsDSTM";
import { LoadingButton } from "@mui/lab";
import { POST } from "api";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next-nprogress-bar";

const Index = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/authEmail/verify/password`,
        data,
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          router.push(`/password-mail-send?email=${data.email}`);
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
          비밀번호 재설정
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, textAlign: "center" }}
        >
          회원 이메일을 입력하시면 해당 메일로
          <br /> 비밀번호를 재설정할 수있는 링크를 보내드립니다.
        </Typography>

        <Form onSubmit={onSubmit} defaultValues={undefined}>
          <InputValidation
            margin="normal"
            inputName="email"
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

          <Stack>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              style={{ marginTop: 10, marginBottom: 10 }}
              // onClick={onSubmit}
            >
              fasdflkjasd
            </LoadingButton>
          </Stack>

          {/*<InputValidation*/}
          {/*  inputName="password"*/}
          {/*  // label="비밀번호"*/}
          {/*  placeholder="비밀번호"*/}
          {/*  required={true}*/}
          {/*  errorMessage="비밀번호를 입력해 주세요."*/}
          {/*  type={showPassword ? "text" : "password"}*/}
          {/*  sx={{ width: 380 }}*/}
          {/*  inputProps={{*/}
          {/*    style: {*/}
          {/*      height: 39.6,*/}
          {/*    },*/}
          {/*  }}*/}
          {/*  InputProps={{*/}
          {/*    startAdornment: (*/}
          {/*      <InputAdornment position="start">*/}
          {/*        <MyIcon icon="lock" size={20} />*/}
          {/*      </InputAdornment>*/}
          {/*    ),*/}
          {/*    endAdornment: (*/}
          {/*      <InputAdornment position="end">*/}
          {/*        <IconButton*/}
          {/*          aria-label="toggle password visibility"*/}
          {/*          onClick={handleClickShowPassword}*/}
          {/*          onMouseDown={handleMouseDownPassword}*/}
          {/*        >*/}
          {/*          {showPassword ? (*/}
          {/*            <MyIcon icon="eye-slash-fill" size={24} />*/}
          {/*          ) : (*/}
          {/*            <MyIcon icon="eye-fill" size={24} />*/}
          {/*          )}*/}
          {/*        </IconButton>*/}
          {/*      </InputAdornment>*/}
          {/*    ),*/}
          {/*  }}*/}
          {/*/>*/}

          {/*<LoadingButton*/}
          {/*  loading={isLoading}*/}
          {/*  variant="contained"*/}
          {/*  type="submit"*/}
          {/*  fullWidth*/}
          {/*  size="large"*/}
          {/*  style={{ marginTop: 10, marginBottom: 10 }}*/}
          {/*>*/}
          {/*  로그인*/}
          {/*</LoadingButton>*/}
        </Form>
      </Stack>
    </Container>
  );
};

export default Index;
