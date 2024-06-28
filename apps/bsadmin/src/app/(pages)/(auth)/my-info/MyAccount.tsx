"use client";

import dynamic from "next/dynamic";
import {
  Box,
  BoxProps, IconButton,
  InputAdornment,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
  SingleDatePicker, cjbsTheme,
} from "cjbsDSTM";
import * as React from "react";
import { useCallback, useState } from "react";
import LoadingWhiteSvg from "../../../components/LoadingWhiteSvg";
import { useRouter } from "next-nprogress-bar";
import { fetcher, PUT } from "api";
import { useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import TypeSelectRadio from "../../../components/TypeSelectRadio";
import MyIcon from "icon/MyIcon";
import SkeletonLoading from "../../../components/SkeletonLoading";
import MyInfoPwrdChk from "./components/MyInfoPwrdChk";

// 영업 담당자 선택
const LazySalesManagerSelctbox = dynamic(
  () => import("../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const MyAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const methods = useForm();
  const {
    getValues,
    getFieldState,
    watch,
    formState: { errors, isDirty },
  } = methods;

  const {
    data: getUserDataObj,
    error,
    isLoading: isDataLoading, // 이름 변경
  } = useSWR(`/user/info`, fetcher);

  if (isDataLoading) {
    // 변경된 이름 사용
    return <SkeletonLoading />;
  }
  console.log("getUserDataObj", getUserDataObj);

  const defaultValues = {
    nmEnInit: getUserDataObj.nmEnInit,
    tel: getUserDataObj.tel,
  };

  // Submit
  const onSubmit = async (data: any) => {
    const bodyData = {
      nmEnInit: data.nmEnInit,
      pwrd: data.pwrd,
      pwrdCheck: data.pwrdCheck,
      tel: data.tel,
    };
    console.log("bodyData", bodyData);

    const apiUrl: string = `/user/info`;
    await PUT(apiUrl, bodyData)
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          toast("내 정보가 수정 되었습니다.");
          setIsLoading(false);
          mutate(apiUrl);
          router.push("/");
        } else {
          toast(response.message);
        }
      })
      .catch((error) => {
        console.error("POST request failed:", error);
        // toast(error.)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName={"내 정보 관리"} />
        </Box>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>아이디</TH>
                <TD sx={{ width: "85%", textAlign: "left" }}>
                  {getUserDataObj.email}
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>이름</TH>
                <TD sx={{ width: "85%" }}>
                  <Stack direction="row" spacing={0.5} alignItems="flex-start">
                    {getUserDataObj.nm}
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>비밀번호</TH>
                <TD sx={{ width: "85%" }}>
                  <Stack spacing={0.5} justifyContent="center">
                    <Box
                      alignItems="start"
                      sx={{ paddingX: 3, paddingY: 1, }}
                    >
                      <ul>
                        <li style={{ color: "#EF151E" }}>
                          <Typography variant="body2">
                            영문자, 숫자,특수문자( ~!@#$%^&*_+=()- )를 모두 포함하여 8~16자리로 설정해주세요.
                          </Typography>
                        </li>
                        <li style={{ color: "#EF151E" }}>
                          <Typography variant="body2">
                            최근 사용한 3개의 비밀번호는 재사용할 수 없습니다.
                          </Typography>
                        </li>
                      </ul>
                    </Box>

                    <MyInfoPwrdChk />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>영문 이니셜 [선택]</TH>
                <TD sx={{ width: "85%" }}>
                  <InputValidation
                    inputName="nmEnInit"
                    sx={{ width: 600 }}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>연락처</TH>
                <TD sx={{ width: "85%" }}>
                  <InputValidation
                    inputName="tel"
                    sx={{ width: 600 }}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>부서</TH>
                <TD sx={{ width: "85%" }}>
                  {getUserDataObj.departVal}
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="메인으로"
            onClick={() => router.push("/")}
          />
          <ContainedButton
            type="submit"
            buttonName="수정 완료"
            endIcon={isLoading ? <LoadingWhiteSvg /> : null}
          />
        </Stack>

      </Form>
    </>
  );
};

export default MyAccount;
