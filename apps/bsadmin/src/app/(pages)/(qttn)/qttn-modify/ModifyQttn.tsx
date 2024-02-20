"use client";
import * as React from "react";
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
  SingleDatePicker, SelectBox, CheckboxGV,
} from "cjbsDSTM";
import { useCallback, useState, useRef, useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import { fetcher, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import {useForm} from "react-hook-form";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import LoadingWhiteSvg from "../../../components/LoadingWhiteSvg";
import TypeSelectRadio from "../../../components/TypeSelectRadio";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { groupListDataAtom } from "../../../recoil/atoms/groupListDataAtom";
import DynamicTableQttn from "../../../components/DynamicTableQttn";
import DynamicSumTable from "../../../components/DynamicSumTable";
import AgncModifyComponent from "./AgncModifyComponent";

// 거래처 검색
const LazyAgncSearchModal = dynamic(
  () => import("../../../components/AgncSearchTSModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

// 영업 담당자 선택
const LazySalesManagerSelctbox = dynamic(
  () => import("../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const ModifyQttn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get("qttnUkey");
  const uKey = params;
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm();
  const {
    getValues,
    getFieldState,
    watch,
    formState: { errors, isDirty },
  } = methods;

  const {
    data: getDataObj,
    error,
    isLoading: isDataLoading, // 이름 변경
  } = useSWR(`/qttn/${uKey}`, fetcher);

  if (isDataLoading) {
    // 변경된 이름 사용
    return <SkeletonLoading />;
  }

  console.log("getDataObj", getDataObj);
  const {basicInfo, productInfo, pymtInfo, qttnProdutsDetailRes, rcvInfo, sendInfo} = getDataObj;

  const defaultValues = {
    qttnTypeCc: basicInfo.qttnTypeCc, // 유형
    agncUkey: basicInfo.isExist === 'Y' ? basicInfo.agncUkey : '',
    agncTypeCc: basicInfo.isExist,
    agncNm: basicInfo.agncInstNm,
    qttnDate: new Date(basicInfo.qttnDate),
    bsnsMngrUkey: basicInfo.bsnsMngrUkey,
    rcvInstNm: rcvInfo.rcvInstNm,
    rcvNm: rcvInfo.rcvNm,
    rcvTel: rcvInfo.rcvTel,
    validPerd: rcvInfo.validPerd,
    pymtTypeCc: pymtInfo.pymtTypeCc,
    pymtMemo: pymtInfo.pymtMemo,
    memo: pymtInfo.memo,
    productDetailList: qttnProdutsDetailRes,
    // totalPrice: productInfo.totalPrice,
    // totalSupplyPrice: productInfo.totalSupplyPrice,
    // vat: productInfo.vat,
  };

  const qttnTypeCcData = [
    { value: "BS_2400001", optionName: "결제용" },
    { value: "BS_2400002", optionName: "견적용" },
  ];

  const agncTypeCcData = [
    { value: "N", optionName: "잠재고객" },
    { value: "Y", optionName: "기존고객" },
  ];

  const validPerdData = [
    {
      value: 30,
      optionName: "30일",
    },
    {
      value: 60,
      optionName: "60일",
    },
  ];

  const pymtTypeCcData = [
    { value: "BS_1300002", optionName: "카드결제" },
    { value: "BS_1300001", optionName: "계좌이체" },
  ];

  // Submit
  const onSubmit = async (data: any) => {
    // productDetailList를 순회하며 inclMemo 값이 없는 항목을 찾습니다.
    const updatedProductDetailList = await Promise.all(
      data.productDetailList.map(async (item: any) => {
        if (!item.inclMemo && item.anlsTypeMc && item.inclMemo != "") {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/mngr/esPrMng/anlsType/${item.anlsTypeMc}`
            );
            const data = await response.json();
            return { ...item, inclMemo: data.data.inclInfo }; // inclMemo에 inclInfo 값을 할당
          } catch (error) {
            console.error("Error fetching inclInfo:", error);
            return item; // 에러 발생 시 원래 항목을 반환
          }
        } else {
          return item; // inclMemo 값이 이미 있는 경우 원래 항목을 반환
        }
      })
    );

    const bodyData = {
      agncInstNm: data.agncNm,
      agncUkey: data.agncUkey,
      bsnsMngrUkey: data.bsnsMngrUkey,
      memo: data.memo,
      productDetailList: updatedProductDetailList,
      pymtMemo: data.pymtMemo,
      pymtTypeCc: data.pymtTypeCc,
      qttnDate: dayjs(data.qttnDate).format("YYYY-MM-DD"),
      qttnTypeCc: data.qttnTypeCc, // 유형
      rcvInstNm: data.rcvInstNm,
      rcvNm: data.rcvNm,
      rcvTel: data.rcvTel,
      totalPrice: data.totalPrice,
      totalSupplyPrice: data.totalSupplyPrice,
      validPerd: data.validPerd,
      vat: data.vat,
    };
    console.log("수정전 bodyData", bodyData);

    const apiUrl: string = `/qttn/${uKey}`;
    await PUT(apiUrl, bodyData)
      .then((response) => {
        console.log("PUT request successful:", response);
        if (response.success) {
          toast("수정 되었습니다.");
          setIsLoading(false);
          mutate(apiUrl);
          router.push(`/qttn-list/${uKey}`);
        } else {
          toast(response.message);
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
        // toast(error.)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName={"견적서 수정"} />
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
                  <TypeSelectRadio
                    data={qttnTypeCcData}
                    inputName="qttnTypeCc"
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <AgncModifyComponent inputName='agncTypeCc' />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>견적일</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Box sx={{ width: "670px" }}>
                    <SingleDatePicker
                      inputName="qttnDate"
                      required={true}
                      width="600px"
                    />
                  </Box>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>견적담당</TH>
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
                <TH sx={{ width: "15%" }}>소속</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="rcvInstNm"
                      required={true}
                      errorMessage="필수 값입니다."
                      maxLength={20}
                      maxLengthErrMsg="20자 이내로 입력해주세요."
                      sx={{ width: 600 }}
                    />                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>성명</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="rcvNm"
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
                      inputName="rcvTel"
                      required={false}
                      maxLength={30}
                      maxLengthErrMsg="30자 이내로 입력해주세요."
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>유효기간</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    견적일로부터{" "}
                    <SelectBox
                      required={true}
                      errorMessage="유효 기간을 선택해주세요."
                      inputName="validPerd"
                      options={validPerdData}
                      defaultValue="30" // 디폴트 값으로 "30"을 설정
                    />{" "}
                    이내
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 품명 관리 */}
        <DynamicTableQttn />
        <DynamicSumTable />

        <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
          결제 정보
        </Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>지불조건</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CheckboxGV
                      data={pymtTypeCcData}
                      inputName="pymtTypeCc"
                      required={false}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>결제조건</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="pymtMemo"
                      required={false}
                      maxLength={20}
                      maxLengthErrMsg="20자 이내로 입력해주세요."
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>특이사항(선택)</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <InputValidation
                    fullWidth={true}
                    multiline
                    rows={4}
                    inputName="memo"
                    maxLength={500}
                    sx={{ width: 600 }}
                    maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                  />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="목록"
            onClick={() => router.push(`/qttn-list/`)}
          />
          <ContainedButton
            size="small"
            type="submit"
            buttonName="저장"
            endIcon={isLoading ? <LoadingWhiteSvg /> : null}
          />
        </Stack>
      </Form>
    </>
  );
};

export default ModifyQttn;
