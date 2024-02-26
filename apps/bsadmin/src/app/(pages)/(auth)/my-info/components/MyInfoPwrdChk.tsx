"use client";
import * as React from "react";
import {
  cjbsTheme,
  InputValidation,
} from "cjbsDSTM";
import {
  InputAdornment, IconButton, Typography,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import {useEffect, useState} from "react";
import MyIcon from "icon/MyIcon";
import {useFormContext} from "react-hook-form";

const MyInfoPwrdChk = (props: any) => {
  const [filterText, setFilterText] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
    formState
  } = useFormContext();

  const { errors } = formState;

  const pwrd = watch('pwrd');
  const pwrdCheck = watch('pwrdCheck');

  useEffect(() => {
    console.log(pwrd);
    console.log(pwrdCheck);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+=-]).{8,16}$/;
    // console.log(regex.test(pwrd));
    if(pwrd && !regex.test(pwrd)) {
      setError("pwrd", {
        type: "customError",
        message: "비밀번호 설정 규칙이 맞지 않습니다. 규칙 확인 후 재입력 해주세요."
      });
    } else {
      clearErrors('pwrd')
    }
    if(pwrdCheck && !regex.test(pwrd)) {
      setError("pwrdCheck", {
        type: "customError",
        message: "비밀번호 설정 규칙이 맞지 않습니다. 규칙 확인 후 재입력 해주세요."
      });
    } else {
      clearErrors('pwrdCheck')
    }
    if(pwrd && pwrdCheck) {
      if (pwrd !== pwrdCheck) {
        setError("pwrdCheck", {
          type: "customError",
          message: "비밀번호가 일치하지 않습니다."
        });
      } else {
        clearErrors('pwrdCheck')
      }
    }
  }, [pwrd, pwrdCheck]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <InputValidation
        inputName="pwrd"
        placeholder="새 비밀번호"
        required={true}
        errorMessage="비밀번호를 입력해 주세요."
        type={showPassword ? "text" : "password"}
        sx={{ width: 600 }}
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
      {errors.pwrd?.type === "customError" && (
        <Typography
          variant="body2"
          sx={{ color: cjbsTheme.palette.error.main }}
        >
          {errors.pwrd?.message}
        </Typography>
      )}
      <InputValidation
        inputName="pwrdCheck"
        placeholder="새 비밀번호 확인"
        required={true}
        errorMessage="비밀번호를 입력해 주세요."
        // pattern={/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+=-]).{8,16}$/}
        // patternErrMsg="비밀번호 설정 규칙이 맞지 않습니다. 규칙 확인 후 재입력 해주세요."
        type={showPassword ? "text" : "password"}
        sx={{ width: 600 }}
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
      {errors.pwrdCheck?.type === "customError" && (
        <Typography
          variant="body2"
          sx={{ color: cjbsTheme.palette.error.main }}
        >
          {errors.pwrdCheck?.message}
        </Typography>
      )}
    </>
  );
};

export default MyInfoPwrdChk;
