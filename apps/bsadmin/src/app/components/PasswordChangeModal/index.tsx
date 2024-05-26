import React, { useState } from "react";
import {
  DataTableBase,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
} from "cjbsDSTM";
import {
  Box,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ModalContainerProps } from "../../types/modal-container-props";
import { POST } from "api";
import MyIcon from "icon/MyIcon";

const Index = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("onSubmit DATA ==>", data);

    const reqBody = {
      // kitMc: data.kitMc,
      // machineMc: data.mcNmCc,
      // memo: data.memo,
      // runDttm: convertedDate,
      // runMngrUkey: data.runMngrUkey,
      // runType: data.runType,
      // seqAgncMc: data.prgrAgncNmCc,
    };

    console.log("BODYDATA ==>", reqBody);

    // await POST(apiUrl, reqBody)
    //   .then((response) => {
    //     console.log("POST request successful:", response);
    //     if (response.success) {
    //       // mutate(`/order/${orderUkey}`);
    //       mutate(`/run/list?page=1&size=20`);
    //       handleClose();
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("POST request failed:", error);
    //   });
  };

  return (
    <ModalContainer open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose} closeBtnHidden={true}>
        비밀번호 변경 안내
      </ModalTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary">
            임시 비밀번호로 최초 로그인 또는
            <br />
            기존에 사용 중인 비밀번호 유효기간 만료 시(3개월)
            <br /> 비밀번호 변경이 필요합니다.
            <br /> 새로운 비밀번호를 설정해주세요.
          </Typography>
        </Box>

        <Box sx={{ px: 2, mb: 4 }}>
          <Box
            component="ul"
            sx={{ color: "red", listStylePosition: "outside" }}
          >
            <Box component="li">
              <Typography variant="body2">
                영문자, 숫자, 특수문자(~!@#$%^&*_+=()-)를 모두 포함하여
                <br /> 8~16자리로 설정해주세요
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                최근 사용한 3개의 비밀번호는 재사용할 수 없습니다.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Form
          onSubmit={onSubmit}
          id="passwordChangeForm"
          defaultValues={undefined}
        >
          <Grid container spacing={1}>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Stack direction="row">
                <Typography variant="body2">새 비밀번호</Typography>
              </Stack>
            </Grid>
            <Grid item xs={9}>
              <InputValidation
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
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">새 비밀번호 확인</Typography>
            </Grid>
            <Grid item xs={9} sx={{}}>
              <InputValidation
                inputName="passwordChck"
                placeholder="새 비밀번호 확인"
                required={true}
                errorMessage="비밀번호를 입력해 주세요."
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
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <ModalAction>
        {/*<OutlinedButton*/}
        {/*  buttonName="취소"*/}
        {/*  onClick={handleClose}*/}
        {/*  color="secondary"*/}
        {/*/>*/}
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="passwordChangeForm"
        >
          변경하기
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default Index;
