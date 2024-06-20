"use client";
import {
  Box,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ContainedButton,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import * as React from "react";
import { useState } from "react";
import IDSearchModal from "./components/IDSearchModal";
import { POST } from "api";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";

export default function CustRegPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);

    const reqBody = { ...data, telList: [data.tel_0, data.tel_1, data.tel_2] };
    console.log("reqBody", reqBody);

    await POST("/cust", reqBody)
      .then((res) => {
        console.log("", res);
        if (res.success) {
          router.push("/cust-list");
        } else {
          toast(res.message);
        }
      })
      .catch((error) => {
        console.log("Error!!", error);
      })
      .finally(() => setIsOpen(false));
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={undefined}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="고객 등록" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 5 }}>
        EzBioCloud 가입 정보
      </Typography>
      <TableContainer
        sx={{
          mb: 5,
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>고객번호</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <InputValidation inputName="ebcUid" disabled={true} />
              </TD>
              <TH sx={{ width: "15%" }}>아이디</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <InputValidation inputName="ebcEmail" disabled={true} />
                  </Grid>
                  <Grid item xs={2}>
                    {/*<Stack*/}
                    {/*  direction="row"*/}
                    {/*  alignItems="center"*/}
                    {/*  justifyContent="flex-end"*/}
                    {/*>*/}
                    <ContainedButton
                      buttonName="계정 검색"
                      size="small"
                      onClick={handleModalOpen}
                    />
                    {/*</Stack>*/}
                  </Grid>
                </Grid>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>서브 이메일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <InputValidation inputName="ebcSubEmail" disabled={true} />
              </TD>

              <TH sx={{ width: "15%" }}>academic</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <InputValidation inputName="ebcIsSchl" disabled={true} />
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>영문 이름</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <InputValidation inputName="ebcFullName" disabled={true} />
              </TD>
              <TH sx={{ width: "15%" }}>호칭</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <InputValidation inputName="ebcTitle" disabled={true} />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>국가</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <InputValidation inputName="ebcNtly" disabled={true} />
              </TD>
              <TH sx={{ width: "15%" }}>소속 단체</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <InputValidation inputName="ebcInstNm" disabled={true} />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" sx={{ mt: 5 }}>
        기본 정보
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="custNm"
                    required={true}
                    errorMessage="필수 값입니다."
                    pattern={/^[A-Za-z0-9가-힣\s]*$/}
                    patternErrMsg="이름은 한글 또는 영문 입력해주세요.(띄어쓰기와 숫자도 허용합니다.)"
                    minLength={2}
                    minLengthErrMsg="최소 2자 이상 입력해주세요."
                    maxLength={50}
                    maxLengthErrMsg="50자 이내로 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>연락처 [선택] </TH>

              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <InputValidation
                    inputName="tel_0"
                    pattern={/^[0-9]+$/}
                    patternErrMsg="숫자만 입력해주세요."
                    minLength={8}
                    minLengthErrMsg="8자리 이상 입력해주세요."
                    maxLength={15}
                    maxLengthErrMsg="15자리 이내로 입력해주세요."
                    placeholder="01012345678"
                    sx={{ width: 600 }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <InputValidation
                    inputName="tel_1"
                    pattern={/^[0-9]+$/}
                    patternErrMsg="숫자만 입력해주세요."
                    minLength={8}
                    minLengthErrMsg="8자리 이상 입력해주세요."
                    maxLength={15}
                    maxLengthErrMsg="15자리 이내로 입력해주세요."
                    placeholder="01012345678"
                    sx={{ width: 600 }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <InputValidation
                    inputName="tel_2"
                    pattern={/^[0-9]+$/}
                    patternErrMsg="숫자만 입력해주세요."
                    minLength={8}
                    minLengthErrMsg="8자리 이상 입력해주세요."
                    maxLength={15}
                    maxLengthErrMsg="15자리 이내로 입력해주세요."
                    placeholder="01012345678"
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">기타</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>메모</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="memo"
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={1} justifyContent="center">
        <Link href="/cust-list">
          <OutlinedButton buttonName="목록" size="small" />
        </Link>

        <ContainedButton type="submit" buttonName="저장" size="small" />
      </Stack>

      {/*{isOpen && }*/}
      <IDSearchModal
        modalWidth={450}
        open={isOpen}
        onClose={handleModalClose}
      />
    </Form>
  );
}
