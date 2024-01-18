"use client";

import dynamic from "next/dynamic";
import {
  Box,
  BoxProps,
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
  SingleDatePicker,
} from "cjbsDSTM";
import * as React from "react";
import { useCallback, useState } from "react";
import LoadingSvg from "public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";
import { fetcher, POST } from "api";
import { useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import TypeSelect from "../TypeSelect";
import dayjs from "dayjs";

// 거래처 검색
const LazyAgncSearchModal = dynamic(
  () => import("../../../../components/AgncSearchTSModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const LazyAnalysisSampleDynamicTable = dynamic(
  () => import("../AnalysisSampleDynamicTable"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

// 영업 담당자 선택
const LazySalesManagerSelctbox = dynamic(
  () => import("../../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const TSRegView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectSampleListData, setSelectSampleListData] = useState<any>({});
  const methods = useForm();
  const {
    getValues,
    getFieldState,
    watch,
    formState: { errors, isDirty },
  } = methods;

  // [기관 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  // [ 기관 검색 ] 모달 오픈
  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // [ 기관 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
    console.log("getInstNm", getValues("instNm"));
    console.log("getAgncNm", getValues("agncNm"));
  };

  // Submit
  const onSubmit = async (data: any) => {
    const sampleUkeyList = () => {
      return data.sample.map((item) => ({
        anlsTypeMc: item.anlsTypeMc,
        products: item.products,
        sampleSize: Number(item.sampleSize.replaceAll(",", "")),
        srvcTypeMc: item.srvcTypeMc,
        supplyPrice: Number(item.supplyPrice.replaceAll(",", "")),
        unitPrice: Number(item.unitPrice.replaceAll(",", "")),
      }));
    };

    const bodyData = {
      tdstTypeCc: data.tdstTypeCc, // 유형
      agncUkey: data.agncUkey,
      conm: data.conm,
      nm: data.nm,
      tel: data.tel,
      memo: data.memo,
      wdtDate: dayjs(data.wdtDate).format("YYYY-MM-DD"),
      bsnsMngrUkey: data.bsnsMngrUkey,

      tdstProductDetailList: sampleUkeyList(),
      totalPrice: Number(data.totalPrice),
      totalSupplyPrice: Number(data.totalSupplyPrice),
      vat: Number(data.vat),
    };

    console.log("bodyData", bodyData);

    const apiUrl: string = `/tdst`;
    await POST(apiUrl, bodyData)
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          toast("등록 되었습니다.");
          setIsLoading(false);
          mutate(apiUrl);
          router.push("/ledger-ts-list");
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

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName={"거래명세서 등록"} />
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
          기본 정보
        </Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>유형</TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <TypeSelect />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="flex-start">
                    <InputValidation
                      inputName="agncNm"
                      sx={{ width: 600 }}
                      required={true}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <InputValidation
                      disabled={true}
                      sx={{ display: "none" }}
                      inputName="agncUkey"
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <OutlinedButton
                      size="small"
                      buttonName="거래처 검색"
                      onClick={agncSearchModalOpen}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>작성일</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Box sx={{ width: "670px" }}>
                    <SingleDatePicker
                      inputName="wdtDate"
                      required={true}
                      width="600px"
                    />
                  </Box>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>영업 담당자</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazySalesManagerSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
          공급받는자 정보
        </Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>상호</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="conm"
                      required={true}
                      errorMessage="필수 값입니다."
                      maxLength={20}
                      maxLengthErrMsg="20자 이내로 입력해주세요."
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>성명</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="nm"
                      required={true}
                      errorMessage="필수 값입니다."
                      maxLength={20}
                      maxLengthErrMsg="20자 이내로 입력해주세요."
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>연락처(선택)</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="tel"
                      required={false}
                      maxLength={30}
                      maxLengthErrMsg="30자 이내로 입력해주세요."
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>비고</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="memo"
                      required={false}
                      maxLength={30}
                      maxLengthErrMsg="30자 이내로 입력해주세요."
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 분석내역표 */}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAnalysisSampleDynamicTable
            setSelectSampleListData={setSelectSampleListData}
          />
        </ErrorContainer>

        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>총 공급가액</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="totalSupplyPriceVal"
                    required={true}
                    sx={{
                      width: "100%",
                      ".MuiOutlinedInput-input": {
                        textAlign: "end",
                      },
                      "&.MuiTextField-root": {
                        backgroundColor: "#F1F3F5",
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="body2" sx={{ color: "black" }}>
                            원
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <InputValidation
                    inputName="totalSupplyPrice"
                    required={true}
                    sx={{ width: "100%", display: "none" }}
                  />
                </TD>
                <TH sx={{ width: "15%" }}>부가세</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="vatVal"
                    required={true}
                    sx={{
                      width: "100%",
                      ".MuiOutlinedInput-input": {
                        textAlign: "end",
                      },
                      "&.MuiTextField-root": {
                        backgroundColor: "#F1F3F5",
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="body2" sx={{ color: "black" }}>
                            원
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <InputValidation
                    inputName="vat"
                    required={true}
                    // errorMessage="아이디(이메일) 입력해 주세요."
                    sx={{ width: "100%", display: "none" }}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>합계금액</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  <InputValidation
                    inputName="totalPriceVal"
                    required={true}
                    sx={{
                      width: "100%",
                      ".MuiOutlinedInput-input": {
                        textAlign: "end",
                      },
                      "&.MuiTextField-root": {
                        backgroundColor: "#F1F3F5",
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="body2" sx={{ color: "black" }}>
                            원
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <InputValidation
                    inputName="totalPrice"
                    required={true}
                    // errorMessage="아이디(이메일) 입력해 주세요."
                    sx={{ width: "100%", display: "none" }}
                  />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 거래처 검색 모달*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncSearchModal
            onClose={agncSearchModalClose}
            open={showAgncSearchModal}
            modalWidth={800}
            type="order"
          />
        </ErrorContainer>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <ContainedButton
            size="small"
            type="submit"
            buttonName="저장"
            endIcon={
              isLoading ? (
                <LoadingSvg stroke="white" width={20} height={20} />
              ) : null
            }
          />
        </Stack>
      </Form>
    </>
  );
};

export default TSRegView;
