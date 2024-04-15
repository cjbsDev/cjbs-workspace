"use client";
import React, { useState } from "react";
import {
  ContainedButton,
  Form,
  InputValidation,
  OutlinedButton,
  PostCodeBtn,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { POST } from "api";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import { useSWRConfig } from "swr";
import TelNumber from "../../../../components/NumberFormat/TelNumber";
import useCenteredPopup from "../../../../hooks/useCenteredPopup";
import HsptCodeSrchRow from "./HsptCodeSrchRow";

const HospitalMngmntReg = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { isOpen, openPopup, closePopup } = useCenteredPopup(
  //   `/hsptListPopup`,
  //   "병원 거래 검색",
  //   800,
  //   620,
  // );

  const defaultValues = {};

  const onSubmit = async (data: any) => {
    console.log("Hospital Reg ==>>", data);
    setIsLoading(true);

    // {
    //   "addr": "서울시 중구",
    //   "addrDetail": "세종대로 랄랄라",
    //   "hsptCode": "string",
    //   "hsptUniqueCodeMc": "string",
    //   "memo": "string",
    //   "tel": "string",
    //   "zip": "12345"
    // }

    const bodyData = {
      ...data,
    };

    try {
      const response = await POST("/stock/hspt", bodyData);

      console.log("POST request successful:", response);
      if (response.success) {
        // setIsLoading(false);
        router.push("/hospital-mngmnt-list");
      } else {
        toast(response.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.response?.data?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={"병원 거래처 등록"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <HsptCodeSrchRow />
            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "15%" }}>병원명</TH>*/}
            {/*  <TD sx={{ width: "85%" }}>*/}
            {/*    <Stack direction="row" alignItems="center" spacing={0.5}>*/}
            {/*      <InputValidation*/}
            {/*        inputName="hsptUniqueCodeMc"*/}
            {/*        InputProps={{*/}
            {/*          readOnly: true,*/}
            {/*        }}*/}
            {/*        required={true}*/}
            {/*        errorMessage="병원을 검색해 주세요."*/}
            {/*      />*/}
            {/*      <ContainedButton*/}
            {/*        buttonName="병원 검색"*/}
            {/*        size="small"*/}
            {/*        onClick={openPopup}*/}
            {/*      />*/}
            {/*    </Stack>*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
            {/*<TableRow>*/}
            {/*  <TH>병원코드</TH>*/}
            {/*  <TD>*/}
            {/*    <InputValidation*/}
            {/*      sx={{ width: 255 }}*/}
            {/*      inputName="hsptCode"*/}
            {/*      required={true}*/}
            {/*      errorMessage="병원코드를 입력해 주세요."*/}
            {/*      maxLength={20}*/}
            {/*      maxLengthErrMsg="20자 이내로 입력해주세요."*/}
            {/*    />*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
            <TableRow>
              <TH sx={{ width: "15%" }}>주소</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      inputName="zip"
                      placeholder="우편번호"
                      sx={{ width: 77 }}
                      InputProps={{
                        readOnly: true,
                      }}
                      required={true}
                      errorMessage="우편번호 추가해 주세요"
                    />
                    <PostCodeBtn />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 600 }}
                      inputName="addr"
                      InputProps={{
                        readOnly: true,
                      }}
                      required={true}
                      errorMessage="주소 입력해 주세요"
                    />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 600 }}
                      inputName="addrDetail"
                      maxLength={50}
                      maxLengthErrMsg="50자 이내로 입력해주세요."
                      placeholder="상세주소"
                      required={true}
                      errorMessage="상세 주소 입력해 주세요"
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH>연락처</TH>
              <TD>
                <Box sx={{ width: 136 }}>
                  <TelNumber inputName="tel" />
                </Box>
              </TD>
            </TableRow>
            <TableRow>
              <TH>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
              <TD>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="memo"
                  placeholder="메모"
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/hospital-mngmnt-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <LoadingButton
          loading={isLoading}
          variant="contained"
          size="small"
          type="submit"
        >
          저장
        </LoadingButton>
      </Stack>
    </Form>
  );
};

export default HospitalMngmntReg;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
