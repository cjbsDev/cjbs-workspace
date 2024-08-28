"use client";
import React, { useState } from "react";
import {
  ErrorContainer,
  Fallback,
  Form,
  formatNumberWithCommas,
  InputValidation,
  OutlinedButton,
  PostCodeBtn,
  RadioGV,
  TD,
  TH,
  Title1,
  Won,
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
import SubmitBtn from "../../../../components/SubmitBtn";
import dynamic from "next/dynamic";
import AmountFormat from "../../../../components/NumberFormat/AmountFormat";
import StockMngmnt1 from "./components/StockMngmnt1";
import StockMngmnt2 from "./components/StockMngmnt2";

const LazyStockCategory = dynamic(() => import("./components/StockCategory"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyStockMngmnt2 = dynamic(() => import("./components/StockMngmnt2"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyStockUnit = dynamic(() => import("./components/StockUnit"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyStockSrvc = dynamic(() => import("./components/StockSrvc"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyStockMachine = dynamic(() => import("./components/StockMachine"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyStockPlace = dynamic(() => import("./components/StockPlace"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const dataRadioGVAstnPriceCodeCc = [
  { value: "Y", optionName: "Yes" },
  { value: "N", optionName: "No" },
];

const MngmntReg = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const searchParams = useSearchParams();
  const ukey = searchParams.get("modifyUkey");
  // console.log("modifyUkey", ukey);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useSWR(ukey !== null ? `/stock/${ukey}` : null, fetcher, {
    suspense: true,
  });

  // console.log("sssss", data);

  const defaultValues = {
    ...data,
    isUsed: "Y",
  };

  const onSubmit = async (data: any) => {
    console.log("Stock Reg ==>>", data);
    // setIsLoading(true);

    const reqBody = {
      ...data,
      unpr:
        typeof data.unpr === "string"
          ? Number(data.unpr.replaceAll(",", ""))
          : data.unpr,
      stockHsptUkey: ukey,
    };

    console.log("REQ BODY ==>>", reqBody);

    try {
      const response =
        ukey === null
          ? await POST(`/stock`, reqBody)
          : await PUT(`/stock/${ukey}`, reqBody);

      console.log("POST request successful:", response);
      if (response.success) {
        router.push("/stock-mngmnt-list");
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
        <Title1 titleName={ukey === null ? "재고 등록" : "재고 수정"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>보조금 여부</TH>
              <TD sx={{ width: "35%" }}>
                <RadioGV
                  data={dataRadioGVAstnPriceCodeCc}
                  inputName="isAstnPrice"
                  required={true}
                  errorMessage="필수 선택입니다."
                />
              </TD>
              <TH sx={{ width: "15%" }}>구분</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyStockCategory />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>것인사이드 여부</TH>
              <TD>
                <RadioGV
                  data={dataRadioGVAstnPriceCodeCc}
                  inputName="isGutinside"
                  required={true}
                  errorMessage="것인사이드 선택입니다."
                />
              </TD>
              <TH sx={{ width: "15%" }}>사용중</TH>
              <TD>
                <RadioGV
                  data={dataRadioGVAstnPriceCodeCc}
                  inputName="isUsed"
                  required={true}
                  errorMessage="값을 선택하세요."
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>주문처</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Box sx={{ width: 200 }}>
                  <InputValidation
                    inputName="agncNm"
                    required={true}
                    errorMessage="주문처를 입력해 주세요."
                  />
                </Box>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>품명</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Box sx={{ width: 200 }}>
                  <InputValidation
                    inputName="stockNm"
                    required={true}
                    errorMessage="품명 입력해 주세요."
                  />
                </Box>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>제조사</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Box sx={{ width: 200 }}>
                  <InputValidation
                    inputName="mkrNm"
                    required={true}
                    errorMessage="제조사 입력해 주세요."
                  />
                </Box>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>재고 담당자</TH>
              <TD sx={{ width: "35%" }}>
                <Stack direction="row" spacing={1}>
                  <StockMngmnt1 />
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyStockMngmnt2 />
                  </ErrorContainer>
                </Stack>
              </TD>
              <TH sx={{ width: "15%" }}>단가</TH>
              <TD sx={{ width: "35%" }}>
                <InputValidation
                  inputName="unpr"
                  required={true}
                  errorMessage="단가를 입력해 주세요."
                  sx={{
                    width: 160,
                    ".MuiOutlinedInput-input": {
                      textAlign: "end",
                    },
                  }}
                  inputMode="numeric"
                  InputProps={{
                    inputComponent: (props) => (
                      <AmountFormat
                        name={"unpr"}
                        priceValue={defaultValues.unpr}
                        {...props}
                      />
                    ),
                    endAdornment: <Won />,
                  }}
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>규격</TH>
              <TD sx={{ width: "35%" }}>
                <Box sx={{ width: 200 }}>
                  <InputValidation
                    inputName="stnd"
                    required={true}
                    errorMessage="규격 입력해 주세요."
                  />
                </Box>
              </TD>
              <TH sx={{ width: "15%" }}>단위</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyStockUnit />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH>Cat. No</TH>
              <TD>
                <Box sx={{ width: 200 }}>
                  <InputValidation
                    inputName="catNo"
                    required={true}
                    errorMessage="Cat. No 입력해 주세요."
                  />
                </Box>
              </TD>
              <TH>서비스</TH>
              <TD>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyStockSrvc />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                사용기계<NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyStockMachine />
                </ErrorContainer>
              </TD>
              <TH sx={{ width: "15%" }}>재고위치</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyStockPlace />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
              <TD colSpan={3}>
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
        {/*<Link href="/stock-mngmnt-list">*/}
        {/*  <OutlinedButton size="small" buttonName="목록" />*/}
        {/*</Link>*/}

        <OutlinedButton
          size="small"
          buttonName="목록"
          onClick={() => router.back()}
        />

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
