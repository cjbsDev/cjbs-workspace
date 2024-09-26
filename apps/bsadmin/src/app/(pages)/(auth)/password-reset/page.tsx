"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Alert,
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import { ContainedButton, Form, InputValidation } from "cjbsDSTM";
import { LoadingButton } from "@mui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawKey = searchParams.get("key");
  const key = encodeURIComponent(rawKey).replace(/%20/g, "+");

  const [keyChck, setKeyChck] = useState<boolean>(true);
  const [keyChckMsg, setKeyChckMsg] = useState("Key값을 확인중 입니다.");
  const [keyChckCde, setKeyChckCde] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // console.log("key", decodeURIComponent(key));

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/authEmail/verify/password/check`,
        { key: decodeURIComponent(key) },
      )
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          setKeyChck(false);
        } else {
          // toast(response.data.message);
          setKeyChckMsg(response.data.message);
          setKeyChckCde(response.data.code);
          setKeyChck(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onSubmit = async (data: any) => {
    if (data.password !== data.passwordChck) {
      toast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);

    const reqBody = {
      password: data.password,
      key: decodeURIComponent(key),
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/reset/password`, reqBody)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          router.push("/password-reset-success");
        } else {
          toast(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoading(false);
      });
  };

  // if (keyChck) {
  //   return <div>{keyChckMsg}</div>;
  // }

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

        {keyChck ? (
          <>
            <Alert
              severity={
                keyChckMsg === "Key값을 확인중 입니다." ? "info" : "warning"
              }
              sx={{ mb: 3 }}
            >
              {keyChckMsg}
            </Alert>
            {keyChckCde === "USER_VERIFICATION_ALREADY" ? (
              <Link href="/sign-in">
                <ContainedButton size="small" buttonName="로그인으로 이동" />
              </Link>
            ) : keyChckCde === "USER_VERIFICATION_EXPIRE" ? (
              <Link href="/password-find">
                <ContainedButton size="small" buttonName="비밀번호찾기 이동" />
              </Link>
            ) : keyChckCde === "USER_VERIFICATION_NOT_EXIST" ? (
              <Link href="/password-find">
                <ContainedButton size="small" buttonName="비밀번호찾기 이동" />
              </Link>
            ) : null}
          </>
        ) : (
          <>
            <Typography
              variant="body2"
              sx={{ marginBottom: 2, textAlign: "center" }}
            >
              다른 아이디나 사이트에서 사용한 적 없는 안전한
              <br />
              비밀번호로 변경해 주세요.
              <br />6 자리 이상 영문, 숫자, 특수기호를 사용하여 비밀번호 생성.
            </Typography>

            <Form onSubmit={onSubmit} defaultValues={undefined}>
              <InputValidation
                margin="normal"
                inputName="password"
                placeholder="새 비밀번호"
                required={true}
                errorMessage="비밀번호를 입력해 주세요."
                pattern={
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_+=()-])[A-Za-z\d~!@#$%^&*_+=()-]{6,}$/
                }
                patternErrMsg="6자리 이상 영문, 숫자, 특수기호를 사용해 주세요."
                type={showPassword ? "text" : "password"}
                // sx={{ width: 380 }}
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
                disabled={keyChck}
              >
                비밀번호 변경
              </LoadingButton>
            </Form>
          </>
        )}
      </Stack>
    </Container>
  );
}
