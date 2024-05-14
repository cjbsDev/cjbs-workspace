"use client";

import dynamic from "next/dynamic";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CheckboxGV,
  CheckboxSV,
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
  Won,
  EA,
  Taxon,
} from "cjbsDSTM";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import PlatformSelectbox from "./PlatformSelectbox";
import SampleTotal from "./SampleTotal";
import SixteenCheck from "./SixteenCheck";
import {
  emailReceiveSettingData,
  reqReturnListData,
  taxonListData,
} from "../../../data/inputDataLists";
import { fetcher, POST } from "api";
import { useParams, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
import { getDefaultValues } from "./getDefaultValues";
import Research from "./Research";
import TaxonCntFormat from "../../../components/NumberFormat/TaxonCntFormat";
import AmountFormat from "../../../components/NumberFormat/AmountFormat";
import LoadingWhiteSvg from "../../../components/LoadingWhiteSvg";
import ResearcherMngInfo from "./researcherMngInfo";
import MyIcon from "icon/MyIcon";
import ProjectSection from "./ProjectSection";
import TaxonRow from "./TaxonRow";

const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySalesManagerSelctbox = dynamic(
  () => import("../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyServiceTypeSelctbox = dynamic(
  () => import("./ServiceTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyAnalysisTypeSelctbox = dynamic(
  () => import("./AnalysisTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyOrderType = dynamic(() => import("../../../components/OrderType"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

// const LazyProjectSearchModal = dynamic(() => import("./ProjectSearchModal"), {
//   ssr: false,
//   loading: () => <Typography variant="body2">Loading...</Typography>,
// });

const LazyPlatformSelectbox = dynamic(() => import("./PlatformSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyNGSManagerSelctbox = dynamic(
  () => import("../../../components/NGSAnlManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const OrderRegView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();
  // const [showAgncSearchModal, setShowAgncSearchModal] =
  //   useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addEmailChck, setAddEmailChck] = useState<boolean>(false);

  const orshUkey = null;
  const orshType = "intn";

  const defaultValues = {
    srvcTypeMc: "BS_0100007003",
    anlsTypeMc: "BS_0100006004",
    pltfMc: "",
    taxonBCnt: 0,
    taxonECnt: 0,
    taxonACnt: 0,
    mailRcpnList: ["agncLeaderRcpn", "ordrAplcRcpn"],
    orderTypeCc: "BS_0800001",
    isCheck16s: "Y",
  };
  console.log("DefaultValues ==>>", defaultValues);

  // Submit
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    if (data.mailRcpnList.includes("etcRcpn") && data.addEmailList === "") {
      setAddEmailChck(true);
    } else {
      setAddEmailChck(false);
    }

    const typeNumbertaxonACnt = Number(data.taxonACnt);
    const typeNumbertaxonBCnt = Number(data.taxonBCnt);
    const typeNumbertaxonECnt = Number(data.taxonECnt);

    const reqBody = {
      ...data,
      taxonACnt: typeNumbertaxonACnt,
      taxonBCnt: typeNumbertaxonBCnt,
      taxonECnt: typeNumbertaxonECnt,
      orshUkey: orshUkey,
      prjtCodeMc: data.prjtCodeMc,
      prjtDetailCodeMc: data.prjtDetailCodeMc,
      rstFileRcpnEmail: data.rstFileRcpnEmail,
      isFastTrack: data.isFastTrack === false ? "N" : data.isFastTrack,
      prepMngrUkey: data.prepMngrUkey === "" ? null : data.prepMngrUkey,
      libMngrUkey: data.libMngrUkey === "" ? null : data.libMngrUkey,
      seqMngrUkey: data.seqMngrUkey === "" ? null : data.seqMngrUkey,
      reqReturnList: data.reqReturnList === false ? [""] : data.reqReturnList,
    };

    try {
      const response = await POST("/order/intn", reqBody);

      console.log("POST request successful:", response);
      if (response.success) {
        setIsLoading(false);
        router.push("/order-list");
        mutate(`/order-list?page=1&size=15`);
      } else {
        toast(response.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error(
        "내부 오더 등록 에러 =>",
        error.response?.data?.data || error.message,
      );
      // setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // const agncSearchModalOpen = useCallback(() => {
  //   setShowAgncSearchModal(true);
  // }, []);
  //
  // // // [ 프로젝트 검색 ] 모달 닫기
  // const agncSearchModalClose = useCallback(() => {
  //   setShowAgncSearchModal(false);
  // }, []);

  return (
    <>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName={"내부 오더 등록"} />
        </Box>

        {/* 연구책임자 정보 */}
        <ResearcherMngInfo />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={0.5}
          sx={{ mb: 1 }}
        >
          <Typography variant="subtitle1">신청인 정보</Typography>
          <LazyQuickCopy />
        </Stack>

        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>이름</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="flex-start">
                    <InputValidation
                      inputName="ordrAplcNm"
                      required={true}
                      errorMessage="이름을 입력해 주세요."
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>이메일</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="flex-start">
                    <InputValidation
                      inputName="ordrAplcEmail"
                      required={true}
                      errorMessage="이메일을 입력해 주세요."
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>연락처</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="ordrAplcTel"
                      // required={true}
                      // errorMessage="연락처 입력해 주세요."
                      sx={{ width: 600 }}
                      InputProps={{
                        type: "tel",
                      }}
                    />
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <ProjectSection />

        {/*<Typography variant="subtitle1">과제 및 연구</Typography>*/}
        {/*<TableContainer sx={{ mb: 5 }}>*/}
        {/*  <Table>*/}
        {/*    <TableBody>*/}
        {/*      <TableRow>*/}
        {/*        <TH sx={{ width: "15%" }}>과제</TH>*/}
        {/*        <TD sx={{ width: "85%" }} colSpan={3}>*/}
        {/*          <Stack direction="row" spacing={0.5} alignItems="flex-start">*/}
        {/*            <InputValidation*/}
        {/*              inputName="prjtCodeMc"*/}
        {/*              disabled={true}*/}
        {/*              required={orshType === "intn"}*/}
        {/*              errorMessage="과제를 검색 & 선택해주세요."*/}
        {/*              placeholder="과제 코드"*/}
        {/*              sx={{*/}
        {/*                position: "absolute",*/}
        {/*                top: 0,*/}
        {/*                left: 0,*/}
        {/*                zIndex: -1000,*/}
        {/*              }}*/}
        {/*              InputProps={{*/}
        {/*                type: "hidden",*/}
        {/*              }}*/}
        {/*            />*/}
        {/*            <InputValidation*/}
        {/*              inputName="prjcNm"*/}
        {/*              disabled={true}*/}
        {/*              required={orshType === "intn"}*/}
        {/*              errorMessage="과제를 검색 & 선택해주세요."*/}
        {/*              placeholder="과제를 선택해주세요"*/}
        {/*              sx={{ width: 600 }}*/}
        {/*            />*/}
        {/*            <OutlinedButton*/}
        {/*              size="small"*/}
        {/*              buttonName="과제 검색"*/}
        {/*              onClick={agncSearchModalOpen}*/}
        {/*            />*/}
        {/*          </Stack>*/}
        {/*        </TD>*/}
        {/*      </TableRow>*/}
        {/*      <TableRow>*/}
        {/*        <TH sx={{ width: "15%" }}>연구</TH>*/}
        {/*        <TD sx={{ width: "85%" }} colSpan={3}>*/}
        {/*          <Research required={orshType === "intn"} />*/}
        {/*        </TD>*/}
        {/*      </TableRow>*/}
        {/*    </TableBody>*/}
        {/*  </Table>*/}
        {/*</TableContainer>*/}

        <Typography variant="subtitle1">주문 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>메일 수신 설정</TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <Stack direction="row" alignItems="center">
                    <CheckboxGV
                      data={emailReceiveSettingData}
                      inputName="mailRcpnList"
                      required={true}
                      errorMessage="메일 수신 설정을 선택해 주세요."
                    />
                    <InputValidation
                      required={addEmailChck}
                      errorMessage={
                        addEmailChck ? "이메일을 입력해 주세요." : null
                      }
                      inputName="addEmailList"
                      placeholder="example@gmail.com, example2@gmail.com"
                      sx={{ width: 450 }}
                    />
                  </Stack>
                </TD>
              </TableRow>

              {/* intn */}
              {orshType !== null && orshType === "intn" && (
                <TableRow>
                  <TH sx={{ width: "15%" }}>결과파일 수신 계정 변경</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        placeholder="example@gmail.com"
                        inputName="rstFileRcpnEmail"
                        // required={orshType === "intn"}
                        // errorMessage="이메일을 입력해 주세요."
                        sx={{ width: 600 }}
                        InputProps={{
                          type: "email",
                        }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
              )}
              {/* // intn */}

              <TableRow>
                <TH sx={{ width: "15%" }}>분석종류</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyAnalysisTypeSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>서비스 타입</TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyServiceTypeSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>
                  플랫폼<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPlatformSelectbox />
                  </ErrorContainer>
                </TD>
              </TableRow>

              <TaxonRow />

              {/*<TableRow>*/}
              {/*  <TH sx={{ width: "15%" }}>Taxon 개수</TH>*/}
              {/*  <TD sx={{ width: "85%" }} colSpan={5}>*/}
              {/*    <Stack direction="row" spacing={0.5} alignItems="center">*/}
              {/*      {taxonListData.map((taxonItem, index) => {*/}
              {/*        return (*/}
              {/*          <InputValidation*/}
              {/*            inputName={taxonItem.taxonName}*/}
              {/*            required={true}*/}
              {/*            errorMessage="개수를 입력해 주세요."*/}
              {/*            pattern={/^[0-9]+$/}*/}
              {/*            patternErrMsg="숫자만 입력해 주세요."*/}
              {/*            sx={{*/}
              {/*              width: 100,*/}
              {/*              ".MuiOutlinedInput-input": {*/}
              {/*                textAlign: "end",*/}
              {/*              },*/}
              {/*              "&.MuiTextField-root": {*/}
              {/*                backgroundColor: "white",*/}
              {/*                borderRadius: 1,*/}
              {/*              },*/}
              {/*            }}*/}
              {/*            inputMode="numeric"*/}
              {/*            InputProps={{*/}
              {/*              inputComponent: (props) => (*/}
              {/*                <TaxonCntFormat*/}
              {/*                  taxonData={defaultValues[taxonItem.taxonName]}*/}
              {/*                  {...props}*/}
              {/*                />*/}
              {/*              ),*/}
              {/*              startAdornment: (*/}
              {/*                <Taxon iconName={taxonItem.taxonIconName} />*/}
              {/*              ),*/}
              {/*              endAdornment: <EA />,*/}
              {/*            }}*/}
              {/*          />*/}
              {/*        );*/}
              {/*      })}*/}
              {/*    </Stack>*/}
              {/*  </TD>*/}
              {/*</TableRow>*/}
              <TableRow>
                <TH sx={{ width: "15%" }}>샘플개수</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <SampleTotal />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>오더 타입</TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyOrderType />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>
                  반송 요청<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <CheckboxGV
                    data={reqReturnListData}
                    inputName="reqReturnList"
                    // required={true}
                    // errorMessage="반송 요청을 선택해 주새요."
                  />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">추가 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>16s 확인</TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                  <SixteenCheck />
                </TD>
              </TableRow>
              {orshType !== "intn" && (
                <TableRow
                // sx={{ display: orshType === "intn" ? "none" : "" }}
                >
                  <TH sx={{ width: "15%" }}>오더 금액</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="price"
                        required={orshType !== "intn"}
                        errorMessage="오더 금액을 입력해 주세요."
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
                              name={"price"}
                              priceValue={defaultValues.price}
                              {...props}
                            />
                          ),
                          endAdornment: <Won />,
                        }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
              )}

              <TableRow>
                <TH sx={{ width: "15%" }}>영업 담당자</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazySalesManagerSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>

              {/* intn */}
              {orshType !== null && orshType === "intn" && (
                <>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>
                      Fast Track<NotRequired>[선택]</NotRequired>
                    </TH>
                    <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
                      <CheckboxSV
                        inputName="isFastTrack"
                        labelText="Fast Track으로 진행합니다"
                        value="Y"
                      />
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>
                      Prep 담당자<NotRequired>[선택]</NotRequired>
                    </TH>
                    <TD sx={{ width: "85%" }} colSpan={5}>
                      <ErrorContainer FallbackComponent={Fallback}>
                        <LazyNGSManagerSelctbox inputName="prepMngrUkey" />
                      </ErrorContainer>
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>
                      Lib 담당자<NotRequired>[선택]</NotRequired>
                    </TH>
                    <TD sx={{ width: "85%" }} colSpan={5}>
                      <ErrorContainer FallbackComponent={Fallback}>
                        <LazyNGSManagerSelctbox inputName="libMngrUkey" />
                      </ErrorContainer>
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "15%" }}>
                      Seq 담당자<NotRequired>[선택]</NotRequired>
                    </TH>
                    <TD sx={{ width: "85%" }} colSpan={5}>
                      <ErrorContainer FallbackComponent={Fallback}>
                        <LazyNGSManagerSelctbox inputName="seqMngrUkey" />
                      </ErrorContainer>
                    </TD>
                  </TableRow>
                </>
              )}
              {/* // intn */}

              <TableRow>
                <TH sx={{ width: "15%" }}>
                  메모<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%", textAlign: "left" }} colSpan={5}>
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
          <Link href={"/order-list"}>
            <OutlinedButton size="small" buttonName="목록" />
          </Link>

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

export default OrderRegView;
const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
