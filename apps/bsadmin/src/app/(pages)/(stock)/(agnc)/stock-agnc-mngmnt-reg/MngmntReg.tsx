"use client";
import React, { useState } from "react";
import {
  Form,
  InputValidation,
  OutlinedButton,
  SelectBox,
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
import { useSearchParams } from "next/navigation";
import { groupDepartMngrListData } from "../../../../data/inputDataLists";
import SubmitBtn from "../../../../components/SubmitBtn";

interface FormDataProps {
  departMngrMc: string;
  departMngrVal: string;
  email: string;
  memo: string;
  mngrNm: string;
  mngrTel: string;
  stockAgncId: number;
  stockAgncNm: string;
  stockAgncUkey: string;
}

const MngmntReg = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const searchParams = useSearchParams();
  const ukey = searchParams.get("modifyUkey");
  console.log("modifyUkey", ukey);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useSWR(
    ukey !== null ? `/stock/agnc/${ukey}` : null,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Stock agnc detail view data ==>>", data);

  const defaultValues = {
    ...data,
  };

  const onSubmit = async (data: FormDataProps) => {
    // setIsLoading(true);
    const reqBody = {
      ...data,
    };

    console.log("REQ BODY", reqBody);

    try {
      const response =
        ukey === null
          ? await POST(`/stock/agnc`, reqBody)
          : await PUT(`/stock/agnc/${ukey}`, reqBody);
      console.log("Form submitted successfully:", response);
      if (response.success) {
        mutate("/stock/agnc/list?page=1&size=15");
        router.push("/stock-agnc-mngmnt-list");
      } else {
        toast(response.message);
      }
    } catch (error) {
      console.error("Failed to submit the form:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={ukey === null ? "주문처 등록" : "주문처 수정"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>주문처</TH>
              <TD sx={{ width: "85%" }}>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="stockAgncNm"
                  required={true}
                  errorMessage="주문처를 입력해 주세요."
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH>이메일</TH>
              <TD>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="email"
                  required={true}
                  errorMessage="email를 입력해 주세요."
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH>담당자</TH>
              <TD>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="mngrNm"
                  required={true}
                  errorMessage="담당자를 입력해 주세요."
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH>연락처</TH>
              <TD>
                <Box sx={{ width: 136 }}>
                  <TelNumber inputName="mngrTel" />
                </Box>
              </TD>
            </TableRow>
            <TableRow>
              <TH>거래부서</TH>
              <TD>
                <SelectBox
                  options={groupDepartMngrListData}
                  inputName="departMngrMc"
                />
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
                  rows={3}
                  inputName="memo"
                  placeholder="메모"
                  sx={{ py: 0.5 }}
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/stock-agnc-mngmnt-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <SubmitBtn />
      </Stack>
    </Form>
  );
};

export default MngmntReg;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
