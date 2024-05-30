"use client";
import React, { useEffect } from "react";
import {
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
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { fetcher, POST, PUT } from "api";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import useSWR, { useSWRConfig } from "swr";
import { useSearchParams } from "next/navigation";
import SubmitBtn from "../../../../components/SubmitBtn";
import dynamic from "next/dynamic";
import AmountFormat from "../../../../components/NumberFormat/AmountFormat";
import dayjs from "dayjs";
import SampleAdd from "./components/SampleAdd";
import { useRecoilState } from "recoil";
import { sampleAddDataAtom } from "./components/SampleAdd/sampleAddAtom";
import { NumericFormat } from "react-number-format";

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
  otsSampleDetailList: [];
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
  const [sampleData, setSampleData] = useRecoilState(sampleAddDataAtom);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const searchParams = useSearchParams();
  const ukey = searchParams.get("modifyUkey");
  console.log("modifyUkey", ukey);
  const { data } = useSWR(ukey !== null ? `/ots/${ukey}` : null, fetcher, {
    suspense: true,
  });

  console.log("Stock ots detail view data ==>>", data);

  const defaultValues = {
    ...data,
    otsDttm: ukey === null ? null : new Date(data.otsDttm),
    resultRcpnDttm:
      ukey === null
        ? null
        : data.resultRcpnDttm === null
          ? null
          : new Date(data.resultRcpnDttm),
  };

  useEffect(() => {
    if (ukey !== null) {
      setSampleData(data.sampleUkeyList);
    }
  }, []);

  const onSubmit = async (data: FormDataProps) => {
    console.log(">>>>>>>>>>>", data);

    const filteredSampleUkeyList = data.sampleUkeyList.filter(
      (item) => item !== "",
    );
    console.log("srterter", filteredSampleUkeyList);

    const reqBody = {
      ...data,
      otsDttm: dayjs(data.otsDttm).format("YYYY-MM-DD"),
      resultRcpnDttm:
        data.resultRcpnDttm !== null
          ? dayjs(data.resultRcpnDttm).format("YYYY-MM-DD")
          : data.resultRcpnDttm,
      lastPrice: Number.isNaN(Number(data.lastPrice))
        ? Number(data.lastPrice.replace(/,/g, ""))
        : data.lastPrice,
      qttnPrice: Number.isNaN(Number(data.qttnPrice))
        ? Number(data.qttnPrice.replace(/,/g, ""))
        : data.qttnPrice,
      sampleUkeyList: filteredSampleUkeyList,
    };

    console.log("REQ BODY", reqBody);

    try {
      const response =
        ukey === null
          ? await POST(`/ots`, reqBody)
          : await PUT(`/ots/${ukey}`, reqBody);
      console.log("Form submitted successfully:", response);
      if (response.success) {
        // mutate("/stock/agnc/list?page=1&size=15");
        ukey === null
          ? router.push("/stock-ots-mngmnt-list")
          : router.push(`/stock-ots-mngmnt-list/${ukey}`);
        // router.push(`/stock-ots-mngmnt-list/${ukey}`);
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

  const InputEve = () => {
    return (
      <InputValidation
        inputName="lastPrice"
        // sx={{
        //   width: 160,
        //   ".MuiOutlinedInput-input": {
        //     textAlign: "end",
        //   },
        // }}
        InputProps={{
          endAdornment: <Won />,
        }}
      />
    );
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
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">샘플정보</Typography>
      <SampleAdd />

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
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
                    // required={true}
                    // errorMessage="견적 금액을 입력해 주세요."
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

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>
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
        <Link
          href={
            ukey === null
              ? "/stock-ots-mngmnt-list"
              : `/stock-ots-mngmnt-list/${ukey}`
          }
        >
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
