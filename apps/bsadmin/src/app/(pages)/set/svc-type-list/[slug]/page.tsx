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
} from "cjbsDSTM";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const LazyCheckboxList = dynamic(
  () => import("../../../../components/CheckboxSetCode"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={82} />,
  }
);

interface ViewProps {
  params: {
    slug: string;
  };
}

export default function SvcTypePage({ params }: ViewProps) {
  // init
  const { slug } = params;
  const enumMngrCode = "SRVC_TYPE";
  const topCodeMc = slug;
  const midCodeMc = "none";
  const router = useRouter();

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

  const onSubmit = (data: any) => {
    const selectCodeList = data["btmCodeMcList"];
    let saveObj = {
      btmCodeMcList: selectCodeList,
      midCodeMc: "none",
      topCodeMc: slug,
    };
    // console.log("saveObj", saveObj);
    // console.log("modify stringify", JSON.stringify(saveObj));
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr?enumMngrCode=${enumMngrCode}`; // Replace with your API URL

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

  const codeData = codeDataTemp.data;
  const formKey = JSON.stringify(codeData); // 매번 defaultValues 를 변환시켜야 될 필요성이 있어서 함 ( 여러번 동일한 페이지를 올 때 갱신 )
  //console.log("codeData", codeData);

  // 'codeData'의 'btmValueList' 배열에서 'isSlct' 속성이 true인 아이템들만 필터링하여
  // 해당 아이템들의 'btmCodeMc' 속성만을 새로운 배열인 'selectedCodeArray'에 매핑합니다.
  // 'selectedCodeArray'는 'btmCodeMc' 값들로 이루어진 배열입니다.
  const selectedCodeArray = codeData.btmValueList
    .filter((item: any) => item.isSlct)
    .map((item: any) => item.btmCodeMc);

  // 'defaultValues' 객체에 고정값 "btmCodeMcList"를 key로 하고 'selectedCodeArray'를 값으로 설정
  // 이렇게 하면 'defaultValues' 객체에 'btmCodeMcList'를 key로 하는 프로퍼티가 생성되며,
  // 해당 프로퍼티에는 api 통해 넘어온 선택된 코드인 'selectedCodeArray'의 값을 할당하게 됨
  // 관리 아이템 마다 각각 배열 형태로 checkbox 를 할당함
  // 만약 key 를 변수로 할거면 defaultValues[topCodeMc] = selectedCodeArray;

  const defaultValues: { [key: string]: string[] } = {};
  defaultValues["btmCodeMcList"] = selectedCodeArray;
  //console.log("defaultValues[" + topCodeMc + "]", selectedCodeArray);

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="서비스 타입 수정" />
      </Box>
      <Form key={formKey} onSubmit={onSubmit} defaultValues={defaultValues}>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "252px" }}>서비스 타입</TH>
                <TD>{codeData.topValue ?? ""}</TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "252px" }}>분석 단계 (선택)</TH>
                <TD>
                  <LazyCheckboxList
                    inputName="btmCodeMcList"
                    dataList={codeData.btmValueList}
                  />
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
