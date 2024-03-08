"use client";
import * as React from "react";
import { useCallback, useState, useRef, useEffect } from "react";

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
  LinkButton,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import LoadingWhiteSvg from "../../../../../../components/LoadingWhiteSvg";
import { useRouter } from "next-nprogress-bar";
import { fetcher, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
import { cjbsTheme } from "cjbsDSTM/themes";

import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import MonthlyList from "./MonthlyList";
import LicenseModifiSampleDynamicTable from "./LicenseModifiSampleDynamicTable";
import DynamicSumAnlsltstTable from "../../../../../../components/DynamicSumAnlsItstTable";

const LicenseModifiInfo = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const anlsItstUkey = params.slug;

  const { data } = useSWR(`/anls/itst/${anlsItstUkey}`, fetcher, {
    suspense: true,
  });
  const { mutate } = useSWRConfig();
  console.log("response", data);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectSampleListData, setSelectSampleListData] = useState<any>({});

  // string으로 가져온 stndPrice에 NA 값이 아니면 콤마 추가
  const convertedData = data.anlsItstCostInfo.anlsItstCostList.map((dataItem: any) => ({
    ...dataItem,
    stndPrice: dataItem.stndPrice !== "N/A" ? dataItem.stndPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A",
    chkStndPrice: dataItem.stndPrice !== "N/A" ? dataItem.stndPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A",
    chkSupplyPrice: dataItem.supplyPrice !== "N/A" && dataItem.supplyPrice,
  }));

  const defaultValues = {
    srvcCtgrMc: data.anlsItstInfo.srvcCtgrMc,
    agncUkey: data.anlsItstCustInfo.agncUkey,
    orderId: data.anlsItstInfo.orderId,
    orderUkey: data.anlsItstInfo.orderUkey,
    pltfValueView: data.anlsItstInfo.anlsTypeVal + " > " + data.anlsItstInfo.pltfVal,
    pltfMc: data.anlsItstInfo.pltfMc,
    anlsTypeMc: data.anlsItstInfo.anlsTypeMc,
    depthVal: data.anlsItstInfo.depthVal,
    depthMc: data.anlsItstInfo.depthMc,
    agncNm: data.anlsItstCustInfo.agncNm + "(" + data.anlsItstCustInfo.instNm + ")",
    custNm: data.anlsItstCustInfo.rhpiNm + "(" + data.anlsItstCustInfo.rhpiEbcEmail + ")",
    bsnsMngrVal: data.anlsItstCustInfo.bsnsMngrVal,
    rmnPrePymtPrice: data.anlsItstCustInfo.rmnPrePymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    memo: data.memo,
    anlsDttm: new Date(data.anlsItstCostInfo.anlsDttm),
    // sample: data.anlsItstCostInfo.anlsItstCostList,
    sample: convertedData,
    totalCnt: data.anlsItstCostInfo.totalCnt,
    totalSupplyPriceVal: data.anlsItstCostInfo.totalSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    totalSupplyPrice: data.anlsItstCostInfo.totalSupplyPrice,
    vatVal: data.anlsItstCostInfo.totalVat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    vat: data.anlsItstCostInfo.totalVat,
    totalPriceVal: data.anlsItstCostInfo.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    totalPrice: data.anlsItstCostInfo.totalPrice,
    remainingAmount: data.anlsItstCostInfo.remainingAmount,
  };

  // let dataGetCnt = 0;
  // useEffect(() => {
  //   if (data && dataGetCnt < 1) {
  //     dataGetCnt++;
  //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", data.anlsItstInfo.orderUkey);
  //     setUkeyValue(data.anlsItstInfo.orderUkey);
  //     setSelectSampleList(data.anlsItstCostInfo.anlsItstCostList);
  //     // console.log("defaultValues ==>>>>", defaultValues)
  //     if (data.isEdit === "N") {
  //       setIsEdit(data.isEdit);
  //     }
  //   }
  // }, [data]);

  // defaultValues 세팅
  // const defaultValues = getDefaultValues(orshType, orshExtrData);
  // console.log("DefaultValues ==>>", defaultValues);

  const onSubmit = async (data: any) => {

    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    if (data.sample.length <= 0) {
      toast("해당 오더에 포함된 분석 내역이 없습니다.");
      return false;
    }

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", selectSampleListData);

    const sampleUkeyList = () => {
      let sampleList = data.sample;

      sampleList.map((item: any, index: any) => {
        console.log("item", item);
        // console.log("selectSampleListData.hasOwnProperty(item.srvcTypeMc)", selectSampleListData.hasOwnProperty(item.srvcTypeMc));
        if (selectSampleListData.hasOwnProperty(item.srvcTypeMc)) {
          console.log("selectSampleListData", selectSampleListData[item.srvcTypeMc]["sampleUkey"]);
          sampleList[index]["sampleUkey"] = selectSampleListData[item.srvcTypeMc]["sampleUkey"];
        } else {
          sampleList[index]["sampleUkey"] = [];
        }
        // sampleList[index]["sampleUkey"] = selectSampleListData[item.srvcTypeMc]["sampleUkey"];
        sampleList[index]["stndPrice"] = typeof sampleList[index]["stndPrice"] === "string" ? sampleList[index]["stndPrice"] : Number(sampleList[index]["stndPrice"].replaceAll(",", ""));
        sampleList[index]["supplyPrice"] = sampleList[index]["supplyPrice"];
        sampleList[index]["unitPrice"] = sampleList[index]["unitPrice"];
        sampleList[index]["vat"] = sampleList[index]["vat"];
      });
      return sampleList;
    };

    const bodyData = {
      agncUkey: data.agncUkey,
      anlsDttm: dayjs(data.anlsDttm).format("YYYY-MM-DD"),
      anlsTypeMc: data.anlsTypeMc,
      costList: sampleUkeyList(),
      depthMc: data.depthMc,
      memo: data.memo,
      orderUkey: data.orderUkey,
      pltfMc: data.pltfMc,
      srvcCtgrMc: data.srvcCtgrMc,
      totalCnt: data.totalCnt,
      totalPrice: data.totalPrice,
      totalSupplyPrice: data.totalSupplyPrice,
      vat: data.vat,
    };

    console.log("bodyData", bodyData);

    const apiUrl: string = `/anls/itst/${anlsItstUkey}`;
    await PUT(apiUrl, bodyData)
      .then((response) => {
        console.log("PUT request successful:", response);
        if (response.success) {
          toast("수정 되었습니다.");
          setIsLoading(false);
          mutate(apiUrl);
          router.push("/ledger-analysis-report-list");
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
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="분석 내역서 수정" />
        </Box>
        <Typography variant="subtitle1">기본정보</Typography>
        <TableContainer sx={{ mb: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>서비스 분류</TH>
                <TD sx={{ width: "35%", textAlign: "left" }}>
                  <Typography variant="body2" sx={{ pl: "0px" }}>
                    License
                  </Typography>
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="srvcCtgrMc"
                    required={true}
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                </TD>
                <TH sx={{ width: "15%", }}>플랫폼</TH>
                <TD sx={{ width: "35%", textAlign: "left" }}>
                  <InputValidation
                    inputName="pltfValueView"
                    required={false}
                    sx={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="pltfMc"
                    required={true}
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="anlsTypeMc"
                    required={true}
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <>
          <Typography variant="subtitle1">고객정보</Typography>
          <TableContainer sx={{ mb: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                  <TD sx={{ width: "35%" }}>
                    <InputValidation
                      inputName="agncNm"
                      required={false}
                      // errorMessage="소속 거래처(PI)를 입력해 주세요."
                      sx={{ width: "100%" }}
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
                      sx={{ width: "100%" }}
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
                      sx={{ width: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </TD>
                  <TH sx={{ width: "15%" }}>선결제 금액</TH>
                  <TD sx={{ width: "35%" }}>
                    <InputValidation
                      inputName="rmnPrePymtPrice"
                      required={true}
                      errorMessage="이름을 입력해 주세요."
                      sx={{ width: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box>

            <LicenseModifiSampleDynamicTable />
            <DynamicSumAnlsltstTable />
            <MonthlyList />

            <Typography variant="subtitle1">기타정보</Typography>
            <TableContainer sx={{ mb: 2 }}>
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
                        sx={{
                          width: "100%",
                          ".MuiOutlinedInput-root": {
                            p: 1,
                            marginY: 0.5,
                          },
                        }}
                      />
                    </TD>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Stack
              direction="row"
              spacing={0.5}
              justifyContent="center"
              sx={{ mb: 5 }}
            >
              <Link href="/ledger-analysis-report-list">
                <OutlinedButton size="medium" buttonName="목록" />
              </Link>

              <ContainedButton
                size="medium"
                type="submit"
                buttonName="수정"
                endIcon={
                  isLoading ? (
                    <LoadingWhiteSvg />
                  ) : null
                }
              />
            </Stack>
          </Box>
        </>
      </>
    </Form>
  );
};

export default LicenseModifiInfo;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
