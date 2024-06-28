"use client";
import React, { useState } from "react";
import {
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
import { fetcher, POST, PUT } from "api";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import useSWR, { useSWRConfig } from "swr";
import TelNumber from "../../../../components/NumberFormat/TelNumber";
import HsptCodeSrchRow from "./HsptCodeSrchRow";
import { useSearchParams } from "next/navigation";
import SubmitBtn from "../../../../components/SubmitBtn";

const HsptMngmntReg = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const searchParams = useSearchParams();
  const ukey = searchParams.get("modifyUkey");
  // console.log("modifyUkey", ukey);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useSWR(
    ukey !== null ? `/stock/hspt/${ukey}` : null,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log("sssss", data);

  const defaultValues = {
    ...data,
  };

  const onSubmit = async (data: any) => {
    console.log("Hospital Reg ==>>", data);
    // setIsLoading(true);

    const reqBody = {
      ...data,
      stockHsptUkey: ukey,
    };

    // console.log("REQ BODY ==>>", reqBody);

    try {
      const response =
        ukey === null
          ? await POST(`/stock/hspt`, reqBody)
          : await PUT(`/stock/hspt/${ukey}`, reqBody);

      console.log("POST request successful:", response);
      if (response.success) {
        router.push("/stock-hspt-mngmnt-list");
      } else {
        toast(response.message);
        // setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.response?.data?.data || error.message);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1
          titleName={ukey === null ? "병원 거래처 등록" : "병원 거래처 수정"}
        />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <HsptCodeSrchRow />
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
        <Link href="/stock-hspt-mngmnt-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <SubmitBtn />
      </Stack>
    </Form>
  );
};

export default HsptMngmntReg;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
