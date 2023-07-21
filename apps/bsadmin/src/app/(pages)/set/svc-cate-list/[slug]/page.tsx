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
import { useRouter } from "next/navigation";
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
import useSWR from "swr";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { useForm } from "react-hook-form";
import LogUpdateTitle from "../../../../components/LogUpdateTitle";
import dynamic from "next/dynamic";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface ViewProps {
  params: {
    slug: string;
  };
}

export default function SvcCatePage({ params }: ViewProps) {
  // init
  const { slug } = params;
  const router = useRouter();

  // load
  const {
    data: codeDataTemp,
    error,
    isLoading,
  } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/mngr/${slug}/none?enumMngrCode=SRVC_CTGR`,
    fetcher,
    { revalidateOnFocus: true }
  );
  if (isLoading) {
    return <SkeletonLoading />;
  }
  const onSubmit = (data: any) => {
    console.log("onSubmit data", data);
    /*
    svcCate01 분류
    svcCate02 분석 종류 
    분석 방법 
    */
  };

  /*
  {
    "btmCodeMcList": [
      "string"
    ],
    "midCodeMc": "string",
    "topCodeMc": "string"
  }
  
  const onSubmit = (data: any) => {

    // 분석 단계 관련하여 선택한 object 값을 api 호출 방식에 맞게 array 로 변환함.
    // value 에서 "Y" or true 값들만 selectCodeList 에 넣음
    const selectCodeList: string[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        selectCodeList.push(key);
      }
    }

    let saveObj = {
      btmCodeMcList: selectCodeList,
      midCodeMc: "none",
      topCodeMc: slug,
    };

    // console.log("saveObj", saveObj);
    // console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/mngr?enumMngrCode=SRVC_CTGR`; // Replace with your API URL

    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          router.push("/set/svc-type-list/");
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
      });
  };
  */

  const codeData = codeDataTemp.data;
  /*
  const formKey = JSON.stringify(codeData); // 매번 defaultValues 를 변환시켜야 될 필요성이 있어서 함 ( 여러번 동일한 페이지를 올 때 갱신 )

  const codeDataSet = {
    BS_0100004001: "N",
    BS_0100004006: "N",
    BS_0100004003: "N",
    BS_0100004004: "N",
    BS_0100004005: "N",
    BS_0100004007: "N",
  };

  codeData.btmValueList.forEach((item: any) => {
    switch (item.btmCodeMc) {
      case "BS_0100004001":
        codeDataSet.BS_0100004001 = "Y";
        break;
      case "BS_0100004006":
        codeDataSet.BS_0100004006 = "Y";
        break;
      case "BS_0100004003":
        codeDataSet.BS_0100004003 = "Y";
        break;
      case "BS_0100004004":
        codeDataSet.BS_0100004004 = "Y";
        break;
      case "BS_0100004005":
        codeDataSet.BS_0100004005 = "Y";
        break;
      case "BS_0100004007":
        codeDataSet.BS_0100004007 = "Y";
        break;
      default:
        break;
    }
  });
  const defaultValues = {
    BS_0100004001: codeDataSet.BS_0100004001 == "Y" ?? "N",
    BS_0100004006: codeDataSet.BS_0100004006 == "Y" ?? "N",
    BS_0100004003: codeDataSet.BS_0100004003 == "Y" ?? "N",
    BS_0100004004: codeDataSet.BS_0100004004 == "Y" ?? "N",
    BS_0100004005: codeDataSet.BS_0100004005 == "Y" ?? "N",
    BS_0100004007: codeDataSet.BS_0100004007 == "Y" ?? "N",
  };

  svcCate01 분류
  svcCate02 분석 종류 
  분석 방법 
  */

  console.log("codeData", codeData);

  const defaultValues = {
    //BS_0100008001: true,
  };

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="서비스 분류 수정" />
      </Box>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        {/* key={formKey} 마스터 코드 - 상세 코드 컴포넌트 */}
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "252px" }}>분류</TH>
                <TD>
                  {/*BS_0100007001 */}
                  <Radio
                    inputName="svcCate01"
                    labelText="Analysis"
                    value="BS_0100005001"
                  />
                  {/*BS_0100005002 */}
                  <Radio
                    inputName="svcCate01"
                    labelText="License"
                    value="BS_0100005002"
                  />
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "252px" }}>분석 종류</TH>
                <TD>
                  <Radio inputName="svcCate02" labelText="CG" value="" />
                  <Radio
                    inputName="svcCate02"
                    labelText="GRIIS Composition"
                    value="BS_0100006002"
                  />
                  <Radio
                    inputName="svcCate02"
                    labelText="GRIIS Essential"
                    value="BS_0100006003"
                  />
                  <Radio
                    inputName="svcCate02"
                    labelText="MTP"
                    value="BS_0100006004"
                  />
                  {/*BS_0100006004 */}
                  <Radio
                    inputName="svcCate02"
                    labelText="RS"
                    value="BS_0100006005"
                  />
                  {/*BS_0100006005 */}
                  <Radio
                    inputName="svcCate02"
                    labelText="SG"
                    value="BS_0100006006"
                  />
                  {/*BS_0100006006 */}
                  <Radio
                    inputName="svcCate02"
                    labelText="WG"
                    value="BS_0100006007"
                  />
                  {/*BS_0100006007 */}
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "252px" }}>분석 방법</TH>

                <TD>
                  <Stack direction="column">
                    {/* 
                    <Checkbox
                      inputName="BS_0100008001"
                      labelText="illumina MiSeq 2x250"
                      value="N"
                    />
                    <Checkbox
                      inputName="BS_0100008002"
                      labelText="Pacbio Sequel 16S"
                    />
                    */}
                    <Checkbox
                      inputName="svcCate03"
                      labelText="illumina MiSeq 2x250"
                      value="BS_0100008001"
                    />
                    <Checkbox
                      inputName="svcCate03"
                      labelText="Pacbio Sequel 16S"
                      value="BS_0100008002"
                    />
                    <Checkbox
                      inputName="BS_0100008003"
                      labelText="MTP Premium Add-on 1"
                    />
                    <Checkbox
                      inputName="BS_0100008004"
                      labelText="MTP Premium Add-on 2"
                    />
                    <Checkbox
                      inputName="BS_0100008009"
                      labelText="Illumina MiSeq 2x300"
                      value="N"
                    />
                    <Checkbox
                      inputName="BS_0100008011"
                      labelText="Pacbio Sequel 10K"
                      value="N"
                    />
                    <Checkbox
                      inputName="BS_0100008007"
                      labelText="Pacbio+illumine Hybrid"
                      value="Y"
                    />
                    <Checkbox
                      inputName="BS_0100008008"
                      labelText="Illumina IJSEM"
                      value="N"
                    />
                    <Checkbox
                      inputName="BS_0100008010"
                      labelText="TrueBac ID-Genome Voucher"
                      value="N"
                    />
                    <Checkbox
                      inputName="BS_0100008013"
                      labelText="CG"
                      value="N"
                    />
                    <Checkbox
                      inputName="BS_0100008012"
                      labelText="Additional(Analysis)"
                      value="N"
                    />
                    <Checkbox
                      inputName="BS_0100008005"
                      labelText="Illumina NovaSeq 2x150"
                      value="N"
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
            onClick={() => router.push("/set/svc-type-list")}
          />
          <ContainedButton buttonName="저장" type="submit" />
        </Stack>
      </Form>
      {/* 로그 API 는 아직 개발 되지 않음  
      <Box sx={{ mb: 5 }}>
        <LogUpdateTitle logTitle="거래처(PI)" />
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncModifyLog apiName="agnc" uKey={slug} />
        </ErrorContainer>
      </Box>
      */}
    </Container>
  );
}
