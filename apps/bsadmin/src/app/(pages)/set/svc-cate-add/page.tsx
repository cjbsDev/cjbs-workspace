"use client";

import React from "react";
import {
  OutlinedButton,
  ContainedButton,
  TH,
  TD,
  Title1,
  Form,
  Checkbox,
  Radio,
  Fallback,
  ErrorContainer,
} from "cjbsDSTM";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Box,
  Container,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import codeDataTemp from "./tempCodeList.json";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const LazyCheckboxList = dynamic(() => import("../CheckboxSetCode"), {
  ssr: false,
  loading: () => <SkeletonLoading height={82} />,
});
const LazyRadioboxList = dynamic(() => import("../RadioboxSetCode"), {
  ssr: false,
  loading: () => <SkeletonLoading height={82} />,
});

/**
 * 1. 서비스 분류 등록
 * 2. 분류 api 가져와서, Radio 세팅 /code/list/shortly  topUniqueCode BS_0100005
 * 3. 분석 종류 api 가져와서, Radio 세팅 // BS_0100006
 * 4. 플랫폼 정보 가져와서 checkbox 세팅 // BS_0100008
 * 
 * {
      "value": "BS_0100008001",
      "optionName": "illumina MiSeq 2x250"
    },
    {
 *
 */

export default function SvcCatePage() {
  // init SRVC_CTGR
  const enumMngrCode = "SRVC_CTGR";
  const router = useRouter();

  /*
  // load
  const {
    data: codeDataTemp,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/mngr/${topCodeMc}/${midCodeMc}?enumMngrCode=${enumMngrCode}`,
    fetcher,
    { revalidateOnFocus: true }
  );
  if (isLoading) {
    return <SkeletonLoading />;
  }
  */
  const codeData = codeDataTemp.data;
  console.log("codeData", codeData);

  const onSubmit = (data: any) => {
    console.log("data", data);
    const selectCodeList = data["btmCodeMcList"];
    let saveObj = {
      btmCodeMcList: selectCodeList,
      midCodeMc: data.midCodeMc,
      topCodeMc: data.topCodeMc,
    };
    //console.log("saveObj", saveObj);
    console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr?enumMngrCode=${enumMngrCode}`; // Replace with your API URL

    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          router.push("/set/svc-cate-list/");
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
      });
  };

  const defaultValues = {};

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="서비스 분류 등록" />
      </Box>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        {/* key={formKey} 마스터 코드 - 상세 코드 컴포넌트 */}
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "252px" }}>분류</TH>
                <TD>
                  {/* 라디오 */}
                  <LazyRadioboxList
                    inputName="topCodeMc"
                    dataList={codeData.topCodeMc}
                  />
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "252px" }}>분석 종류</TH>
                <TD>
                  {/* 라디오 */}
                  <LazyRadioboxList
                    inputName="midCodeMc"
                    dataList={codeData.midCodeMc}
                  />
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "252px" }}>분석 방법</TH>
                <TD>
                  <Stack direction="column">
                    <LazyCheckboxList
                      inputName="btmCodeMcList"
                      dataList={codeData.btmValueList}
                    />
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="목록"
            onClick={() => router.push("/set/svc-cate-list")}
          />
          <ContainedButton buttonName="저장" type="submit" />
        </Stack>
      </Form>
    </Container>
  );
}