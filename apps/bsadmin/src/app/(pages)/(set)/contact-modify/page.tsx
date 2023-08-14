/**
 * 담당자 수정
 *
 *
 *
 *
 */

"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Stack,
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
  InputValidation,
  OutlinedButton,
  SelectBox,
  CheckboxSV,
  TD,
  TH,
  Title1,
  PostCodeBtn,
} from "cjbsDSTM";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../../func/fetcher";

interface FormData {
  nmEnInit?: string;
  tel?: string;
  departMc?: string;
  authCc?: string;
  statusCc?: string;
}

export default function ContactModifyPage() {
  const searchParams = useSearchParams();
  const params = searchParams.get("userUkey");
  const uKey = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const methods = useForm<FormData>({
    defaultValues: () => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/detail/${uKey}`)
        .then((res) => res.json())
        .then((getData) => {
          const userData = getData.data;
          if (!userData) {
            console.log("데이터가 없습니다. 메세지 보이고 페이지 이동");
            router.push("/contact-list");
            return;
          }

          const userDetail = userData.userDetail;
          setEmail(userDetail.email);
          setName(userDetail.nm);

          return {
            nmEnInit: userDetail.nmEnInit,
            tel: userDetail.tel,
            departMc: userDetail.departMc,
            authCc: userDetail.authCc,
            statusCc: userDetail.statusCc,
          };
        });
    },
  });
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = methods;

  const topValue = "user";
  const { data: userStatusData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=${topValue}&midValue=status`,
    fetcher,
    {
      suspense: true,
      fallbackData: [],
    }
  );
  const { data: userAuthorityData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=${topValue}&midValue=authority`,
    fetcher,
    {
      suspense: true,
      fallbackData: [],
    }
  );
  const { data: userDepartMc } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/?topUniqueCode=BS_0100003`,
    fetcher,
    {
      suspense: true,
      fallbackData: [],
    }
  );

  // [ 수정 ]
  const onSubmit = (data: any) => {
    console.log("in onSubmit", data);

    // /user/{userUkey}

    // {
    //   "authCc": "BS_0301001",
    //   "departMc": "BS_0100003001",
    //   "nmEnInit": "영문이니셜",
    //   "statusCc": "BS_0302001",
    //   "tel": "연락처"
    // }

    ///mngr/esPrMng/{esPrMngUkey}
    let saveObj = {
      authCc: data.authCc,
      departMc: data.departMc,
      nmEnInit: data.nmEnInit,
      statusCc: data.statusCc,
      tel: data.tel,
    };
    console.log("==modify", saveObj);
    console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/${uKey}`; // Replace with your API URL
    console.log("apiUrl", apiUrl);
    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("request successful:", response.data);
        if (response.data.success) {
          router.push("/contact-list/" + uKey);
        }
      })
      .catch((error) => {
        console.error("request failed:", error);
      });
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={{ mb: 4 }}>
            <Title1 titleName="담당자 수정" />
          </Box>

          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>아이디</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    {email ?? "-"}
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>이름</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    {name ?? "-"}
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>영문 이니셜[선택]</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      <InputValidation
                        key="nmEnInit"
                        required={false}
                        inputName="nmEnInit"
                        sx={{ width: 600 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>연락처</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      <InputValidation
                        key="tel"
                        required={true}
                        inputName="tel"
                        sx={{ width: 600 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>부서</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      {userDepartMc.data && (
                        <SelectBox
                          key="departMc"
                          inputName="departMc"
                          options={userDepartMc.data}
                          defaultMsg="부서 선택"
                          sx={{ width: 200 }}
                        />
                      )}
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>권한</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      {userAuthorityData.data && (
                        <SelectBox
                          key="authCc"
                          inputName="authCc"
                          options={userAuthorityData.data}
                          defaultMsg="권한 선택"
                          sx={{ width: 200 }}
                        />
                      )}
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>상태</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      {userStatusData.data && (
                        <SelectBox
                          key="statusCc"
                          inputName="statusCc"
                          options={userStatusData.data}
                          defaultMsg="상태 선택"
                          sx={{ width: 200 }}
                        />
                      )}
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/agnc-pi-list")}
            />
            <ContainedButton buttonName="수정" type="submit" />
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  );
}
