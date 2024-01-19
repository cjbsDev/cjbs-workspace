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
  CheckboxGV,
  CheckboxSV,
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton, SingleDatePicker,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import * as React from "react";
import { useCallback, useState } from "react";
import LoadingSvg from "public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";
import PlatformSelectbox from "./PlatformSelectbox";
import SampleTotal from "./SampleTotal";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import SixteenCheck from "./SixteenCheck";
import {
  emailReceiveSettingData,
  reqReturnListData,
} from "../../../../../data/inputDataLists";
import MyIcon from "icon/MyIcon";
import { fetcher, POST } from "api";
import { useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
import { getDefaultValues } from "./getDefaultValues";
import Research from "./Research";
import {cjbsTheme} from "cjbsDSTM/themes";
import {useFormContext} from "react-hook-form";

const apiUrl: string = `/order/extr`;

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const LazyOrderSearchModal = dynamic(
  () => import("../../../../../components/OrderSearchModal"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyQuickCopy = dynamic(() => import("./QuickCopy"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySalesManagerSelctbox = dynamic(
  () => import("../../../../../components/SalesManagerSelectbox"),
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

const LazyOrderType = dynamic(() => import("../../../../../components/OrderType"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyServiceCategoryType = dynamic(() => import("../../../../../components/ServiceCategoryType"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyProjectSearchModal = dynamic(() => import("./ProjectSearchModal"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyNGSManagerSelctbox = dynamic(
  () => import("../../../../../components/NGSAnlManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LicenseRegView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();

  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addEmailChck, setAddEmailChck] = useState<boolean>(false);
  const [srvcCtgrMcValue, setSrvcCtgrMcValue] = useState<string>(null);

  // 주문서에서 오더 등록 할때
  const from: string | null = searchParams.get("from");
  console.log("from", typeof from);
  const orshUK = searchParams.get("orshUkey");
  console.log("orshUkey", orshUK);
  const orshType = searchParams.get("orshType");
  console.log("orshType", orshType);

  const orshAPIPath: string = `/orsh/bs/${orshType}/${orshUK}`;

  const { data: orshExtrData } = useSWR(
    () => (orshUK !== null ? orshAPIPath : apiUrl),
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("orshExtrData", orshExtrData);
  console.log("vercel-test");

  const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;

      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          defaultValue={
            orshExtrData === "NO_DATA" ? 0 : orshExtrData.addInfo.price
          }
          thousandSeparator
          valueIsNumericString
        />
      );
    },
  );

  // defaultValues 세팅
  const defaultValues = getDefaultValues(orshType, orshExtrData);
  console.log("DefaultValues ==>>", defaultValues);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    if (data.mailRcpnList.includes("etcRcpn") && data.addEmailList === "") {
      setAddEmailChck(true);
    } else {
      setAddEmailChck(false);
    }

    let typeNumberPrice;
    if (JSON.stringify(data.price).includes(",")) {
      typeNumberPrice = Number(data.price.replace(",", ""));
    } else {
      typeNumberPrice = Number(data.price);
    }

    const typeNumbertaxonACnt = Number(data.taxonACnt);
    const typeNumbertaxonBCnt = Number(data.taxonBCnt);
    const typeNumbertaxonECnt = Number(data.taxonECnt);

    const bodyData = {
      addEmailList: data.addEmailList,
      agncUkey: data.agncUkey,
      anlsTypeMc: data.anlsTypeMc,
      bsnsMngrUkey: data.bsnsMngrUkey,
      custUkey: data.custUkey,
      isCheck16s: data.isCheck16s,
      mailRcpnList: data.mailRcpnList,
      memo: data.memo,
      orderTypeCc: data.orderTypeCc,
      ordrAplcEmail: data.ordrAplcEmail,
      ordrAplcNm: data.ordrAplcNm,
      ordrAplcTel: data.ordrAplcTel,
      pltfMc: data.platformMc,
      price: typeNumberPrice,
      reqReturnList: data.reqReturnList,
      srvcTypeMc: data.srvcTypeMc,
      taxonACnt: typeNumbertaxonACnt,
      taxonBCnt: typeNumbertaxonBCnt,
      taxonECnt: typeNumbertaxonECnt,
    };

    // 외부 오더 등록 BODY DATA
    const extrKeyValues = {
      orshUkey: orshUK,
    };

    const extrBodyData = {
      ...bodyData,
      ...extrKeyValues,
    };

    // 내부 오더 등록 BODY DATA
    // !내부 오더 등록에는 price키 가 필요 없음.
    const intnKeyValues = {
      orshUkey: orshUK,
      prjtCodeMc: data.prjtCodeMc,
      prjtDetailCodeMc: data.prjtDetailCodeMc,
      rstFileRcpnEmail: data.rstFileRcpnEmail,
      isFastTrack: data.isFastTrack === false ? "N" : data.isFastTrack,
      prepMngrUkey: data.qcMngrUkey === "" ? null : data.qcMngrUkey,
      libMngrUkey: data.libMngrUkey === "" ? null : data.libMngrUkey,
      seqMngrUkey: data.seqMngrUkey === "" ? null : data.seqMngrUkey,
    };
    const intnBodyData = {
      ...bodyData,
      ...intnKeyValues,
    };
    const { price, ...rest } = intnBodyData;
    const withOutPriceIntnBodyData = { ...rest };

    console.log("withOutPriceIntnBodyData", withOutPriceIntnBodyData);

    await POST(
      orshUK !== null ? orshAPIPath : apiUrl,
      orshType === "extr"
        ? extrBodyData
        : orshType === "intn"
          ? withOutPriceIntnBodyData
          : bodyData,
    )
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          // setIsLoading(false);
          if (orshUK !== null) {
            router.push(`${from}`);
            mutate(`/orsh/bs/${orshType}/list?page=1&size=20`);
          } else {
            router.push("/order-list");
          }
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

  // [ 고객 검색 ] 모달 오픈
  const handleCustSearchModalOpen = () => {
    setCustSearchModalOpen(true);
  };
  // [ 고객 검색 ] 모달 닫기
  const handleCustSearchModalClose = useCallback(() => {
    setCustSearchModalOpen(false);
  }, []);

  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // // [ 프로젝트 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  const handleOnChange = (selectValue: string) => {
    console.log(selectValue);
    setSrvcCtgrMcValue(selectValue);
  };

  return (
    <>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="분석 내역서 등록"/>
        </Box>

        <Typography variant="subtitle1">기본정보</Typography>
        <TableContainer sx={{ mb: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>서비스 분류</TH>
                <TD sx={{ width: "85%", textAlign: "left" }}>
                  {/*<ErrorContainer FallbackComponent={Fallback}>*/}
                  {/*  <LazyServiceCategoryType handleOnChange={handleOnChange} />*/}
                  {/*</ErrorContainer>*/}
                  License
                  <InputValidation
                    // sx={{ display: "none" }}
                    inputName="srvcCtgrMc"
                    required={true}
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>플랫폼</TH>
                <TD sx={{ width: "85%" }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <InputValidation
                      inputName="agncNm"
                      required={true}
                      errorMessage="플랫폼을 입력해 주세요."
                      sx={{ width: 500 }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <OutlinedButton
                      size="small"
                      buttonName="플랫폼 검색"
                      onClick={handleCustSearchModalOpen}
                    />
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{border: `1px solid ${cjbsTheme.palette.grey.A400}`, mb: 5, p: 5}}
        >
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body2">
              License의 경우,플랫폼을 먼저 입력해주세요.
            </Typography>
            <Typography variant="body2">
              이렇게 하면 추가 정보(고객정보,분석내역 등)를 입력할 수 있습니다.
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="subtitle1">고객정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="agncNm"
                    required={false}
                    // errorMessage="소속 거래처(PI)를 입력해 주세요."
                    sx={{ width: '100%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
                <TH sx={{ width: "15%" }}>연구책임자</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="custNm"
                    required={false}
                    // errorMessage="연구책임자를 입력해 주세요."
                    sx={{ width: '100%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>영업 담당자</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="bsnsMngrVal"
                    required={true}
                    errorMessage="아이디(이메일) 입력해 주세요."
                    sx={{ width: '100%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
                <TH sx={{ width: "15%" }}>선결제 금액</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="custNm"
                    required={true}
                    errorMessage="이름을 입력해 주세요."
                    sx={{ width: '100%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">분석내역</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>분석일</TH>
                <TD sx={{ width: "35%" }}>
                  <SingleDatePicker inputName="startDttm" />
                </TD>
                <TH sx={{ width: "15%" }}>총 수량</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="agncNm"
                    required={true}
                    errorMessage="연구책임자를 입력해 주세요."
                    sx={{ width: '100%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>총 공급가액</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="ebcEmail"
                    required={true}
                    errorMessage="아이디(이메일) 입력해 주세요."
                    sx={{ width: '100%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
                <TH sx={{ width: "15%" }}>부가세</TH>
                <TD sx={{ width: "35%" }}>
                  <InputValidation
                    inputName="custNm"
                    required={true}
                    errorMessage="이름을 입력해 주세요."
                    sx={{ width: '100%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>합계금액</TH>
                <TD sx={{ width: "85%" }} colSpan={3}>
                  <InputValidation
                    inputName="ebcEmail"
                    required={true}
                    errorMessage="아이디(이메일) 입력해 주세요."
                    sx={{ width: '100%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">정산</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>남은금액</TH>
                <TD sx={{ width: "85%" }}>
                  1,656,456
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>정산이력</TH>
                <TD sx={{ width: "85%" }}>

                  <TableContainer sx={{ mb: 1 }}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TH sx={{ width: "25%" }}>방법</TH>
                          <TH sx={{ width: "25%" }}>구분</TH>
                          <TH sx={{ width: "25%" }}>비용</TH>
                          <TH sx={{ width: "25%" }}>비고</TH>
                        </TableRow>
                        <TableRow>
                          <TD sx={{ width: "25%" }}>선결제</TD>
                          <TD sx={{ width: "25%" }}>자동 정산 얘정</TD>
                          <TD sx={{ width: "25%" }}>-1,000,000</TD>
                          <TD sx={{ width: "25%" }}>-</TD>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TH sx={{ width: "25%" }}>정산방법</TH>
                          <TH sx={{ width: "25%" }}>구분</TH>
                          <TH sx={{ width: "25%" }}>정산비용</TH>
                          <TH sx={{ width: "25%" }}>비고</TH>
                        </TableRow>
                        <TableRow>
                          <TD sx={{ width: "25%" }}>선결제</TD>
                          <TD sx={{ width: "25%" }}>자동 정산</TD>
                          <TD sx={{ width: "25%" }}>-1,000,000</TD>
                          <TD sx={{ width: "25%" }}>
                            <ContainedButton
                              size="small"
                              // type="submit"
                              color="secondary"
                              buttonName="정산내역"
                            />
                          </TD>
                        </TableRow>
                        <TableRow>
                          <TD sx={{ width: "25%" }}>세금계산서</TD>
                          <TD sx={{ width: "25%" }}>카드</TD>
                          <TD sx={{ width: "25%" }}>-50,000</TD>
                          <TD sx={{ width: "25%" }}>123445</TD>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">기타정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>
                  메모<NotRequired>[선택]</NotRequired>
                </TH>
                <TD sx={{ width: "85%", textAlign: "left" }}>
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

        {/* 오더 검색 모달*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyOrderSearchModal
            onClose={handleCustSearchModalClose}
            open={custSearchModalOpen}
            modalWidth={1400}
            type="order"
          />
        </ErrorContainer>

        {/* 프로젝트 검색 모달*/}
        <LazyProjectSearchModal
          onClose={agncSearchModalClose}
          open={showAgncSearchModal}
          modalWidth={1000}
        />

        <Stack direction="row" spacing={0.5} justifyContent="center">
          {/*<OutlinedButton*/}
          {/*  buttonName="목록"*/}
          {/*  onClick={() => router.push("/order-list")}*/}
          {/*/>*/}
          <Link href={from !== null ? from : "/order-list"}>
            <OutlinedButton size="small" buttonName="목록" />
          </Link>

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

export default LicenseRegView;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
