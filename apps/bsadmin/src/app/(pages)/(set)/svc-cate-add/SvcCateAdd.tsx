import React from "react";
import useSWR from "swr";
import { fetcher, POST } from "api";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import {
  ContainedButton,
  Form,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import { toast } from "react-toastify";
import axios from "axios";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { useRouter } from "next-nprogress-bar";

const LazyCheckboxList = dynamic(
  () => import("../../../components/CheckboxSetCode"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={82} />,
  },
);
const LazyRadioboxList = dynamic(
  () => import("../../../components/RadioboxSetCode"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={82} />,
  },
);

const SvcCateAdd = () => {
  const router = useRouter();
  const { data } = useSWR(`/mngr/add?enumMngrCode=SRVC_CTGR`, fetcher, {
    revalidateOnFocus: true,
    suspense: true,
  });

  console.log("SVCCATEADD init data ==>>", data);

  const { topCodeMc, midCodeMc, btmValueList } = data;

  const defaultValues = {};

  const onSubmit = async (data: any) => {
    console.log("data", data);
    const selectCodeList = data["btmCodeMcList"];
    if (selectCodeList.length <= 0) {
      toast("분석 방법을 선택해주세요.");
      return;
    }
    if (!data.topCodeMc) {
      toast("분류를 선택해주세요.");
      return;
    }
    if (!data.midCodeMc) {
      toast("분석 종류를 선택해주세요.");
      return;
    }

    //toast(response.data.message ?? "에러 발생");

    let saveObj = {
      btmCodeMcList: selectCodeList,
      midCodeMc: data.midCodeMc,
      topCodeMc: data.topCodeMc,
    };
    //console.log("saveObj", saveObj);
    console.log("modify stringify", JSON.stringify(saveObj));
    const apiUrl = `/mngr?enumMngrCode=SRVC_CTGR`; // Replace with your API URL

    await POST(apiUrl, saveObj)
      .then((response) => {
        console.log("request successful:", response.data);
        if (response.success) {
          toast("등록 성공");
          router.push("/svc-cate-list/");
        } else {
          toast(response.message);
        }
      })
      .catch((error) => {
        console.error("request failed:", error);
        toast("[SVC-CATE-ADD]500 에러 발생");
      });
  };

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
                <TH sx={{ width: 90 }}>분류</TH>
                <TD>
                  {/* 라디오 */}
                  <Stack direction="row">
                    <LazyRadioboxList
                      inputName="topCodeMc"
                      dataList={topCodeMc}
                    />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH>분석 종류</TH>
                <TD>
                  <Stack spacing={1} direction="column">
                    <LazyRadioboxList
                      inputName="midCodeMc"
                      dataList={midCodeMc}
                    />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH>분석 방법</TH>
                <TD>
                  <Stack direction="column">
                    <LazyCheckboxList
                      inputName="btmCodeMcList"
                      dataList={btmValueList}
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
            onClick={() => router.push("/svc-cate-list")}
          />
          <ContainedButton buttonName="저장" type="submit" />
        </Stack>
      </Form>
    </Container>
  );
};

export default SvcCateAdd;
