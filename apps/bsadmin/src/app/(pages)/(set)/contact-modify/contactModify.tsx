import React from "react";
import useSWR from "swr";
import { fetcher, PUT } from "api";
import { toast } from "react-toastify";
import {
  Box,
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
  Form,
  InputValidation,
  OutlinedButton,
  SelectBox,
  SkeletonLoading,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";

const LazyUserDepartMCSelect = dynamic(() => import("./UserDepartMCSelect"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyUserAuthoritySelect = dynamic(() => import("./UserAuthoritySelect"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyUserStatusSelect = dynamic(() => import("./UserStatusSelect"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const ContactModify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userUkey = searchParams.get("userUkey");
  const { data } = useSWR(`/user/detail/${userUkey}`, fetcher, {
    suspense: true,
  });

  console.log("CONTACT Modify Data ==>>", data);

  const { userDetail } = data;

  const {
    authCc,
    authVal,
    departMc,
    departVal,
    email,
    lastLoginAt,
    nm,
    nmEnInit,
    singupAt,
    statusCc,
    statusVal,
    tel,
  } = userDetail;

  const defaultValues = {
    ...userDetail,
    tel: userDetail.tel === null ? "-" : userDetail.tel,
    // nmEnInit: userDetail.nmEnInit,
    // tel: userDetail.tel,
    // departMc: userDetail.departMc,
    // authCc: userDetail.authCc,
    // statusCc: userDetail.statusCc,
  };

  const onSubmit = async (data: any) => {
    console.log("in onSubmit", data);

    let saveObj = {
      ...data,
      // authCc: data.authCc,
      // departMc: data.departMc,
      // nmEnInit: data.nmEnInit,
      // statusCc: data.statusCc,
      // tel: data.tel,
    };
    console.log("saveObj", saveObj);
    console.log("modify stringify", JSON.stringify(saveObj));
    const apiUrl = `/user/${userUkey}`; // Replace with your API URL
    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        router.push("/contact-list/" + userUkey);
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="담당자 수정" />
      </Box>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>아이디</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                {/*{email ?? "-"}*/}
                {email}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                {/*{name ?? "-"}*/}
                {nm}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>영문 이니셜[선택]</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
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
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
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
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyUserDepartMCSelect />
                  </ErrorContainer>
                  {/*{userDepartMc && (*/}
                  {/*  <SelectBox*/}
                  {/*    key="departMc"*/}
                  {/*    inputName="departMc"*/}
                  {/*    options={userDepartMc}*/}
                  {/*    defaultMsg="부서 선택"*/}
                  {/*    sx={{ width: 200 }}*/}
                  {/*  />*/}
                  {/*)}*/}
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>권한</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyUserAuthoritySelect />
                  </ErrorContainer>
                  {/*{userAuthorityData && (*/}
                  {/*  <SelectBox*/}
                  {/*    key="authCc"*/}
                  {/*    inputName="authCc"*/}
                  {/*    options={userAuthorityData}*/}
                  {/*    defaultMsg="권한 선택"*/}
                  {/*    sx={{ width: 200 }}*/}
                  {/*  />*/}
                  {/*)}*/}
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyUserStatusSelect />
                  </ErrorContainer>
                  {/*{userStatusData && (*/}
                  {/*  <SelectBox*/}
                  {/*    key="statusCc"*/}
                  {/*    inputName="statusCc"*/}
                  {/*    options={userStatusData}*/}
                  {/*    defaultMsg="상태 선택"*/}
                  {/*    sx={{ width: 200 }}*/}
                  {/*  />*/}
                  {/*)}*/}
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/contact-list">
          <OutlinedButton buttonName="목록" />
        </Link>

        <ContainedButton buttonName="수정" type="submit" />
      </Stack>
    </Form>
  );
};

export default ContactModify;
