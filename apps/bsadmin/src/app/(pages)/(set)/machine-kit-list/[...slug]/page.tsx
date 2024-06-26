"use client";

import React from "react";
import {
  OutlinedButton,
  ContainedButton,
  TH,
  TD,
  Title1,
  Form,
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
import useSWR from "swr";
import { PUT } from "api";
import { toast } from "react-toastify";

import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import { fetcher } from "api";
const LazyCheckboxList = dynamic(
  () => import("../../../../components/CheckboxSetCode"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={82} />,
  },
);

const LazyCommontModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  },
);

interface ViewProps {
  params: {
    slug: string;
    midCodeMc: string;
  };
}

export default function MachineKitPage({ params }: ViewProps) {
  // init
  const { slug } = params;
  const searchParams = useSearchParams();
  const midCodeMc = searchParams.get("midCodeMc");
  const enumMngrCode = "MCHN_KIT";
  const topCodeMc = slug;
  const router = useRouter();

  console.log("TOPCONDE", topCodeMc.toString());

  // load
  const {
    data: codeData,
    error,
    isLoading,
  } = useSWR(
    `/mngr/${topCodeMc}/${midCodeMc}?enumMngrCode=${enumMngrCode}`,
    fetcher,
    { revalidateOnFocus: true },
  );
  if (isLoading) {
    return <SkeletonLoading />;
  }

  const onSubmit = async (data: any) => {
    console.log("data", data);
    const selectCodeList = data["btmCodeMcList"];
    let saveObj = {
      midCodeMc,
      btmCodeMcList: selectCodeList,
      topCodeMc: topCodeMc.toString(),
    };
    //console.log("saveObj", saveObj);
    //console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `/mngr?enumMngrCode=${enumMngrCode}`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        toast("수정 되었습니다.");
        router.push("/machine-kit-list/");
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  const formKey = JSON.stringify(codeData);

  /**
   * 1. 우선 API 에서 넘어온 값을 이해
   * 2. 분류, 분석 종류 세팅
   * 3. 분석 방법 세팅
   * 4. 저장전 확인
   * 5. 저장
   *
   */

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
  // key 를 변수로 했을 때 -> const defaultValues: { [key: string]: string[] } = {};

  //defaultValues["btmCodeMcList"] = selectedCodeArray;
  //defaultValues["svcCate01"] = ["BS_0100005002"];
  const defaultValues = {
    topCodeMc,
    midCodeMc,
    btmCodeMcList: selectedCodeArray,
  };

  //defaultValues["btmCodeMcList"] = selectedCodeArray;
  //"BS_0100006008"

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="장비 Kit 분류 수정" />
      </Box>
      <Form key={formKey} onSubmit={onSubmit} defaultValues={defaultValues}>
        {/* key={formKey} 마스터 코드 - 상세 코드 컴포넌트 */}
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "252px" }}>장비</TH>
                <TD>{codeData.topValue}</TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "252px" }}>kit</TH>
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
            onClick={() => router.push("/machine-kit-list")}
          />
          <ContainedButton buttonName="저장" type="submit" />
        </Stack>
      </Form>

      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCommontModifyLog
            apiName="MCHN_KIT"
            uKey={slug}
            subUkey={midCodeMc}
            logTitle=""
            type="topMid"
          />
        </ErrorContainer>
      </Box>
    </Container>
  );
}
