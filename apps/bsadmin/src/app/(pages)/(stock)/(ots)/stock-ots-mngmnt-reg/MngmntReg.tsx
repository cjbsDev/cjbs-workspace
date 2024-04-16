"use client";
import React, { useState } from "react";
import {
  cjbsTheme,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  SingleDatePicker,
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
import { groupDepartMngrListData } from "../../../../data/inputDataLists";
import SubmitBtn from "../../../../components/SubmitBtn";
import dynamic from "next/dynamic";
import AmountFormat from "../../../../components/NumberFormat/AmountFormat";
import dayjs from "dayjs";
import SampleAdd from "./components/SampleAdd";

interface FormDataProps {
  agncCc: string;
  anlsTypeMc: string;
  clrUkey: string;
  lastPrice: number;
  memo: string;
  orderInfo: string;
  otsDttm: string;
  pltfMc: string;
  qttnPrice: number;
  rcptNum: string;
  resultRcpnDttm: string;
  sampleInfo: string;
  sampleTypeMc: string;
  sampleUkeyList: [string];
  seqTypeCc: string;
  srvcTypeMc: string;
}

const LazySeqTypeCc = dynamic(() => import("./components/SeqTypeCc"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyAgncCc = dynamic(() => import("./components/AgncCc"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazySampleTypeMc = dynamic(() => import("./components/SampleTypeMc"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazySrvcTypeMc = dynamic(() => import("./components/SrvcTypeMc"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyAnlsTypeMc = dynamic(() => import("./components/AnlsTypeMc"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyPltfMc = dynamic(() => import("./components/PltfMc"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyClrUkey = dynamic(() => import("./components/ClrUkey"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

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

  console.log("Stock ots detail view data ==>>", data);

  const defaultValues = {
    ...data,
  };

  const onSubmit = async (data: FormDataProps) => {
    const reqBody = {
      ...data,
      otsDttm: dayjs(data.otsDttm).format("YYYY-MM-DD"),
      resultRcpnDttm: dayjs(data.resultRcpnDttm).format("YYYY-MM-DD"),
      lastPrice: Number(data.lastPrice.replace(/,/g, "")),
      qttnPrice: Number(data.qttnPrice.replace(/,/g, "")),
    };

    console.log("REQ BODY", reqBody);

    // try {
    //   const response =
    //     ukey === null
    //       ? await POST(`/stock/agnc`, reqBody)
    //       : await PUT(`/stock/agnc/${ukey}`, reqBody);
    //   console.log("Form submitted successfully:", response);
    //   if (response.success) {
    //     mutate("/stock/agnc/list?page=1&size=15");
    //     router.push("/stock-agnc-mngmnt-list");
    //   } else {
    //     toast(response.message);
    //   }
    // } catch (error) {
    //   console.error("Failed to submit the form:", error);
    //   if (error.response) {
    //     console.error("Error response:", error.response.data);
    //   }
    // } finally {
    //   // setIsLoading(false);
    // }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName={ukey === null ? "아웃소싱 등록" : "아웃소싱 수정"} />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>구분</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazySeqTypeCc />
                </ErrorContainer>
              </TD>
              <TH sx={{ width: "15%" }}>날짜</TH>
              <TD sx={{ width: "35%" }}>
                <Box sx={{ width: 160 }}>
                  <SingleDatePicker inputName="otsDttm" />
                </Box>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>업체</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyAgncCc />
                </ErrorContainer>
              </TD>
              <TH sx={{ width: "15%" }}>접수번호</TH>
              <TD sx={{ width: "35%" }}>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="rcptNum"
                  required={true}
                  errorMessage="접수번호를 입력해 주세요."
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>샘플종류</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazySampleTypeMc />
                </ErrorContainer>
              </TD>
              <TH sx={{ width: "15%" }}>서비스종류</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazySrvcTypeMc />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>분석종류</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyAnlsTypeMc />
                </ErrorContainer>
              </TD>
              <TH sx={{ width: "15%" }}>플랫폼</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyPltfMc />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH>견적 금액</TH>
              <TD>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="qttnPrice"
                    required={true}
                    errorMessage="견적 금액을 입력해 주세요."
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
                          name={"qttnPrice"}
                          priceValue={defaultValues.qttnPrice}
                          {...props}
                        />
                      ),
                      endAdornment: <Won />,
                    }}
                  />
                </Stack>
              </TD>
              <TH>
                최종 금액 <NotRequired>[선택]</NotRequired>
              </TH>
              <TD>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="lastPrice"
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
                          name={"lastPrice"}
                          priceValue={defaultValues.lastPrice}
                          {...props}
                        />
                      ),
                      endAdornment: <Won />,
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                결과 접수일 <NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "35%" }}>
                <Box sx={{ width: 160 }}>
                  <SingleDatePicker inputName="resultRcpnDttm" />
                </Box>
              </TD>
              <TH sx={{ width: "15%" }}>발주자</TH>
              <TD sx={{ width: "35%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyClrUkey />
                </ErrorContainer>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">샘플정보</Typography>

      <SampleAdd />

      {/*<Stack*/}
      {/*  sx={{ backgroundColor: cjbsTheme.palette.grey["200"], py: 5 }}*/}
      {/*  spacing={0.5}*/}
      {/*  useFlexGap*/}
      {/*  flexWrap="wrap"*/}
      {/*  justifyContent="center"*/}
      {/*  alignItems="center"*/}
      {/*>*/}
      {/*  <Typography>버튼을 클릭하면 샘플을 추가 할 수 있습니다.</Typography>*/}
      {/*  <OutlinedButton buttonName="샘플추가" size="small" />*/}
      {/*</Stack>*/}

      {/*<TableContainer sx={{ mb: 5 }}></TableContainer>*/}

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
